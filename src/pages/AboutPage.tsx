import { Terminal, ShieldCheck, Send, MessageSquare, CheckCircle2, Lock, ArrowRight, Award, Clock, Users } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CryptoPaymentSection } from '../components/CryptoPaymentSection';
import { navigateTo } from '../utils/router';

export const AboutPage = () => {
  const structuredOrgSchema = {
    '@type': 'Organization',
    name: 'Buy GitHub Accounts',
    url: 'https://buygithubaccounts.com',
    logo: 'https://buygithubaccounts.com/icon.png',
    description: 'Independent third-party provider of verified GitHub developer accounts and repository promotion services.',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+1-307-393-9979',
        availableLanguage: ['English']
      }
    ]
  };

  return (
    <div className="bg-[#FFFFFF]">
      <SEOHead
        title="About Us | BuyGitHubAccounts.com"
        description="Learn about BuyGitHubAccounts.com, our operational principles, developer provisioning solutions, transparent cryptocurrency billing, and customer protection commitments."
        canonicalPath="/about"
        schemaData={structuredOrgSchema}
      />

      {/* Breadcrumb Header */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'About Us' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#F6F8FA] border border-[#D0D7DE] px-3 py-1 rounded-full text-xs font-semibold text-[#24292F] mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#2DA44E]" />
              <span>Independent Digital Service Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight">
              About BuyGitHubAccounts.com
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#57606A] leading-relaxed">
              We provide software engineering teams, independent developers, dev agencies, and open-source project creators with verified GitHub accounts, platform tenure profiles, and transparent repository engagement services.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="py-14 bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#24292F]">
              Our Core Operational Principles
            </h2>
            <p className="text-xs sm:text-sm text-[#57606A] mt-1">
              Building trust through absolute transparency, prompt support, and clean delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#F6F8FA] border border-[#D0D7DE] flex items-center justify-center mb-4 text-[#2DA44E]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#24292F]">100% Full Access Handover</h3>
              <p className="text-xs sm:text-sm text-[#57606A] mt-2 leading-relaxed">
                We believe that when you buy an account, you should completely own it. Every order includes the primary email mailbox login credentials so you can change passwords, add your own 2FA, and configure custom SSH keys immediately.
              </p>
            </div>

            <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#F6F8FA] border border-[#D0D7DE] flex items-center justify-center mb-4 text-[#2DA44E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#24292F]">Guaranteed 48-Hour Warranty</h3>
              <p className="text-xs sm:text-sm text-[#57606A] mt-2 leading-relaxed">
                If you encounter any credential defect, mailbox lock, or unexpected first-login issue within 48 hours of dispatch, our support team promptly replaces the account free of charge.
              </p>
            </div>

            <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#F6F8FA] border border-[#D0D7DE] flex items-center justify-center mb-4 text-[#2DA44E]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#24292F]">Transparent Upfront Pricing</h3>
              <p className="text-xs sm:text-sm text-[#57606A] mt-2 leading-relaxed">
                Every price on our website is literal and exact ($5 for new accounts, $35 for aged accounts, $55 for student packs, $200 for 100 bulk accounts). No surprise fees or forced recurring plans.
              </p>
            </div>

            <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#F6F8FA] border border-[#D0D7DE] flex items-center justify-center mb-4 text-[#2DA44E]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#24292F]">Human-to-Human Support</h3>
              <p className="text-xs sm:text-sm text-[#57606A] mt-2 leading-relaxed">
                You never have to navigate frustrating automated phone trees or ticketing delays. Our operators communicate directly over Telegram (@EgSupport24) and WhatsApp (+1 307 393 9979) 7 days a week.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Mandatory Disclaimer Statement */}
      <section className="py-12 bg-white border-b border-[#D0D7DE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFF8C5]/30 border border-[#D29922]/40 rounded-xl p-6">
            <h3 className="text-sm font-bold text-[#24292F] flex items-center">
              <ShieldCheck className="w-4 h-4 text-[#D29922] mr-2" />
              Independent Third-Party Status Notice
            </h3>
            <p className="text-xs text-[#57606A] mt-2 leading-relaxed">
              BuyGitHubAccounts.com is an independent third-party service provider and is not affiliated with, endorsed by, or sponsored by GitHub, Inc. or Microsoft Corporation. GitHub, the GitHub Octocat logo, and related trademarks are the property of GitHub, Inc. Our services are provided to assist software developers, agencies, and open-source creators with staging environments, testing setups, and legitimate visibility solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Crypto Payment Section */}
      <CryptoPaymentSection />

    </div>
  );
};
