/** Legal page content — footer LEGAL set mirrors mensrx.co structure */

export const LEGAL_LINKS = [
  { id: 'privacy', href: '#/privacy', label: 'Privacy Policy' },
  { id: 'terms', href: '#/terms', label: 'Terms of Use' },
  { id: 'states-we-serve', href: '#/states-we-serve', label: 'States We Serve' },
  { id: 'telehealth-consent', href: '#/telehealth-consent', label: 'Telehealth Consent' },
  { id: 'hipaa', href: '#/hipaa', label: 'HIPAA Notice' },
  { id: 'medical-disclaimer', href: '#/medical-disclaimer', label: 'Medical Disclaimer' },
  { id: 'patient-safety', href: '#/patient-safety', label: 'Patient Safety' },
];

export const LEGAL_PAGE_IDS = LEGAL_LINKS.map((l) => l.id);

export const LEGAL_PAGES = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    lastUpdated: 'August 14, 2026',
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
          'Our Notice of Privacy Practices, provided at or before the start of clinical care, describes how PHI is used and disclosed. You may request a copy by contacting support@pax-longevity.com or by reviewing our HIPAA Notice.',
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
    title: 'Terms of Use',
    eyebrow: 'Legal',
    lastUpdated: 'August 14, 2026',
    intro:
      'These Terms of Use ("Terms") govern your access to and use of the Pax Longevity website, Patient Center, and related services. By using our platform, you agree to these Terms.',
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

  'states-we-serve': {
    id: 'states-we-serve',
    title: 'States We Serve',
    eyebrow: 'Legal',
    lastUpdated: 'August 14, 2026',
    intro:
      'Pax Longevity services are available only in jurisdictions where affiliated licensed providers are authorized to provide care and where applicable pharmacy fulfillment is legally permitted. Availability may vary by treatment category, provider licensure, pharmacy availability, and patient eligibility.',
    sections: [
      {
        heading: 'Service availability',
        body: [
          'Clinical services are provided by licensed providers through affiliated or contracted provider networks. Provider availability may vary by state, treatment category, and patient eligibility.',
          'If prescription treatment is clinically appropriate, medication may be fulfilled through a licensed dispensing pharmacy pursuant to a patient-specific prescription. Pax Longevity is not a pharmacy, drug manufacturer, or compounding facility.',
        ],
      },
      {
        heading: 'Current service area',
        body: [
          'Subject to licensed provider review and clinical eligibility, Pax Longevity currently supports patients in the following U.S. states and the District of Columbia where provider networks and pharmacy partners are available:',
          'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming, and the District of Columbia.',
          'Some treatments or formulations may not be available in every listed jurisdiction. During intake, you will confirm your state of residence so we can verify eligibility for your selected program.',
        ],
      },
      {
        heading: 'Changes to availability',
        body: [
          'We may expand, limit, or pause service in specific states as provider licensure, pharmacy partnerships, and applicable law change. If we cannot serve your location for a given treatment, you will be notified before clinical fulfillment proceeds.',
          'Questions about state availability: support@pax-longevity.com',
        ],
      },
    ],
  },

  'telehealth-consent': {
    id: 'telehealth-consent',
    title: 'Telehealth Consent',
    eyebrow: 'Legal',
    lastUpdated: 'August 14, 2026',
    intro:
      'This Telehealth Consent explains how telehealth services may be provided through the Pax Longevity platform. By using our services, completing an assessment, submitting information, or proceeding with care, you acknowledge and consent to the terms below.',
    sections: [
      {
        heading: '1. What telehealth is',
        body: [
          'Telehealth is the delivery of health-related services and clinical information through electronic communications between a patient and a provider who are in different locations.',
          'Telehealth may include online questionnaires, secure messaging, uploaded photos or documents, remote provider review, and other electronic communications. A live video or phone visit may not always be required.',
        ],
      },
      {
        heading: '2. Asynchronous care',
        body: [
          'Care through Pax is often delivered asynchronously, meaning a U.S.-licensed provider reviews your information and communicates with you at separate times rather than during a real-time visit.',
          'Asynchronous telehealth may not be appropriate for all medical conditions. A provider may request more information, require a live consultation, decline treatment, or recommend in-person care.',
        ],
      },
      {
        heading: '3. Provider review',
        body: [
          'The information you submit through assessments, intake forms, secure messages, and uploads is reviewed by an independent U.S.-licensed provider to determine whether treatment is clinically appropriate for you.',
          'Providers may ask follow-up questions, request additional information, or recommend alternative care, including in-person evaluation.',
        ],
      },
      {
        heading: '4. No guarantee of prescription',
        body: [
          'Completing an assessment, checkout, payment authorization, or account creation does not guarantee that treatment will be prescribed.',
          'Prescription treatment, if any, is provided only after a U.S.-licensed provider reviews your information and determines that treatment is clinically appropriate.',
        ],
      },
      {
        heading: '5. Potential benefits',
        body: [
          'Potential benefits include more convenient access to licensed providers, the ability to receive care from a private location, reduced travel and wait times, and discreet communication about sensitive health matters.',
        ],
      },
      {
        heading: '6. Potential risks and limitations',
        body: [
          'Telehealth has potential risks and limitations, including that information transmitted may be insufficient for appropriate clinical decision-making; delays in evaluation or treatment may occur due to technology or information gaps; and not all conditions are suitable for remote care.',
          'A provider may determine that telehealth is not appropriate for your situation and may recommend in-person evaluation or care.',
        ],
      },
      {
        heading: '7. Your responsibilities',
        body: [
          'You are responsible for providing complete, accurate, and current information, including medical history, medications, allergies, symptoms, and any changes in your health.',
          'You agree to follow provider instructions, ask questions if anything is unclear, and notify your provider promptly of any new or worsening symptoms or side effects.',
        ],
      },
      {
        heading: '8. Emergency care',
        body: [
          'If you are experiencing a medical emergency, call 911 or seek emergency medical care immediately. Pax Longevity should not be used for emergencies.',
        ],
      },
      {
        heading: '9. Medical records and privacy',
        body: [
          'Your information may become part of your medical record and may be shared with providers, pharmacies, fulfillment partners, payment processors, or service providers as described in our Privacy Policy and HIPAA Notice.',
          'Pax uses reasonable administrative, technical, and physical safeguards designed to protect your information.',
        ],
      },
      {
        heading: '10. Prescriptions and pharmacy fulfillment',
        body: [
          'If a provider determines that prescription treatment is clinically appropriate, a prescription may be sent to a licensed dispensing pharmacy, where permitted by law.',
          'Final treatment, dose, formulation, and pricing may vary based on provider review, pharmacy availability, and applicable law.',
        ],
      },
      {
        heading: '11. Right to decline or withdraw consent',
        body: [
          'You may decline or withdraw consent to telehealth at any time by discontinuing use of the services or contacting support. Withdrawing consent may limit your ability to receive services through Pax Longevity.',
        ],
      },
      {
        heading: '12. State availability',
        body: [
          'Services may not be available in all states. Available treatments, provider networks, and pharmacy partners may vary based on your location and applicable law. See States We Serve for current information.',
        ],
      },
      {
        heading: '13. Contact',
        body: [
          'Questions about this Telehealth Consent can be sent to support@pax-longevity.com.',
        ],
      },
    ],
  },

  hipaa: {
    id: 'hipaa',
    title: 'HIPAA Notice',
    eyebrow: 'Legal',
    lastUpdated: 'August 14, 2026',
    intro:
      'This Notice of Privacy Practices describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.',
    sections: [
      {
        heading: 'Uses and disclosures',
        body: [
          'Your protected health information ("PHI") may be used and disclosed for treatment (including provider review and pharmacy dispensing), payment, and healthcare operations, and as otherwise permitted or required by law.',
          'Examples include sharing information with licensed providers who review your intake, pharmacies that fulfill a patient-specific prescription, and vendors who support billing, care coordination, or platform operations under appropriate agreements.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You have the right to inspect and request a copy of your PHI, request amendments, request an accounting of disclosures, request restrictions and confidential communications, and receive a paper copy of this notice.',
          'To exercise these rights, contact support@pax-longevity.com. We may need to verify your identity before responding. Certain information may be retained as required by law or for legitimate medical recordkeeping.',
        ],
      },
      {
        heading: 'Our responsibilities',
        body: [
          'We are required by law to maintain the privacy and security of your PHI, notify you following a breach of unsecured PHI, and follow the terms of the notice currently in effect.',
          'Pax Longevity connects members with independent licensed providers. Clinical partners and pharmacies may also maintain their own HIPAA notices covering services they provide directly.',
        ],
      },
      {
        heading: 'Complaints and contact',
        body: [
          'If you believe your privacy rights have been violated, you may file a complaint with us or with the U.S. Department of Health and Human Services. You will not be retaliated against for filing a complaint.',
          'Contact: support@pax-longevity.com · Pax Longevity, Miami Beach, Florida.',
        ],
      },
    ],
  },

  'medical-disclaimer': {
    id: 'medical-disclaimer',
    title: 'Medical Disclaimer',
    eyebrow: 'Legal',
    lastUpdated: 'August 14, 2026',
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

  'patient-safety': {
    id: 'patient-safety',
    title: 'Patient Safety',
    eyebrow: 'Legal',
    lastUpdated: 'August 14, 2026',
    intro:
      'Your health and safety are our highest priorities. This page provides important information regarding telehealth services, prescription medications, and compounded medications that may be offered through Pax Longevity.',
    sections: [
      {
        heading: 'General medical disclaimer',
        body: [
          'The information provided on this website is for informational and educational purposes only and is not intended as medical advice, diagnosis, or treatment.',
          'All medical decisions are made by licensed healthcare providers based on an individual patient’s medical history, intake information, eligibility, and clinical judgment.',
          'Use of this website does not establish a provider-patient relationship until you have completed the required medical intake process and have been evaluated by a licensed provider.',
          'If you are experiencing a medical emergency, call 911 or seek immediate emergency medical attention.',
        ],
      },
      {
        heading: 'Prescription medication notice',
        body: [
          'Prescription medications are only provided when deemed medically appropriate by a licensed healthcare provider.',
          'Not all patients will qualify for treatment. Eligibility is determined on a case-by-case basis and may depend on factors including medical history, current medications, health conditions, and clinical judgment.',
          'Patients may be required to complete additional evaluations, laboratory testing, or live consultations before treatment can be approved.',
        ],
      },
      {
        heading: 'Compounded medication disclosure',
        body: [
          'Some medications available through our platform may be compounded medications prepared by licensed compounding pharmacies to meet an individual patient’s needs as determined by a healthcare provider.',
          'Compounded medications are not FDA-approved, do not undergo the same FDA review process as commercially manufactured medications, and may differ from commercially available products in formulation, dosage form, or appearance.',
          'A licensed healthcare provider will determine whether a compounded medication is appropriate based on an individual patient evaluation.',
        ],
      },
      {
        heading: 'Important safety considerations',
        body: [
          'All medications and wellness treatments carry potential risks, side effects, contraindications, and unknown risks.',
          'Potential risks may include allergic reactions, medication interactions, gastrointestinal symptoms, changes in blood pressure or heart rate, dizziness or fatigue, injection site reactions, and other effects.',
          'Patients should immediately contact a healthcare provider if they experience severe or concerning symptoms.',
        ],
      },
      {
        heading: 'Before starting treatment',
        body: [
          'Patients should inform their healthcare provider about all relevant medical information, including current and past medical conditions, current medications and supplements, allergies or sensitivities, and pregnancy or breastfeeding status where applicable.',
          'Failure to provide accurate medical information may impact treatment safety and eligibility.',
        ],
      },
      {
        heading: 'Telehealth services',
        body: [
          'Medical services may be delivered through asynchronous or synchronous telehealth consultations depending on clinical appropriateness and state requirements.',
          'By using this platform, you acknowledge that telehealth has limitations compared to in-person care, certain conditions may require referral to an in-person provider, and providers may decline treatment if telehealth is not appropriate.',
        ],
      },
      {
        heading: 'Medication usage & administration',
        body: [
          'Patients must follow all provider instructions carefully, use medications only as prescribed, never share prescription medications, store medications according to provided instructions, and contact their care team with questions.',
          'Discontinuing or adjusting medication without medical guidance may increase health risks.',
        ],
      },
      {
        heading: 'Adverse events & side effects',
        body: [
          'Patients should seek immediate medical attention for symptoms including but not limited to difficulty breathing, chest pain, severe allergic reactions, severe abdominal pain, loss of consciousness, or other emergency symptoms.',
          'To report medication side effects, patients may also contact the FDA MedWatch program at 1-800-FDA-1088 or www.fda.gov/medwatch.',
        ],
      },
      {
        heading: 'No guarantee of results',
        body: [
          'Individual results may vary. We do not guarantee specific medical outcomes, weight loss results, symptom improvement, treatment success, or response timelines.',
          'Treatment effectiveness depends on many individual factors, including adherence, medical history, lifestyle, and biological variability.',
        ],
      },
      {
        heading: 'Pharmacy & fulfillment',
        body: [
          'Pax Longevity is not a pharmacy, drug manufacturer, or compounding facility. If prescription treatment is clinically appropriate, medication may be fulfilled through a licensed dispensing pharmacy pursuant to a patient-specific prescription issued by a licensed healthcare provider.',
          'Medication availability, pricing, formulation, packaging, and fulfillment timelines may vary depending on pharmacy inventory, state regulations, and clinical appropriateness.',
        ],
      },
      {
        heading: 'Product imagery',
        body: [
          'Displayed product imagery is intended solely for illustrative purposes and is not intended to imply that Pax Longevity compounds, manufactures, dispenses, or physically fulfills medications. Actual medication packaging and pharmacy labeling may differ and will include information from the licensed dispensing pharmacy.',
        ],
      },
      {
        heading: 'Commitment to patient safety',
        body: [
          'We are committed to supporting safe, ethical, and compliant patient care through licensed healthcare providers, licensed pharmacy partners, secure technology systems, clinical oversight, and transparent policies.',
          'Patients are encouraged to discuss all questions and concerns directly with their healthcare provider before beginning treatment. Questions: support@pax-longevity.com.',
        ],
      },
    ],
  },
};
