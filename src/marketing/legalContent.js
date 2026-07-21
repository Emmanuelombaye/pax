/** Legal page content — Terms, Privacy, Medical Disclaimer */

export const LEGAL_LINKS = [
  { id: 'privacy', href: '#/privacy', label: 'Privacy Policy' },
  { id: 'terms', href: '#/terms', label: 'Terms of Service' },
  { id: 'medical-disclaimer', href: '#/medical-disclaimer', label: 'Medical Disclaimer' },
];

export const LEGAL_PAGE_IDS = LEGAL_LINKS.map((l) => l.id);

export const LEGAL_PAGES = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    lastUpdated: 'March 21, 2026',
    intro:
      'Pax Longevity ("Pax," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, use the Patient Center, or participate in our care programs.',
    sections: [
      {
        heading: '1. Information we collect',
        body: [
          'We may collect personal information you provide directly, including your name, email address, phone number, date of birth, shipping address, payment details, government-issued identification (when required for verification), health intake responses, and communications with our care team.',
          'We automatically collect certain technical information when you use our services, such as device type, browser, IP address, pages viewed, and session activity. In the Patient Center demo, some data is stored locally on your device until a production backend is connected.',
        ],
      },
      {
        heading: '2. How we use your information',
        body: [
          'We use your information to provide and improve our services, facilitate clinical review, process orders and subscriptions, communicate with you about your care, verify identity, comply with legal obligations, prevent fraud, and maintain the security of our platform.',
          'We do not sell your personal information. We may use de-identified or aggregated data for analytics, quality improvement, and product development.',
        ],
      },
      {
        heading: '3. Health information & HIPAA',
        body: [
          'When you receive clinical services through Pax-affiliated licensed providers, your protected health information (PHI) may be subject to the Health Insurance Portability and Accountability Act (HIPAA) and applicable state privacy laws.',
          'Our Notice of Privacy Practices, provided at or before the start of clinical care, describes how PHI is used and disclosed. You may request a copy by contacting support@pax-longevity.com.',
        ],
      },
      {
        heading: '4. How we share information',
        body: [
          'We may share information with licensed healthcare providers, compounding pharmacies, payment processors, identity verification vendors, shipping partners, and technology service providers who assist in operating our platform — each bound by contractual obligations to protect your data.',
          'We may also disclose information when required by law, to protect rights and safety, or in connection with a business transaction such as a merger or acquisition, subject to applicable legal requirements.',
        ],
      },
      {
        heading: '5. Your choices & rights',
        body: [
          'Depending on your location, you may have rights to access, correct, delete, or port your personal information, and to opt out of certain processing such as marketing communications.',
          'To exercise your rights, contact support@pax-longevity.com. We will respond in accordance with applicable law.',
        ],
      },
      {
        heading: '6. Data retention & security',
        body: [
          'We retain information for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements.',
          'We implement administrative, technical, and physical safeguards designed to protect your information. No method of transmission or storage is completely secure.',
        ],
      },
      {
        heading: '7. Children',
        body: [
          'Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a minor, contact us promptly.',
        ],
      },
      {
        heading: '8. Changes & contact',
        body: [
          'We may update this Privacy Policy from time to time. The "Last updated" date at the top reflects the most recent revision. Continued use of our services after changes constitutes acceptance of the updated policy.',
          'Questions about this Privacy Policy may be directed to support@pax-longevity.com or Pax Longevity, Miami Beach, Florida.',
        ],
      },
    ],
  },

  terms: {
    id: 'terms',
    title: 'Terms of Service',
    eyebrow: 'Legal',
    lastUpdated: 'March 21, 2026',
    intro:
      'These Terms of Service ("Terms") govern your access to and use of the Pax Longevity website, Patient Center, and related services. By using our platform, you agree to these Terms.',
    sections: [
      {
        heading: '1. Eligibility',
        body: [
          'You must be at least 18 years old and located in a jurisdiction where our services are available. By creating an account or completing checkout, you represent that the information you provide is accurate and complete.',
        ],
      },
      {
        heading: '2. Nature of services',
        body: [
          'Pax Longevity is a branded patient platform that connects members with independent, licensed U.S. healthcare providers and accredited compounding pharmacies. Pax does not practice medicine and does not replace the judgment of your personal physician.',
          'Clinical decisions are made solely by licensed providers in their professional discretion. Not all applicants qualify for treatment.',
        ],
      },
      {
        heading: '3. Accounts & security',
        body: [
          'You are responsible for maintaining the confidentiality of your Patient Center credentials and for all activity under your account. Notify us immediately of any unauthorized use.',
        ],
      },
      {
        heading: '4. Orders, billing & refunds',
        body: [
          'Pricing, plan terms, and billing cycles are displayed at checkout. You authorize us and our payment partners to charge your selected payment method for applicable fees.',
          'Where a clinical authorization hold is placed, you will only be charged if a licensed provider determines that treatment is appropriate. Refund and cancellation policies are disclosed at checkout and may vary by program.',
        ],
      },
      {
        heading: '5. Compounded medications',
        body: [
          'Certain products offered through Pax are prepared by licensed 503A compounding pharmacies. Compounded medications are customized for individual patients and are not individually reviewed or approved by the U.S. Food and Drug Administration (FDA) as finished drug products.',
          'You agree to use medications only as prescribed and to follow provider and pharmacy instructions.',
        ],
      },
      {
        heading: '6. Acceptable use',
        body: [
          'You agree not to misuse the platform, provide false health information, attempt to access another person\'s account, interfere with security features, or use the services for any unlawful purpose.',
        ],
      },
      {
        heading: '7. Intellectual property',
        body: [
          'All content, branding, logos, and materials on the Pax platform are owned by Pax Longevity or its licensors and are protected by intellectual property laws. You may not copy, modify, or distribute our materials without prior written consent.',
        ],
      },
      {
        heading: '8. Disclaimers & limitation of liability',
        body: [
          'THE PLATFORM IS PROVIDED "AS IS" TO THE MAXIMUM EXTENT PERMITTED BY LAW. PAX DISCLAIMS WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
          'TO THE FULLEST EXTENT PERMITTED BY LAW, PAX AND ITS AFFILIATES SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICES.',
        ],
      },
      {
        heading: '9. Dispute resolution & governing law',
        body: [
          'These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law principles. Any dispute shall be resolved in the state or federal courts located in Miami-Dade County, Florida, unless otherwise required by applicable law.',
        ],
      },
      {
        heading: '10. Changes & contact',
        body: [
          'We may modify these Terms at any time. Material changes will be posted on this page with an updated date. Your continued use constitutes acceptance of the revised Terms.',
          'Questions: support@pax-longevity.com',
        ],
      },
    ],
  },

  'medical-disclaimer': {
    id: 'medical-disclaimer',
    title: 'Medical Disclaimer',
    eyebrow: 'Legal',
    lastUpdated: 'March 21, 2026',
    intro:
      'The information provided on the Pax Longevity website, Patient Center, and related communications is for general educational purposes only. It is not intended as medical advice, diagnosis, or treatment.',
    sections: [
      {
        heading: 'No doctor–patient relationship',
        body: [
          'Browsing our website or completing an intake questionnaire does not create a doctor–patient relationship. A clinical relationship is established only when you are accepted into care by a licensed provider who has reviewed your information and determined that treatment is appropriate.',
        ],
      },
      {
        heading: 'Consult your physician',
        body: [
          'Always seek the advice of a qualified healthcare professional with questions about a medical condition, medications, or before starting, changing, or stopping any treatment — including peptide therapies, GLP-1 medications, or compounded formulations.',
          'Never disregard professional medical advice or delay seeking care because of something you read on our platform.',
        ],
      },
      {
        heading: 'Compounded medications',
        body: [
          'Compounded medications are prepared by licensed compounding pharmacies under federal Section 503A guidelines. They are customized for individual patients and are not individually reviewed or approved by the FDA as finished drug products.',
          'Results vary by individual. Outcomes described on our site are not guaranteed.',
        ],
      },
      {
        heading: 'Emergency situations',
        body: [
          'If you are experiencing a medical emergency, call 911 or go to the nearest emergency room immediately. Do not use Pax messaging for urgent or emergency care.',
        ],
      },
      {
        heading: 'Third-party content',
        body: [
          'Links to third-party websites or references to external research are provided for convenience. Pax does not endorse and is not responsible for the accuracy of third-party content.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'For clinical questions, message your care team through the Patient Center. For platform or policy questions, contact support@pax-longevity.com.',
        ],
      },
    ],
  },
};
