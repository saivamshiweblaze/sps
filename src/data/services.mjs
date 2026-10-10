// Service content transcribed from the original website.
//   home  = source-original/original-homepage-download.html  (#top-services, #services)
//   svc   = source-original/original-services-live.html      (https://spsserviceshyd.in/services)
// Edits are limited to spacing, capitalisation, unit formatting (e.g. "765kv" -> "765 kV")
// and obvious typos. Each edit is logged in docs/content-inventory.md.

// Homepage "Our Top Services" (home #top-services) with the original icons.
export const featured = [
  {
    title: 'Relay Testing',
    icon: 'icons/relay',
    image: 'services/relay-commissioning',
    imageAlt: 'Engineer at a protection relay panel with a laptop and a three-phase relay test set',
    href: '/services/#relay',
    summary: 'Testing and Commissioning of Advanced Microprocessor/Numerical Based Protection Relays.',
  },
  {
    title: 'Breakers and CT & PT’s Testing',
    icon: 'icons/breaker',
    image: 'photography/hv-circuit-breakers',
    imageAlt: 'Outdoor high-voltage circuit breakers in a substation',
    href: '/services/#substation',
    summary: 'All Types of Breaker Service and Testing, along with testing of Instrument Transformers – CT, PT, CVT.',
  },
  {
    title: 'Transformer Testing',
    icon: 'icons/transformer',
    image: 'photography/power-transformer-yard',
    imageAlt: 'Oil-filled power transformer with bushings and radiators in a substation',
    href: '/services/#substation',
    summary: 'Erection, Testing & Commissioning of Power Transformer, ICT/Generator Transformer and Auxiliary Transformer.',
  },
];

// Homepage "Services We offer" — all 17 original cards, original order, original wording.
// `href` points at the matching section of the new Services page.
export const overview = [
  { n: 1, title: 'Protection relay testing & commissioning', href: '/services/#relay', text: 'Testing and Commissioning of Advanced Microprocessor/Numerical Based Protection Relays.' },
  { n: 2, title: 'Numerical relay sales & supply', href: '/services/#sales-relay', text: 'Sales & Supply of Numerical Relays of popular makes like GE/Alstom Grid, ABB/Hitachi, Siemens, Schneider Electric, SEL, NR Electric, Toshiba & also Electromechanical relays supply.' },
  { n: 3, title: 'Relay retrofitting', href: '/services/#retrofit', text: 'Retrofitting of Old Relays/Electromechanical Relays with Numerical Relays.' },
  { n: 4, title: 'Electrical equipment testing', href: '/services/#substation', text: 'Testing of Electrical Equipments – Generator, Transformers, Motors, Breakers, CT, PT, Lightning/Surge Arrestors & HT Cables.' },
  { n: 5, title: 'Breaker service & testing', href: '/services/#breaker-service', text: 'All Types of Breaker Service and Testing.' },
  { n: 6, title: 'Power system studies', href: '/services/#studies', text: 'Relay Co-ordination, Load flow Studies, Short circuit Studies, Harmonic Analysis, Arc Flash Study, Energy Auditing.' },
  { n: 7, title: 'SAS testing & commissioning', href: '/services/#sas', text: 'Testing and Commissioning of Substation Automation Products – RTU’s, Bay control units.' },
  { n: 8, title: 'Operation & maintenance contracts', href: '/services/#annual-contract', text: 'Operation and Maintenance (O & M) – Annual Testing Contracts, Annual Maintenance Contracts & Annual Rate contracts with MNC’s.' },
  { n: 9, title: 'Substation engineering', href: '/services/#substation-activity', text: 'Electrical Substation Engineering Activities.' },
  { n: 10, title: 'Telecommunication panels', href: '/services/#telecom', text: 'Installation & Commissioning of Tele communication panels of PLCC, SCADA, RTU, FOTE (SDH/PDH), OLTE, HMI Products.' },
  { n: 11, title: 'PMU & CSD commissioning', href: '/services/#pmu-csd', text: 'Installation, Testing and Commissioning of Phasor Measurement Units (PMU) and Controlled Switching Devices (CSD) for Transmission Substations.' },
  { n: 12, title: 'Industrial automation', href: '/services/#industrial-automation', text: 'Installation, Commissioning & Support of PLC, SCADA, HMI, VFD Drives (AC & DC) Panels for Industrial Automation Process.' },
  { n: 13, title: 'Renewable energy support', href: '/services/#renewable', text: 'Renewable Energy Support – Solar Energy.' },
  { n: 14, title: 'Meter calibration', href: '/services/#calibration-meters', text: 'Calibration of various Meters.' },
  { n: 15, title: 'Thermography', href: '/services/#thermography', text: 'Thermography.' },
  { n: 16, title: 'Lightning protection & earthing', href: '/services/#lightning-earthing', text: 'Supply, Installation & Testing of Advanced Lightning protection systems and maintenance free Earthing.' },
  { n: 17, title: 'Customer training', href: '/services/#training', text: 'Customer Training on protection & SAS.' },
];

