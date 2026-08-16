import { Terminal, ArrowLeft, Home, Search } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { navigateTo } from '../utils/router';

export const NotFoundPage = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-[60vh] flex items-center justify-center py-20 px-4">
      <SEOHead
        title="404 Page Not Found | BuyGitHubAccounts.com"
        description="The requested page or service could not be located on BuyGitHubAccounts.com."
        canonicalPath="/404"
      />

      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-[#F6F8FA] border border-[#D0D7DE] rounded-2xl flex items-center justify-center mx-auto text-[#24292F]">
          <Terminal className="w-8 h-8 text-[#57606A]" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-[#D29922] uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight mt-1">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#57606A] mt-2 leading-relaxed">
            The page or service you are looking for may have moved or does not exist. Browse our available services below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => navigateTo('/')}
            className="bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold py-2.5 px-4 rounded-md flex items-center justify-center transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-2" />
            Go to Homepage
          </button>
          <button
            onClick={() => navigateTo('/accounts')}
            className="bg-[#F6F8FA] hover:bg-[#EAEEF2] border border-[#D0D7DE] text-[#24292F] text-xs font-semibold py-2.5 px-4 rounded-md flex items-center justify-center transition-colors"
          >
            Browse Accounts
          </button>
        </div>
      </div>
    </div>
  );
};
