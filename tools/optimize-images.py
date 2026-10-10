"""Build optimised web images from the ORIGINAL assets.

Originals are only ever read, never modified. Output goes to public/assets/img/
together with images.json (intrinsic sizes + generated widths) which the HTML
templates use to emit width/height, srcset and <picture> fallbacks.

Usage (from the project root):
    "C:/Program Files/Python313/python.exe" tools/optimize-images.py
"""
import json
import os
import shutil
import sys

from PIL import Image, ImageChops

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
LIVE = os.path.join(ROOT, "source-original", "live-assets", "assets")
OUT = os.path.join(ROOT, "public", "assets", "img")

# (output name, source path relative to ROOT, kind, target widths)
# kind: photo  -> opaque photograph (webp + jpg fallback)
#       cutout -> product shot / icon that may carry transparency (webp + png fallback)
#       logo   -> customer logo: whitespace trimmed, height-normalised (webp + png fallback)
IMAGES = [
    # Brand
    ("brand/sps-logo", "logo.png", "cutout", [248]),
    # Original photography from the live website
    ("photo/substation-yard", f"{LIVE}/common/hero-bg.jpg", "photo", [800, 1280, 1920]),
    ("photo/panel-technician", "operator.jpg", "photo", [640, 1000, 1332]),
    ("photo/panel-multimeter", f"{LIVE}/top-services/relay.jpeg", "photo", [640, 1280]),
    # Curated third-party photography (Wikimedia Commons; licences in
    # source-photography/credits.json, fetched by tools/fetch-photography.py)
    *[(f"photography/{k}", f"source-photography/{k}.jpg", "photo", [640, 960, 1280, 1920]) for k in (
        "hv-circuit-breakers", "power-transformer-yard", "gis-420kv", "relay-panels",
        "scada-control-room", "switchyard-gantries", "aerial-breaker-bay", "transmission-sunset")],
    # Original top-service icons (white line icons on transparent background)
    ("icons/relay", "relay.png", "cutout", [160]),
    ("icons/breaker", "breaker.png", "cutout", [160]),
    ("icons/transformer", "energy.png", "cutout", [160]),
    # Homepage equipment photographs
    ("equipment/eq-1", "1.png", "cutout", [180]),
    ("equipment/eq-2", "2.png", "cutout", [422]),
    ("equipment/eq-3", "3.jpg", "photo", [600, 1156]),
    ("equipment/eq-4", "4.png", "cutout", [150]),
    ("equipment/eq-5", "5.png", "cutout", [283]),
    ("equipment/eq-6", "6.png", "cutout", [225]),
    # Services page photographs
    ("services/relay-commissioning", f"{LIVE}/services/1.jpg", "photo", [520]),
    ("services/numerical-relays", f"{LIVE}/services/2.png", "cutout", [477]),
    ("services/retrofit-before-after", f"{LIVE}/services/5.png", "photo", [800]),
    ("services/sas-control-room", f"{LIVE}/services/6-1.png", "photo", [270]),
    ("services/sas-operator", f"{LIVE}/services/6-2.png", "photo", [277]),
    ("services/sas-engineer", f"{LIVE}/services/6-3.jpg", "photo", [424]),
    ("services/power-transformer", f"{LIVE}/services/7.png", "cutout", [577]),
    ("services/engineering-drawings", f"{LIVE}/services/9.png", "photo", [361]),
    ("services/energy-meter", f"{LIVE}/services/10.jpg", "photo", [573]),
    ("services/training-session", f"{LIVE}/services/12.png", "photo", [565]),
    ("services/thermal-camera", f"{LIVE}/services/13.jpeg", "photo", [800]),
    ("services/test-set-rental", f"{LIVE}/services/14.png", "cutout", [548]),
    # Services page "Calibrated Test Kits" gallery
    *[(f"gallery/kit-{i:02d}", f"{LIVE}/services/s1/{i}.png", "cutout", []) for i in range(1, 11)],
    # Customer logos (homepage slots 1-16). Slot 6 is SVG and copied as-is; slot 15
    # is the static first frame of 15.svg, produced by tools/rasterize-svg.mjs.
    ("customers/c01", "1-n.png", "logo", []),
    ("customers/c02", "2-n.png", "logo", []),
    ("customers/c03", "3-n.png", "logo", []),
    ("customers/c04", "4-n.png", "logo", []),
    ("customers/c05", "5-n.png", "logo", []),
    ("customers/c07", "7-n.png", "logo", []),
    ("customers/c08", "8-n.png", "logo", []),
    ("customers/c09", "9-n.png", "logo", []),
    ("customers/c10", "10-n.png", "logo", []),
    ("customers/c11", "11-n.png", "logo", []),
    ("customers/c12", "12-n.png", "logo", []),
    ("customers/c13", "13.png", "logo", []),
    ("customers/c14", "14.gif", "logo", []),
    ("customers/c15", "source-original/derived/15-static-frame.png", "logo", []),
    ("customers/c16", "16.gif", "logo", []),
]

