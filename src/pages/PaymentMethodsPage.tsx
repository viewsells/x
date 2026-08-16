import { useState } from 'react';
import { 
  Coins, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Copy, 
  Check, 
  QrCode, 
  AlertTriangle, 
  Lock, 
  ArrowRight,
  Terminal,
  Zap
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CryptoPaymentSection } from '../components/CryptoPaymentSection';
import { cryptoWallets } from '../data/cryptoWallets';
import { navigateTo } from '../utils/router';

interface PaymentMethodsPageProps {
  onOpenOrderModal: (serviceId?: string) => void;
}

export const PaymentMethodsPage = ({ onOpenOrderModal }: PaymentMethodsPageProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const paymentSchema = {
    '@type': 'WebPage',
    name: 'Accepted Payment Methods & Crypto Wallet Addresses',
    description: 'Official verified cryptocurrency payment addresses for BuyGitHubAccounts.com. Supporting USDT, Bitcoin, Ethereum, Solana, Litecoin, BNB, USDC, TRX, and Dogecoin.'
  };

  return (
    <div className="bg-[#FFFFFF]">
      <SEOHead
        title="Payment Methods & Crypto Wallets | BuyGitHubAccounts.com"
        description="Official cryptocurrency wallet addresses for BuyGitHubAccounts.com. Send USDT (TRC20/BEP20/ERC20), BTC, ETH, SOL, LTC, BNB, USDC, TRX, and DOGE for instant order fulfillment."
        canonicalPath="/payment-methods"
        schemaData={[paymentSchema]}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Payment Methods & Crypto Wallets' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#E1F0DA] text-[#1A7F37] border border-[#2DA44E]/30 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Coins className="w-3.5 h-3.5" />
              <span>12 Verified Payment Gateways</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight">
              Official Payment Methods &amp; Deposit Addresses
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#57606A] leading-relaxed">
              We support direct, non-custodial cryptocurrency settlements with zero processing fees. Transfer directly to our official wallet addresses below, then send your transaction ID to our 24/7 dispatch team for instant account and promotion delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Wallet Address Matrix Table */}
      <section className="py-12 bg-white border-b border-[#D0D7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-[#24292F]">
                Verified Wallet Address Directory
              </h2>
              <p className="text-xs text-[#57606A] mt-1">
                Always double check network compatibility before sending funds.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => onOpenOrderModal()}
                className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-bold px-4 py-2.5 rounded-md flex items-center transition-colors shadow-xs"
              >
                <span>Start New Order</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cryptoWallets.map((wallet) => {
              const isCopied = copiedId === wallet.id;
              return (
                <div
                  key={wallet.id}
                  className="border border-[#D0D7DE] rounded-xl p-5 bg-[#F6F8FA] hover:bg-white hover:border-[#24292F] transition-all flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#24292F] flex items-center">
                        {wallet.symbol}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#57606A] border border-[#D0D7DE]">
                        {wallet.networkBadge}
                      </span>
                    </div>

                    <div className="text-xs text-[#57606A] mb-3">
                      Network: <strong className="text-[#24292F]">{wallet.network}</strong>
                    </div>

                    <div className="bg-white border border-[#D0D7DE] rounded-lg p-2.5 mb-3">
                      <div className="text-[10px] uppercase font-bold text-[#8C959F] mb-0.5">Address:</div>
                      <code className="text-xs font-mono text-[#0969DA] font-semibold break-all selection:bg-[#2DA44E] selection:text-white">
                        {wallet.address}
                      </code>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#D0D7DE]/60 flex items-center justify-between">
                    <span className="text-[11px] text-[#57606A] font-mono">
                      1 {wallet.displaySymbol} ≈ ${wallet.estRateUsd.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleCopy(wallet.id, wallet.address)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-md flex items-center transition-colors ${
                        isCopied
                          ? 'bg-[#2DA44E] text-white'
                          : 'bg-[#24292F] hover:bg-[#1B1F23] text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 mr-1" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Interactive Crypto Payment Section with Calculator */}
      <CryptoPaymentSection />

      {/* Ordering & Delivery Process Notice */}
      <section className="py-14 bg-white border-b border-[#D0D7DE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#24292F]">
              4 Simple Steps to Complete Your Order
            </h2>
            <p className="text-xs sm:text-sm text-[#57606A] mt-2">
              Our automated dispatch system handles orders 7 days a week with rapid turnaround times.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 border border-[#D0D7DE] rounded-xl bg-[#F6F8FA]">
              <div className="w-7 h-7 bg-[#24292F] text-white rounded-full flex items-center justify-center text-xs font-bold mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-[#24292F]">Pick Package</h3>
              <p className="text-xs text-[#57606A] mt-1 leading-relaxed">
                Choose your GitHub account tier or repository promotion volume.
              </p>
            </div>

            <div className="p-5 border border-[#D0D7DE] rounded-xl bg-[#F6F8FA]">
              <div className="w-7 h-7 bg-[#24292F] text-white rounded-full flex items-center justify-center text-xs font-bold mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-[#24292F]">Transfer Crypto</h3>
              <p className="text-xs text-[#57606A] mt-1 leading-relaxed">
                Send the equivalent USD amount to any of our 12 verified wallet addresses.
              </p>
            </div>

            <div className="p-5 border border-[#D0D7DE] rounded-xl bg-[#F6F8FA]">
              <div className="w-7 h-7 bg-[#24292F] text-white rounded-full flex items-center justify-center text-xs font-bold mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-[#24292F]">Submit TxID</h3>
              <p className="text-xs text-[#57606A] mt-1 leading-relaxed">
                Message our Telegram (@EgSupport24) or WhatsApp with your transaction hash.
              </p>
            </div>

            <div className="p-5 border border-[#D0D7DE] rounded-xl bg-[#F6F8FA]">
              <div className="w-7 h-7 bg-[#2DA44E] text-white rounded-full flex items-center justify-center text-xs font-bold mb-3">
                4
              </div>
              <h3 className="text-sm font-bold text-[#24292F]">Instant Delivery</h3>
              <p className="text-xs text-[#57606A] mt-1 leading-relaxed">
                Receive primary email credentials or live repository promotion tracking.
              </p>
            </div>
          </div>

          <div className="bg-[#24292F] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <h3 className="text-lg font-bold">Need a Custom Invoice or Bulk Quote?</h3>
              <p className="text-xs text-[#8B949E] mt-1 max-w-xl">
                For custom volume contracts over $500, we provide priority operator assignment and dedicated Telegram channels.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="https://t.me/EgSupport24"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#58A6FF] hover:bg-[#4094F7] text-[#161B22] text-xs font-bold px-4 py-2.5 rounded-md flex items-center transition-colors"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Contact Operator
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
