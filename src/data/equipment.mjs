// "Calibrated Testing Primary Equipments we have" — homepage #equipment (30 items).
// `n` is the item's position in the original list, `source` its exact original text.
// `name` + `spec` together carry every word, value and make of `source`; nothing is added.
// The grouping into categories is editorial (for scanning) and is not a source claim.

export const heading = 'Calibrated Testing Primary Equipments we have';

const items = {
  1: { name: 'Tan delta test kit', spec: 'Up to 12 kV · OMICRON & Eltel make', source: 'Tandelta test Kit upto 12kv, Omicron & Eltel Make.' },
  2: { name: 'Circuit breaker analyser', spec: 'CBA-3000 · ISA make', source: 'Circuit Breaker Analyser (CBA-3000) - ISA make.' },
  3: { name: 'High potential testing kit (Hi-Pot)', spec: '80 kV DC / 70 kV AC', source: 'High potential Testing kit (HI Pot) - 80kv DC / 70kv AC.' },
  4: { name: 'Circuit breaker timer', spec: 'CRM kit', source: 'Circuit Breaker Timer – CRM kit.' },
  5: { name: 'Sweep frequency analyser', spec: '', source: 'Sweep Frequency Analyser.' },
  6: { name: 'Winding resistance meter', spec: '10 A', source: 'Winding Resistance meter-10A.' },
  7: { name: 'Earth resistance meter', spec: '', source: 'Earth Resistace meter.' },
  8: { name: 'Loading transformer for primary injection', spec: 'Up to 2000 A', source: 'Loading Transformer for primary injection upto 2000A.' },
  9: { name: 'Secondary injection kit', spec: '50 A & 100 A', source: 'Secondary Injection kit of 50A & 100A.' },
  10: { name: 'Battery & hand-operated Megger', spec: 'Up to 5 kV', source: 'Battery & Hand Operated Megger upto 5kv.' },
  11: { name: 'Single-phase variac / dimmerstat', spec: '', source: 'Single phase variac/Dimmerstat.' },
  12: { name: 'Multimeters', spec: 'Fluke', source: 'Multimeters-Fluke.' },
  13: { name: 'Tong tester', spec: '', source: 'Tong tester.' },
  14: { name: 'CT clamp meter', spec: 'To measure mA & mV', source: 'CT Clamp meter-to measure mA & mV.' },
  15: { name: '1-pole & 3-pole timers', spec: 'CB timing test', source: '1-pole & 3-pole Timers- CB timing test.' },
  16: { name: 'Frequency generator', spec: '45 Hz to 55 Hz', source: 'Frequency Generator 45Hz to 55Hz.' },
  17: { name: 'Three-phase shifter', spec: '500 VA', source: 'Three phase Shifter-500VA.' },
  18: { name: 'Step-up transformer', spec: '1.5 kVA, 230 V, 5 kV', source: 'Step-Up Transformer, 1.5KVA, 230v, 5kv.' },
  19: { name: 'Phase angle meter', spec: '3-ph metering', source: 'Phase angle meter (3-ph metering).' },
  20: { name: 'SF6 dew point measuring instrument', spec: '', source: 'SF6 Dew point measuring Instrument.' },
  21: { name: 'CT analyser', spec: 'Secondary', source: 'CT analyser-secondary.' },
  22: { name: 'Thermography equipment', spec: 'For temperature scanning', source: 'Thermography Equipment for Temp Scanning.' },
  23: { name: 'Leakage current analyzer', spec: '3rd harmonic test', source: 'Leakage current Analyzer (3rd Harmonic test).' },
  24: { name: '3-ph harmonic analyzer', spec: '', source: '3-ph Harmonic Analyzer.' },
  25: { name: 'Circuit breaker analyser', spec: 'With DCRM', source: 'Circuit Breaker analyser with DCRM.' },
  26: { name: 'Primary current and multifunction test kit', spec: 'CPC 100', source: 'Primary current and Multifunction test kit (CPC 100).' },
  27: { name: 'PT polarity test kit', spec: '', source: 'PT Polarity test kit.' },
  28: { name: 'Phase sequence indicator', spec: '', source: 'Phase Sequence Indicator.' },
  29: { name: 'Winding turns ratio tester', spec: '3-PH', source: 'Winding Turns Ratio tester 3-PH.' },
  30: { name: 'Micro ohm meter', spec: 'DC current (100 A)', source: 'Micro Ohm Meter DC current (100A).' },
};

export const categories = [
  { id: 'breakers', title: 'Circuit breakers', items: [2, 25, 4, 15, 30, 20] },
  { id: 'transformers', title: 'Transformers & instrument transformers', items: [26, 6, 29, 5, 21, 27] },
  { id: 'insulation', title: 'Insulation & high voltage', items: [1, 3, 10, 18, 23] },
  { id: 'injection', title: 'Injection & test sources', items: [8, 9, 11, 16, 17] },
  { id: 'measurement', title: 'Measurement & diagnostics', items: [12, 13, 14, 19, 24, 28, 7, 22] },
].map((c) => ({ ...c, items: c.items.map((n) => ({ n, ...items[n] })) }));

export const allItems = Object.entries(items).map(([n, v]) => ({ n: Number(n), ...v }));

// Homepage equipment photographs (original files 1.png–6.png).
// Captions only where the photo itself shows the model name.
export const photos = [
  { key: 'equipment/eq-5', alt: 'OMICRON CPC 100 and CP TD1 test units', caption: 'CPC 100 with CP TD1 (unit labels visible in photograph)' },
  { key: 'equipment/eq-3', alt: 'Test panel with meters, selector switches and a wiring diagram inside the door' },
  { key: 'equipment/eq-1', alt: 'Portable test instrument in a rugged carrying case' },
  { key: 'equipment/eq-2', alt: 'Portable test instrument in a rugged carrying case, front view' },
  { key: 'equipment/eq-6', alt: 'Enclosed transformer unit with copper terminals' },
  { key: 'equipment/eq-4', alt: 'Multimeter in use on a control panel' },
];
