import { Terminal, Send, MessageSquare, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';
import { navigateTo } from '../utils/router';

export const Footer = () => {
  const handleNav = (path: string) => {
    navigateTo(path);
  };

  return (
    <footer id="main-footer" className="bg-[#161B22] text-[#8B949E] border-t border-[#30363D] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#30363D]">
          
          {/* Column 1: Brand & Overview */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-md bg-[#2DA44E] flex items-center justify-center text-white">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                BuyGitHubAccounts<span className="text-[#2DA44E]">.com</span>
              </span>
            </div>
            <p className="text-xs text-[#8B949E] leading-relaxed">
              Professional digital services platform providing verified developer accounts, aged platform tenure, and organic open-source repository promotion solutions.
            </p>
            <div className="pt-1 space-y-2">
              <a
                href="https://t.me/EgSupport24"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-[#C9D1D9] hover:text-[#58A6FF] transition-colors"
              >
                <Send className="w-3.5 h-3.5 mr-2 text-[#58A6FF]" />
                Telegram: <span className="font-mono ml-1 font-semibold">@EgSupport24</span>
              </a>
              <a
                href="https://wa.me/13073939979"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-[#C9D1D9] hover:text-[#2DA44E] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#2DA44E]" />
                WhatsApp: <span className="font-mono ml-1 font-semibold">+1 (307) 393-9979</span>
              </a>
            </div>
          </div>

          {/* Column 2: Accounts */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9D1D9] mb-3.5">
              Accounts
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('/accounts/buy-new-github-accounts')}
                  className="hover:text-white transition-colors text-left"
                >
                  New GitHub Accounts ($5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/accounts/buy-aged-github-accounts')}
                  className="hover:text-white transition-colors text-left"
                >
                  Aged GitHub Accounts ($35)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/accounts/buy-github-active-account')}
                  className="hover:text-white transition-colors text-left"
                >
                  Active GitHub Accounts ($35)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/accounts/buy-github-student-account')}
                  className="hover:text-white transition-colors text-left"
                >
                  Student GitHub Accounts ($55)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/accounts/buy-bulk-github-accounts')}
                  className="hover:text-white transition-colors text-left"
                >
                  Bulk GitHub Accounts ($200/100)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/accounts')}
                  className="text-[#58A6FF] hover:underline font-medium pt-1 flex items-center"
                >
                  All 15 Account Services &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Promotion Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9D1D9] mb-3.5">
              Promotion Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('/promotion-services/buy-github-stars')}
                  className="hover:text-white transition-colors text-left"
                >
                  GitHub Stars (From $17)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/promotion-services/buy-github-forks')}
                  className="hover:text-white transition-colors text-left"
                >
                  GitHub Forks (From $15)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/promotion-services/buy-github-followers')}
                  className="hover:text-white transition-colors text-left"
                >
                  GitHub Followers (From $25)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/promotion-services/buy-github-watchers')}
                  className="hover:text-white transition-colors text-left"
                >
                  GitHub Watchers (From $25)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/promotion-services/buy-github-repositories')}
                  className="hover:text-white transition-colors text-left"
                >
                  GitHub Repositories (From $10)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/promotion-services/buy-github-achievements-badge')}
                  className="hover:text-white transition-colors text-left"
                >
                  GitHub Achievements Badge
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9D1D9] mb-3.5">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('/about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/blog')}
                  className="hover:text-white transition-colors text-left"
                >
                  Blog & Knowledge Base
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/checkout')}
                  className="hover:text-white transition-colors text-left text-[#58A6FF] font-medium"
                >
                  Order &amp; Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/faq')}
                  className="hover:text-white transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/sitemap')}
                  className="hover:text-white transition-colors text-left"
                >
                  HTML & XML Sitemap
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9D1D9] mb-3.5">
              Legal & Policies
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('/terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/privacy-policy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/refund-policy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Refund Policy (48h Warranty)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/delivery-policy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/disclaimer')}
                  className="hover:text-white transition-colors text-left text-[#D29922]"
                >
                  Disclaimer & Notices
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 space-y-4">
          {/* Mandatory Independent Provider Disclaimer Banner */}
          <div className="bg-[#0D1117] border border-[#30363D] rounded-md p-4 text-xs text-[#8B949E] leading-relaxed">
            <div className="flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D29922] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#C9D1D9] font-medium block mb-1">
                  Important Legal Disclaimer:
                </strong>
                <p>
                  BuyGitHubAccounts.com is an independent third-party service provider and is not affiliated with, endorsed by, or sponsored by GitHub, Inc. or Microsoft Corporation. All product names, logos, and brands are property of their respective owners. Services are provided for legitimate software engineering, development environments, automated testing, and portfolio purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E7781] pt-2">
            <div>
              &copy; 2026 BuyGitHubAccounts.com. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-3 sm:mt-0 font-mono text-[11px]">
              <span>Fast Support: Telegram <a href="https://t.me/EgSupport24" target="_blank" rel="noopener noreferrer" className="text-[#58A6FF] hover:underline">@EgSupport24</a></span>
              <span>•</span>
              <span>WhatsApp <a href="https://wa.me/13073939979" target="_blank" rel="noopener noreferrer" className="text-[#2DA44E] hover:underline">+1 (307) 393-9979</a></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
