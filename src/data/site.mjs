// Company-wide facts. Every value here comes from the original website
// (source-original/original-homepage-download.html and original-services-live.html).
// See docs/content-inventory.md for the source of each item.

export const SITE_URL = 'https://spsserviceshyd.in'; // existing production domain

export const company = {
  name: 'SPS Engineering Solutions',
  shortName: 'SPS',
  location: 'Hyderabad, India.',
  locality: 'Hyderabad',
  country: 'IN',
  copyright: 'All rights reserved @ SPS Engineering Solutions.',
  phones: [
    { display: '+91 9581283853', href: 'tel:+919581283853' },
    { display: '+91 9052269804', href: 'tel:+919052269804' },
  ],
  emails: [
    { display: 'relay@spsserviceshyd.in', href: 'mailto:relay@spsserviceshyd.in' },
    { display: 'spsserviceshyd@gmail.com', href: 'mailto:spsserviceshyd@gmail.com' },
  ],
};

// Hero (homepage, original #home)
export const hero = {
  titleLines: ['Keeping Your', 'System Stable'],
  lead: 'We aim to set the benchmark in the way we',
  quote: '“electrify, automate and digitalize”',
  tail: 'the world around us',
};

// Original intro section heading + three statements
export const intro = {
  heading: 'We electrify, automate and digitalize the world around us',
  statements: [
    {
      id: 'mission',
      title: 'Our Mission',
      text: "Our mission is to ensure unparalleled customer satisfaction through the delivery of high-quality services, value-added solutions, and prompt service delivery. We are committed to providing innovative solutions tailored to meet our customers' technical needs, while maintaining a steadfast focus on safety.",
    },
    {
      id: 'vision',
      title: 'Our Vision',
      text: "Our vision is to excel in understanding our customers' technical requirements and providing straightforward solutions. We prioritize constant communication and support, striving to be the industry leader in electrical substation protection and automation systems. Our unwavering commitment to safety underscores every aspect of our operations.",
    },
    {
      id: 'leading',
      title: 'Leading the Way',
      // Source starts with a lowercase "we"; capitalised.
      text: 'We strive to set the benchmark in the way we electrify, automate, and digitalize the world around us. Through innovative solutions and unwavering commitment, we aim to exceed industry standards and deliver unmatched value to our customers.',
    },
  ],
};

export const leadership = {
  name: 'Venu Gopal Chitla',
  nameSource: 'VENU GOPAL CHITLA',
  role: 'Managing Director',
  lines: ['Ex General Electric Employee', '10+ years of experience in protection field'],
};

export const careers = {
  heading: 'Careers',
  text: 'Unlock your potential with us! We offer exciting career opportunities that promise growth and development. Join our dynamic team and be part of a company that values innovation and excellence.',
  cta: 'Send Your CV',
  email: 'relay@spsserviceshyd.in',
};

// Facts stated on the original Services page, re-used (verbatim) on About/Customers.
export const sectors = {
  served: 'We offer Services to Power Generation Plants, Transmission, Distribution & Industries of Various domains.',
  industries: ['Cement Plants', 'Sugar Plants', 'Steel Plants', 'Refineries', 'Power Plants'],
  industriesSource:
    'We provide Operation and Maintenance (O & M) Service to Control & Relay Panels, HT/LT Switchgear, Substation Equipments, SAS Products from 400V to 765kV, and PCC/MCC panels of various industries including Cement Plants, Sugar Plants, Steel Plants, Refineries, and Power Plants.',
};

export const nav = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/about/', label: 'About', key: 'about' },
  { href: '/services/', label: 'Services', key: 'services' },
  { href: '/testing-equipment/', label: 'Testing Equipment', key: 'equipment' },
  { href: '/customers/', label: 'Customers', key: 'customers' },
  { href: '/contact/', label: 'Contact', key: 'contact' },
];
