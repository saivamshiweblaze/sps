// The 16 customer-logo slots of the original homepage (#customers), in original order.
// `name` is read from the logo artwork itself (the original HTML only had alt="brand-N").
// `scale` is an optical size correction for marks with thin detail or built-in margins.
// `verify: true` marks names the client should confirm (see docs/qa-checklist.md).
export const customers = [
  { slot: 1, key: 'customers/c01', file: '1-n.png', name: 'Rajiv Gandhi International Airport, Hyderabad (GMR Aero Enterprise)', scale: 1.3 },
  { slot: 2, key: 'customers/c02', file: '2-n.png', name: 'Ganpati Sugar Industries Limited' },
  { slot: 3, key: 'customers/c03', file: '3-n.png', name: 'Blue Star' },
  { slot: 4, key: 'customers/c04', file: '4-n.png', name: 'AM/NS India' },
  { slot: 5, key: 'customers/c05', file: '5-n.png', name: 'NAVA' },
  { slot: 6, svg: 'customers/c06.svg', file: '6-n.svg', name: 'Voltech', ratio: 2.5, scale: 1.55 },
  { slot: 7, key: 'customers/c07', file: '7-n.png', name: 'Jindal Steel & Power' },
  { slot: 8, key: 'customers/c08', file: '8-n.png', name: 'Nutan Ispat & Power Pvt. Ltd.' },
  { slot: 9, key: 'customers/c09', file: '9-n.png', name: 'Sanvira' },
  { slot: 10, key: 'customers/c10', file: '10-n.png', name: 'Enmas India' },
  { slot: 11, key: 'customers/c11', file: '11-n.png', name: 'Customer logo – oval “apt” monogram', verify: true },
  { slot: 12, key: 'customers/c12', file: '12-n.png', name: 'Jakson' },
  { slot: 13, key: 'customers/c13', file: '13.png', name: 'Amara Raja' },
  { slot: 14, key: 'customers/c14', file: '14.gif', name: 'Jindal India Thermal Power Ltd.' },
  { slot: 15, key: 'customers/c15', file: '15.svg', name: 'Hindustan Unilever Limited', scale: 1.3 },
  { slot: 16, key: 'customers/c16', file: '16.gif', name: 'Toshiba' },
];