// Homepage "complete services" view: the 17 lines above, grouped by discipline so
// the full range scans quickly. Grouping and the short `title` labels are
// editorial navigation aids; each line keeps its original sentence as `text`.
// `extra` adds two Services-page offerings that the original homepage list did
// not mention, using their original Services-page heading and wording.
export const overviewGroups = [
  { id: 'protection', title: 'Protection relays', lines: [1, 2, 3],
    extra: [{ title: 'Calibrated relay test kits', href: '/services/#relay-test-kits', text: 'Three Phase Numerical Secondary Injection Kit – CMC 356 OMICRON energy make.' }] },
  { id: 'testing', title: 'Equipment testing & diagnostics', lines: [4, 5, 14, 15, 16] },
  { id: 'automation', title: 'Automation, SCADA & communication', lines: [7, 10, 11, 12] },
  { id: 'engineering', title: 'Engineering & power system studies', lines: [9, 6] },
  { id: 'support', title: 'Maintenance, renewables, training & rental', lines: [8, 13, 17],
    extra: [{ title: 'Test kit rental', href: '/services/#rental', text: 'We offer complete test kits on a rental basis. This will give you the convenience of using high-quality equipment at an affordable price.' }] },
];

// Services page sections, in the original page order, grouped for navigation.
export const groups = [
  { id: 'protection', title: 'Protection Relays', image: 'photography/relay-panels', imageAlt: 'Row of control and relay panels with meters and annunciator windows' },
  { id: 'automation', title: 'Substation Automation', image: 'photography/scada-control-room', imageAlt: 'SCADA control room with operator consoles and monitors' },
  { id: 'equipment-engineering', title: 'Substation Equipment, O&M and Engineering', image: 'photography/gis-420kv', imageAlt: 'High-voltage gas-insulated switchgear installation' },
  { id: 'specialist', title: 'Calibration, Training, Thermography and Rental' },
  { id: 'further', title: 'Further Services' },
];

