"""Download the curated third-party photography from Wikimedia Commons.

Each file is fetched through the official Commons API (a 2560 px rendition of
the original upload), and its licence, author and source page are read from the
API's extmetadata, not typed by hand. Output:
    source-photography/<key>.jpg          downloaded files (never edited)
    source-photography/credits.json       licence + attribution record
Run with:  python tools/fetch-photography.py
"""
import json, os, re, time, urllib.error, urllib.parse, urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'source-photography')
UA = {'User-Agent': 'SPS-Engineering-Solutions-website/1.0 (image licence audit)'}

# key -> (Commons file title, subject, intended section)
PHOTOS = {
    'hv-circuit-breakers': ("Pont-l'Abbé high-voltage substation 13 - Circuits breaker.jpg", 'Outdoor high-voltage circuit breakers in a substation', 'Home: featured "Breakers and CT & PT’s Testing"'),
    'power-transformer-yard': ('Substation Power Transformer 1.jpg', 'Oil-filled power transformer with bushings and radiators in a substation', 'Home: featured "Transformer Testing"'),
    'gis-420kv': ('GIS 420kV.jpg', '420 kV gas-insulated switchgear (GIS) installation', 'Services: substation equipment, O&M and engineering group'),
    'relay-panels': ('Electrical panels at co-generation plant at Maharashtra, India.jpg', 'Control and relay panels with meters and annunciators at an industrial co-generation plant', 'Services: protection relays group; About: who we work with'),
    'scada-control-room': ('NEWater S.C.A.D.A. room.jpg', 'SCADA control room with operator consoles and monitors', 'Services: substation automation group'),
    'switchyard-gantries': ('High voltage switchgear.jpg', 'High-voltage switchyard with lattice gantries', 'Services page masthead'),
    'aerial-breaker-bay': ('230kV circuit breaker.jpg', 'Aerial view of a 230 kV circuit-breaker bay', 'About page masthead'),
    'transmission-sunset': ('Transmission Lines at Sunset.jpg', 'Transmission towers and lines at sunset', 'Contact band (all pages)'),
}

# Display names where the Commons Artist field carries extra text (e.g. camera notes).
CREDIT_NAME = {'transmission-sunset': 'Kkiefuik'}

def clean(html):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', html or '')).strip()

os.makedirs(OUT, exist_ok=True)
titles = '|'.join('File:' + t for t, _, _ in PHOTOS.values())
api = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode({
    'action': 'query', 'format': 'json', 'titles': titles, 'prop': 'imageinfo',
    'iiprop': 'url|size|extmetadata', 'iiurlwidth': '2560',
    'iiextmetadatafilter': 'LicenseShortName|LicenseUrl|Artist|AttributionRequired|UsageTerms'})
data = json.load(urllib.request.urlopen(urllib.request.Request(api, headers=UA)))
by_title = {p['title'][5:]: p['imageinfo'][0] for p in data['query']['pages'].values()}

credits = {}
for key, (title, subject, section) in PHOTOS.items():
    ii = by_title[title]
    m = ii['extmetadata']
    dest = os.path.join(OUT, key + '.jpg')
    if not os.path.exists(dest):
        for attempt in range(6):  # Commons rate-limits thumbnail renders; back off politely
            try:
                body = urllib.request.urlopen(urllib.request.Request(ii['thumburl'], headers=UA)).read()
                break
            except urllib.error.HTTPError as e:
                if e.code != 429 or attempt == 5: raise
                time.sleep(10 * (attempt + 1))
        with open(dest, 'wb') as f:
            f.write(body)
        time.sleep(3)
    credits[key] = {
        'file': f'source-photography/{key}.jpg',
        'subject': subject,
        'section': section,
        'commonsTitle': title,
        'sourcePage': ii['descriptionurl'],
        'originalSize': f"{ii['width']}x{ii['height']}",
        'downloadedWidth': min(2560, ii['width']),
        'author': CREDIT_NAME.get(key) or clean(m.get('Artist', {}).get('value')),
        'authorRaw': clean(m.get('Artist', {}).get('value')),
        'license': m.get('LicenseShortName', {}).get('value'),
        'licenseUrl': m.get('LicenseUrl', {}).get('value', ''),
        'attributionRequired': m.get('AttributionRequired', {}).get('value') == 'true',
    }
    print(key, credits[key]['license'], '|', credits[key]['author'])
with open(os.path.join(OUT, 'credits.json'), 'w', encoding='utf-8') as f:
    json.dump(credits, f, indent=2, ensure_ascii=False)