COPIES = [
    # (output, source) — copied byte-for-byte
    ("customers/c06.svg", "6-n.svg"),
    ("brand/favicon.ico", f"{LIVE}/common/favicon.ico"),
]

LOGO_MAX_H = 160  # 2x the largest display height


def trim(im):
    """Trim uniform white / transparent margins, keep a small breathing border."""
    rgba = im.convert("RGBA")
    white = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    flat = Image.alpha_composite(white, rgba).convert("RGB")
    diff = ImageChops.difference(flat, Image.new("RGB", flat.size, (255, 255, 255)))
    diff = diff.point(lambda v: 255 if v > 18 else 0)
    box = diff.getbbox()
    if not box:
        return rgba
    pad = max(2, int(0.03 * max(box[2] - box[0], box[3] - box[1])))
    box = (max(0, box[0] - pad), max(0, box[1] - pad),
           min(rgba.width, box[2] + pad), min(rgba.height, box[3] + pad))
    return rgba.crop(box)


def has_alpha(im):
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        return im.convert("RGBA").getextrema()[3][0] < 255
    return False


def save_variants(name, im, kind, widths):
    os.makedirs(os.path.dirname(os.path.join(OUT, name)), exist_ok=True)
    alpha = has_alpha(im)
    im = im.convert("RGBA" if alpha else "RGB")
    widths = sorted({min(w, im.width) for w in (widths or [im.width])})
    for w in widths:
        h = round(im.height * w / im.width)
        v = im if w == im.width else im.resize((w, h), Image.LANCZOS)
        v.save(os.path.join(OUT, f"{name}-{w}.webp"), "WEBP", quality=82, method=6)
    top = widths[-1]
    big = im if top == im.width else im.resize((top, round(im.height * top / im.width)), Image.LANCZOS)
    if kind == "photo" and not alpha:
        ext = "jpg"
        big.save(os.path.join(OUT, f"{name}.jpg"), "JPEG", quality=82, optimize=True, progressive=True)
    else:
        ext = "png"
        big.save(os.path.join(OUT, f"{name}.png"), "PNG", optimize=True)
    return {"width": im.width, "height": im.height, "widths": widths, "fallback": f"{name}.{ext}", "alpha": alpha}


def main():
    manifest = {}
    for name, src, kind, widths in IMAGES:
        path = src if os.path.isabs(src) else os.path.join(ROOT, src)
        im = Image.open(path)
        im.load()
        if kind == "logo":
            im = trim(im)
            if im.height > LOGO_MAX_H:
                im = im.resize((round(im.width * LOGO_MAX_H / im.height), LOGO_MAX_H), Image.LANCZOS)
        manifest[name] = save_variants(name, im, kind, widths) | {"source": os.path.relpath(path, ROOT).replace("\\", "/")}
        print(f"{name:38s} {manifest[name]['width']}x{manifest[name]['height']}")
    for out, src in COPIES:
        dst = os.path.join(OUT, out)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(src if os.path.isabs(src) else os.path.join(ROOT, src), dst)
        print(f"copied {out}")
    mpath = os.path.join(OUT, "images.json")
    json.dump(manifest, open(mpath, "w", encoding="utf-8"), indent=1, sort_keys=True)


if __name__ == "__main__":
    sys.exit(main())