export const sections = [
  {
    id: 'relay',
    group: 'protection',
    nav: 'Protection relay testing',
    title: 'Testing and Commissioning of Advanced Microprocessor/Numerical Based Protection Relays',
    images: [{ key: 'services/relay-commissioning', alt: 'Engineer working at a protection relay panel with a laptop and a relay test set' }],
    items: [
      'Sound knowledge in Electromechanical & Numerical relays of various makes of ABB/Hitachi, GE/Alstom, SIEMENS, Schneider Electric, SEL, NR Electric, Toshiba, L&T, Easun Reyrolle, Ashida, Avana, JVS, Megawin & every make.',
      'Configuration & Testing of all major Protection Relays like Feeder Management, Distance, Transformer, Busbar, Motor, Generator, Line Differential protection relays of various makes.',
      'Testing of Electromechanical/Auxiliary Relays of Alstom, ABB, Easun Reyrolle makes.',
      'Erection, Testing and commissioning of High Voltage, Medium Voltage and Low Voltage Control and Relays Panels of 400 V to 765 kV range.',
      'We offer Services to Power Generation Plants, Transmission, Distribution & Industries of Various domains.',
      'We have good Skilled Engineers who can handle Single Phase & Three Phase Numerical Secondary Injection Kits.',
      'Sales and Supply of Numerical Relays of Popular make Like ABB, GE/Alstom, Schneider Electric, SIEMENS, NR Electric, Toshiba.',
      'Sales, Supply & Repair service of various Electromechanical relays.',
    ],
  },
  {
    id: 'relay-test-kits',
    group: 'protection',
    nav: 'Relay test kits',
    title: 'Calibrated Test Kits used for Testing Protection Relays',
    images: [{ key: 'services/numerical-relays', alt: 'Three numerical protection relays with front-panel displays and keypads', contain: true }],
    items: [
      'Single Phase Secondary Injection kit – Sudhershan insulation make – Used only for Testing Electromechanical relays.',
      'Three Phase Numerical Secondary Injection Kit – CMC 356 OMICRON energy make.',
      'Our Engineers also have good hands on with Various Power Simulators like Omicron, Megger-MPRT, SMRT, PULSAR, Freja300, PONOVO, ISA at customer Premises.',
      'We use calibrated Multimeters of Fluke make.',
      'Advanced System configuration laptops communicate & configure Numerical Relays & Numerical Secondary Injection Kits.',
    ],
  },
  {
    id: 'sales-relay',
    group: 'protection',
    nav: 'Relay makes & software',
    title: 'We have good experience on handling following Make Protection Relays and their Software',
    table: {
      caption: 'Protection relay manufacturers and the software tools used',
      head: ['Manufacturer', 'Software Tool'],
      rows: [
        ['ABB/Hitachi', 'PCM 600'],
        ['GE/Alstom Grid', 'Enervista UR & 8-Series Setup for GE Relays, Micom S1 Agile for ALSTOM Relays'],
        ['SIEMENS', 'DIGSI4, DIGSI5'],
        ['Schneider Electric', 'EASERGY STUDIO, GBD, Esetup Easergy Pro'],
        ['SEL-Schweitzer Eng. Laboratories', 'SURVALENT, ZENON, ACSELERATOR'],
        ['NR Electric', 'CSPC'],
        ['Toshiba', 'RSM100, GSC1000'],
      ],
    },
  },
  {
    id: 'test-kits',
    group: 'protection',
    nav: 'Test kit gallery',
    title: 'Calibrated Test Kits',
    gallery: [
      { key: 'gallery/kit-01', alt: 'OMICRON CMC 356 three-phase relay test set' },
      { key: 'gallery/kit-02', alt: 'Handheld digital multimeters' },
      { key: 'gallery/kit-03', alt: 'Two ABB numerical protection relays' },
      { key: 'gallery/kit-04', alt: 'ABB numerical relay with large display' },
      { key: 'gallery/kit-05', alt: 'Two numerical protection relays with graphical displays' },
      { key: 'gallery/kit-06', alt: 'Two rack-mounted numerical protection relays' },
      { key: 'gallery/kit-07', alt: 'Three numerical protection relays of different sizes' },
      { key: 'gallery/kit-08', alt: 'Three numerical protection relays' },
      { key: 'gallery/kit-09', alt: 'Electromechanical relays in transparent cases' },
      { key: 'gallery/kit-10', alt: 'Electromechanical relays with front covers' },
    ],
  },
  {
    id: 'retrofit',
    group: 'protection',
    nav: 'Relay retrofitting',
    title: 'Retrofitting of Old Relays/Electromechanical Relays with Numerical Relays',
    images: [{ key: 'services/retrofit-before-after', alt: 'Relay panel before retrofitting with electromechanical relays, and after retrofitting with numerical relays', natural: true }],
    items: [
      'SPS Engineering Solutions has good experience in retrofitting the old/electromechanical relays with numerical relays to support various communication protocols like IEC 61850 Ed1 & Ed2, DNP3.0, MODBUS, IEC 101, 103, 104 & Courier.',
      'Existing scheme drawings are modified and advanced numerical/microprocessor-based relays scheme drawings will be submitted after the site survey.',
      'Protection relays are configured and tested as per the modified scheme drawing.',
      'SPS Engineering Solutions has well experience in retrofitting feeder, motor, generator, distance, line differential, transformer, busbar protection relays of ABB, GE/Alstom grid, SIEMENS, Schneider Electric, Toshiba, NR Electric.',
      'After retrofitting activity, the protection relays are also integrated into the existing SCADA.',
    ],
  },
  {
    id: 'sas',
    group: 'automation',
    nav: 'SAS testing & commissioning',
    title: 'Testing and Commissioning of Substation Automation System (SAS) Products',
    images: [
      { key: 'services/sas-control-room', alt: 'Substation control room with operator workstations in front of panels' },
      { key: 'services/sas-operator', alt: 'Operator at an HMI workstation showing a single-line diagram' },
      { key: 'services/sas-engineer', alt: 'Engineer configuring equipment at an open control panel' },
    ],
    items: [
      'SPS Engineering Solutions has extensive experience handling various Substation Automation System (SAS) products, including those from GE/Alstom Grid, ABB, Siemens, Schneider Electric, NR Electric, and Toshiba.',
      'Engineering the architecture of systems based on the number of bays for various voltage levels: 11 kV, 33 kV, 132 kV, 220 kV, 440 kV, 765 kV.',
      'Developing databases according to the engineering architecture. Software and hardware installations of respective SAS are verified at the site with customer presence.',
      'Forming rings as per architecture using configured EFS Ethernet Fibre Switches and LIUs, performing FO cable splicing and OTDR testing, bringing all IEDs under a single network.',
      'Installing software and hardware for the respective SAS.',
      'Configuring clients (HMI) and Gateway-101/104, establishing communication with the Load Dispatch Centre.',
      'Configuring the system and modifying HMI graphics in the database as per customer application logic.',
      'Configuring Bay Control Units/Bay Protection & Control Units, and RTUs as per the scheme. Digital inputs and outputs are addressed in the database and configured in the system configurator, and checked as per the scheme and HMI level.',
      'Conducting point-to-point testing of all protection, metering, and control gateway signals in coordination with the Load Dispatch Centre.',
      'Setting and configuring protection relays with respect to communication and GOOSE configuration between IEDs.',
      'Configuring and testing the Auto Disturbance Recorder and integrating the MFM Global Positioning System.',
      'Creating ICD, SCD, and CID files and importing ICD files into the system configurator and addressing.',
      'Integrating third-party Bay/IEDs to the existing SCADA in the substation.',
      'Configuring interlocks in Bay Control Units and checking remote operations of equipment like isolators and breakers.',
      'Conducting SLD and metering checks in all installed Bay Control Units and at the HMI level.',
      'Testing relay signals, auto recloser, synchrochecks, CVT/PT selection logic for various bus topology arrangements, and normal and transfer mode logic checks in case of two buses with a transfer bus in every bay of the substation.',
      'Engineers are well-experienced in working with various communication standards and protocols like IEC 61850 Ed1 & Ed2, DNP3.0, MODBUS, IEC 101, 103, and 104.',
      'Performing SAT testing.',
    ],
  },
  {
    id: 'sas-software',
    group: 'automation',
    nav: 'SAS makes & software',
    title: 'We are well experienced on working following Make Substation Automation SAS Products and their Softwares',
    table: {
      caption: 'Substation automation manufacturers and the SCADA / HMI software used',
      head: ['Manufacturer', 'SCADA / HMI Software'],
      rows: [
        ['ABB/Hitachi', 'MICROSCADA'],
        ['GE/Alstom Grid', 'A-View, GE Simplicity, DS AGILE'],
        ['SIEMENS', 'SICAM PAS, SICAM 230 HMI, WINCC HMI, TOOL BOX II'],
        ['Schneider Electric', 'PACIS, ECOSUI, VJEO CITECT'],
      ],
    },
  },
  {
    id: 'substation',
    group: 'equipment-engineering',
    nav: 'Substation equipment',
    title: 'Erection, Testing & Commissioning of Substation Equipments',
    images: [{ key: 'services/power-transformer', alt: 'Oil-filled power transformer with bushings and radiators', contain: true }],
    columns: true,
    items: [
      'Power Transformer, ICT/Generator Transformer, Auxiliary Transformer',
      'Instrument Transformers – CT, PT, CVT',
      'Bus/Line Reactors and Capacitors',
      'Circuit Breaker, Isolators/Disconnectors',
      'Lightning/Surge Arrestors',
      'Busbar Stability checks',
      'Earth Switches & Power cables',
      'Motors & Generators Primary tests',
      'Earthing and DC system testing',
      'Low & Medium Voltage Switchgear',
    ],
  },
  {
    id: 'annual-contract',
    group: 'equipment-engineering',
    nav: 'Operation & maintenance',
    title: 'Operation and Maintenance (O & M) – Annual Testing Contracts (ATC), Annual Maintenance Contracts (AMC) & Annual Rate contracts with MNC’s',
    images: [{ key: 'photo/panel-multimeter', alt: 'Technician measuring a control panel circuit with a multimeter' }],
    items: [
      'We provide Operation and Maintenance (O & M) Service to Control & Relay Panels, HT/LT Switchgear, Substation Equipments, SAS Products from 400 V to 765 kV, and PCC/MCC panels of various industries including Cement Plants, Sugar Plants, Steel Plants, Refineries, and Power Plants.',
      'We undertake Annual Maintenance testing for Control & Relay Panels, Substation Equipments like CTs, PTs, and CBs, which are done periodically in industries.',
      'Annual Testing Contracts are available for both HT/LT Switchgear, Control & Relay Panels, and Substation Equipment up to 765 kV.',
      'Relays & Substation Equipment Test reports are submitted to the customer in both soft and hard copies, accompanied by CEIG License No. for reference.',
    ],
  },
  {
    id: 'substation-activity',
    group: 'equipment-engineering',
    nav: 'Substation engineering',
    title: 'Electrical Substation Engineering Activities',
    images: [{ key: 'services/engineering-drawings', alt: 'Engineers reviewing electrical drawings on a desk' }],
    items: [
      'Testing and Commissioning of Primary and Secondary Equipment in AIS & GIS Substations up to 765 kV.',
      'Erection, Testing & Commissioning of Bay Control Units (BCU), Bay Control & Protection Units (BCPU), Remote Terminal Units (RTU).',
      'Cable Schedule preparation from Primary Equipment to Control & Relay Panels. Scheme checking of Primary & secondary panels Circuits as per Engineering Scheme designed.',
      'Relay settings & Relay Coordination, Load flow/Power system Analysis Study done with the help of ETAP Software and submitting Reports to Customer.',
      'Testing and Commissioning of Control and Relay Panels, Substation Automation Systems, & SCADA.',
      'Designing Engineering Scheme Drawings for Substation Primary Equipment & C&R panels with Electrical CAD and submission to customer in CAD/PDF format up to 765 kV.',
      'Designing Engineering Schemes for Power Transformer, Auxiliary Transformers, Instrument Transformers – CT, PT/CVT Sizing, Cable tray, Earthing layouts, Wiring Schedule, Cable Sizing.',
      'Providing Final Relays Settings with Relay Coordination & Load Flow analysis Study using E-TAP Software.',
    ],
  },
  {
    id: 'calibration-meters',
    group: 'specialist',
    nav: 'Meter calibration',
    title: 'Calibration of various Meters',
    images: [{ key: 'services/energy-meter', alt: 'Electronic energy meter', contain: true }],
    columns: true,
    items: [
      'Single & Three Phase Energy meters',
      'Ammeter',
      'Voltmeter',
      'Active, Reactive, Apparent Power Meter',
      'Frequency meter',
      'Power Factor Meter',
      'Transformer Oil Temperature Meter',
    ],
  },
  {
    id: 'training',
    group: 'specialist',
    nav: 'Customer training',
    title: 'Customer Training',
    images: [{ key: 'services/training-session', alt: 'Classroom training session with participants working at laptops' }],
    items: [
      'Training on Power System Protection: Numerical relays, Relays Parameters Settings & Configuration of Feeder, Motor, Generator, Distance, Line/Current Differential, Transformer, Busbar Protection relays from ABB/Hitachi, SIEMENS, GE/ALSTOM, SCHNEIDER Electric, NR Electric, Toshiba, Sifang. Electromechanical relays training is also available.',
      'Training on Testing, Operation & Maintenance of Primary Equipment like Circuit Breaker, CT, PT/CVT, Power Transformer, Isolators, etc.',
      'Training on Substation Automation Systems Products: Bay control Units, Bay Control & Protection Units, Remote Terminal Units, SCADA.',
      'Training on Various Communication Protocols used in Substation Automation Systems.',
    ],
    audience: {
      title: 'To Whom we provide Training?',
      items: [
        'To Utility Customers. (In our Premises or Customer Premises)',
        'Engineering College Students of EEE, ECE Disciplines. We also conduct workshops.',
      ],
    },
  },
  {
    id: 'thermography',
    group: 'specialist',
    nav: 'Thermography',
    title: 'Thermo-scanning',
    eyebrow: 'Thermography',
    images: [{ key: 'services/thermal-camera', alt: 'Handheld thermal imaging camera showing a heat image' }],
    items: [
      'We can detect the amount of heat generating inside the panel, then we can analyze the problems that are creating a menace to the technicians without getting into contact with the actual system.',
      'With the thermography services we can detect the faulty locations before happening. These thermography services in India are increasing day by day, which results in the positive output of increase in production.',
    ],
  },
  {
    id: 'rental',
    group: 'specialist',
    nav: 'Rental services',
    title: 'Rental Services',
    images: [{ key: 'services/test-set-rental', alt: 'Three-phase relay test set', contain: true }],
    items: [
      'We offer complete test kits on a rental basis. This will give you the convenience of using high-quality equipment at an affordable price.',
    ],
  },
];

