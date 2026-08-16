export interface LegalSection {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  intro: string;
  clauses: {
    heading: string;
    body: string[];
  }[];
}

export const legalPages: Record<string, LegalSection> = {
  terms: {
    slug: 'terms',
    title: 'Terms and Conditions',
    metaTitle: 'Terms & Conditions | BuyGitHubAccounts.com',
    metaDescription: 'Read the official Terms and Conditions for purchasing accounts and promotion services on BuyGitHubAccounts.com.',
    lastUpdated: 'August 15, 2026',
    intro: 'Please read these Terms and Conditions carefully before purchasing any services from BuyGitHubAccounts.com. By engaging with our services, submitting payment, or receiving digital deliverables, you agree to be bound by the terms outlined below.',
    clauses: [
      {
        heading: '1. Overview of Services',
        body: [
          'BuyGitHubAccounts.com provides digital account provisioning, developer environment setups, and repository visibility promotion services. All services are offered as independent third-party solutions.',
          'We do not claim ownership, authorization, official partnership, or direct affiliation with GitHub, Inc. or any of its subsidiaries.'
        ]
      },
      {
        heading: '2. User Responsibilities and Acceptable Use',
        body: [
          'Clients purchasing accounts or promotion services are solely responsible for all actions conducted through the delivered credentials.',
          'You agree NOT to use any provided accounts or services for malicious activities, including but not limited to: distributing malware, hosting unauthorized phishing kits, executing denial-of-service (DoS) attacks, automated spam campaigns, or engaging in illegal activities under applicable laws.',
          'Customers are strongly advised to rotate all credentials, update passwords, bind their own two-factor authentication (2FA) authenticators, and configure authorized SSH keypairs immediately upon receipt of account details.'
        ]
      },
      {
        heading: '3. Pricing and Payment Terms',
        body: [
          'All published prices are denominated in USD. We accept payments primarily via supported cryptocurrency networks (USDT, BTC, ETH, SOL, LTC).',
          'Due to cryptocurrency market volatility and variable network miner fees, payments must reflect the exact USD-equivalent amount at the time of order confirmation.',
          'We do not charge recurring subscriptions unless explicitly agreed upon in a custom written agreement.'
        ]
      },
      {
        heading: '4. Delivery and Fulfillment',
        body: [
          'Delivery of account credentials and initiation of promotion services are fulfilled manually via encrypted messaging channels (Telegram, WhatsApp) or email after full payment confirmation.',
          'Standard delivery schedules range between 30 minutes and 3 hours during active operating hours, subject to batch volume.'
        ]
      },
      {
        heading: '5. Limitation of Liability',
        body: [
          'To the maximum extent permitted by applicable law, BuyGitHubAccounts.com shall not be liable for any indirect, incidental, consequential, or exemplary damages arising out of your use or inability to use our services.',
          'We do not guarantee platform policy immunity, algorithmic trending permanence, or infinite account longevity, as all platform parameters remain governed by third-party platform operators.'
        ]
      },
      {
        heading: '6. Amendments to Terms',
        body: [
          'BuyGitHubAccounts.com reserves the right to modify these terms at any time. Changes will be posted to this page with an updated revision date.'
        ]
      }
    ]
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy | BuyGitHubAccounts.com',
    metaDescription: 'Learn how BuyGitHubAccounts.com handles customer privacy, encrypted communications, and zero data-retention policies.',
    lastUpdated: 'August 15, 2026',
    intro: 'At BuyGitHubAccounts.com, developer privacy and operational security are core values. This Privacy Policy details our minimal data collection practices and strict data-purging procedures.',
    clauses: [
      {
        heading: '1. Information We Collect',
        body: [
          'We operate under a strict minimal-data policy. When placing an order, we collect only the necessary information required to fulfill the transaction: your chosen contact handle (Telegram username, WhatsApp number, or email), the requested service package, and public repository links for promotion orders.',
          'We NEVER request, collect, or store private encryption keys, seed phrases, banking passwords, or personal identity documents.'
        ]
      },
      {
        heading: '2. Use of Information',
        body: [
          'Information collected is utilized strictly to communicate order updates, deliver credential handover files, and coordinate customer support inquiries.',
          'We do NOT sell, lease, rent, or distribute customer contact details to third-party advertisers or data brokers under any circumstances.'
        ]
      },
      {
        heading: '3. Data Retention and Credential Purging',
        body: [
          'To protect our customers, account credential records are purged from our active delivery logs once the delivery is verified and the 48-hour warranty period concludes.',
          'We advise all clients to immediately download, store, and encrypt their credentials in their own local password vaults.'
        ]
      },
      {
        heading: '4. Third-Party Links and Communication Channels',
        body: [
          'Our platform facilitates communication through encrypted messaging apps including Telegram and WhatsApp. Your interactions on those platforms remain subject to their respective security and privacy protocols.'
        ]
      },
      {
        heading: '5. Contact Regarding Privacy',
        body: [
          'For any questions regarding our privacy practices, contact us directly via Telegram (@EgSupport24) or WhatsApp (+1 307 393 9979).'
        ]
      }
    ]
  },
  'refund-policy': {
    slug: 'refund-policy',
    title: 'Refund & Replacement Policy',
    metaTitle: 'Refund & Replacement Policy | BuyGitHubAccounts.com',
    metaDescription: 'Read our transparent 48-hour replacement warranty, refund eligibility criteria, and customer satisfaction commitments.',
    lastUpdated: 'August 15, 2026',
    intro: 'We stand behind the quality and validity of our services with a clear, transparent replacement warranty and refund framework.',
    clauses: [
      {
        heading: '1. 48-Hour Replacement Warranty on Accounts',
        body: [
          'Every account order is covered by a 48-hour replacement warranty starting from the moment of credential dispatch.',
          'If you encounter an invalid login, incorrect password, or mailbox access block upon initial receipt, notify our support team within 48 hours. Upon verification, we will issue a replacement account free of charge.'
        ]
      },
      {
        heading: '2. Refund Eligibility Criteria',
        body: [
          'Full or partial refunds are provided in the following circumstances:',
          '• Inability to Fulfill: If we are unable to provide the purchased service or deliver working credentials within our guaranteed fulfillment window.',
          '• Inventory Shortage: If a specific vintage or specialized account category cannot be supplied after payment is received.',
          '• Out-of-Stock Promotion Services: If we are unable to process your target repository promotion.'
        ]
      },
      {
        heading: '3. Non-Refundable Scenarios',
        body: [
          'Refunds and replacements are NOT applicable under the following conditions:',
          '• Post-Handover Misuse: Issues arising after the customer changes credentials and violates platform terms of service (e.g. running unauthorized mass-scraping bots or distributing prohibited material).',
          '• Change of Mind: Once valid credentials have been viewed or promotion orders have commenced delivery.',
          '• Failure to Report within 48 Hours: Inactivity issues reported after the expiration of the 48-hour initial warranty window.'
        ]
      },
      {
        heading: '4. Refund Processing',
        body: [
          'Approved refunds are issued within 24 hours in the cryptocurrency equivalent paid, directed back to the customer’s specified wallet address.'
        ]
      }
    ]
  },
  'delivery-policy': {
    slug: 'delivery-policy',
    title: 'Delivery & Fulfillment Policy',
    metaTitle: 'Delivery & Fulfillment Policy | BuyGitHubAccounts.com',
    metaDescription: 'Detailed information regarding order fulfillment procedures, digital delivery formats, delivery timelines, and tracking.',
    lastUpdated: 'August 15, 2026',
    intro: 'All products and services offered on BuyGitHubAccounts.com are strictly digital deliverables. Review our fulfillment procedures below.',
    clauses: [
      {
        heading: '1. Digital Fulfillment Methodology',
        body: [
          'We do not ship physical media. All account credentials, login parameters, and email details are delivered digitally via secure, private direct messages on Telegram (@EgSupport24) or WhatsApp (+1 307 393 9979), or via email if requested by the customer.'
        ]
      },
      {
        heading: '2. Delivery Timeframes',
        body: [
          '• Standard Account Orders (1-25 accounts): Delivered within 30 minutes to 3 hours during active support hours (08:00 - 23:00 UTC).',
          '• Bulk Account Orders (100+ accounts): Delivered within 2 to 6 hours in structured batch files (CSV, JSON, or TXT).',
          '• Repository Promotion Services (Stars, Forks, Followers, Watchers): Delivery is initiated within 2 to 6 hours and distributed organically over 24 to 72 hours depending on target volume.'
        ]
      },
      {
        heading: '3. Confirmation of Receipt',
        body: [
          'Upon receiving your delivery document, you are requested to confirm receipt and verify first-login accessibility immediately. Our team remains active on chat to assist with any onboarding queries.'
        ]
      }
    ]
  },
  disclaimer: {
    slug: 'disclaimer',
    title: 'Independent Service Provider Disclaimer',
    metaTitle: 'Legal Disclaimer & Trademark Notice | BuyGitHubAccounts.com',
    metaDescription: 'Important legal notice regarding independent third-party status and non-affiliation with GitHub, Inc.',
    lastUpdated: 'August 15, 2026',
    intro: 'Please review the following legal disclaimer regarding our independent operations and intellectual property boundaries.',
    clauses: [
      {
        heading: '1. Third-Party Independent Provider Status',
        body: [
          'BuyGitHubAccounts.com is an independent third-party service provider and is NOT affiliated with, endorsed by, sponsored by, or officially authorized by GitHub, Inc. or Microsoft Corporation.',
          'We do not claim to be an "Official GitHub Partner", "GitHub Authorized Seller", or "Official GitHub Store". Any reference to "GitHub" on this website is solely for descriptive and nominative fair-use identification of the platform environment to which our digital services apply.'
        ]
      },
      {
        heading: '2. Trademarks and Intellectual Property',
        body: [
          'GitHub, the GitHub Octocat logo, and related trademarks are the registered property of GitHub, Inc. and Microsoft Corporation. All other trademarks, trade names, and logos mentioned herein belong to their respective owners.'
        ]
      },
      {
        heading: '3. Nature of Services and Realistic Expectations',
        body: [
          'The digital services, developer accounts, and repository metrics provided through this website are intended for legitimate software engineering, staging, automated testing, continuous integration, and portfolio demonstration purposes.',
          'We do not guarantee perpetual account longevity or algorithmic immunity, as all platform usage is subject to the external terms and policies of third-party platforms.'
        ]
      },
      {
        heading: '4. Contact for Legal Inquiries',
        body: [
          'For any inquiries regarding this disclaimer or our terms, reach out directly to our administration at Telegram: @EgSupport24 or WhatsApp: +1 (307) 393-9979.'
        ]
      }
    ]
  }
};