// Services that appear on the original homepage service list but have no
// dedicated section on the original Services page. Wording is the homepage
// card text, unchanged in meaning; nothing has been added.
export const further = [
  { id: 'breaker-service', title: 'Breaker Service and Testing', text: 'All Types of Breaker Service and Testing.', related: { href: '#substation', label: 'Substation equipment' } },
  { id: 'studies', title: 'Power System Studies', text: 'Relay Co-ordination, Load flow Studies, Short circuit Studies, Harmonic Analysis, Arc Flash Study, Energy Auditing.', related: { href: '#substation-activity', label: 'Substation engineering' } },
  { id: 'telecom', title: 'Telecommunication Panels', text: 'Installation & Commissioning of Tele communication panels of PLCC, SCADA, RTU, FOTE (SDH/PDH), OLTE, HMI Products.' },
  { id: 'pmu-csd', title: 'PMU and CSD', text: 'Installation, Testing and Commissioning of Phasor Measurement Units (PMU) and Controlled Switching Devices (CSD) for Transmission Substations.', related: { href: '#sas', label: 'Substation automation' } },
  { id: 'industrial-automation', title: 'Industrial Automation', text: 'Installation, Commissioning & Support of PLC, SCADA, HMI, VFD Drives (AC & DC) Panels for Industrial Automation Process.' },
  { id: 'renewable', title: 'Renewable Energy Support', text: 'Renewable Energy Support – Solar Energy.' },
  { id: 'lightning-earthing', title: 'Lightning Protection and Earthing', text: 'Supply, Installation & Testing of Advanced Lightning protection systems and maintenance free Earthing.' },
];
