import { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  Coins, 
  CheckCircle2, 
  Lock, 
  Copy, 
  Check, 
  QrCode, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Wallet
} from 'lucide-react';
import { cryptoWallets, getCryptoWalletById } from '../data/cryptoWallets';
import { CryptoWallet } from '../types';

interface CryptoPaymentSectionProps {
  initialUsdAmount?: number;
}

export const CryptoPaymentSection = ({ initialUsdAmount = 35 }: CryptoPaymentSectionProps) => {
  const [calcAmount, setCalcAmount] = useState<number>(initialUsdAmount);
  const [selectedWalletId, setSelectedWalletId] = useState<string>('usdt-trc20');
  const [activeCategory, setActiveCategory] = useState<'all' | 'stablecoin' | 'major' | 'altcoin'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const selectedWallet: CryptoWallet = getCryptoWalletById(selectedWalletId) || cryptoWallets[0];

  const filteredWallets = activeCategory === 'all' 
    ? cryptoWallets 
    : cryptoWallets.filter((w) => w.category === activeCategory);

  const handleCopy = (wallet: CryptoWallet) => {
    navigator.clipboard.writeText(wallet.address);
    setCopiedId(wallet.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const estimatedCryptoAmount = (calcAmount / selectedWallet.estRateUsd).toFixed(selectedWallet.decimals);

  const telegramOrderMsg = encodeURIComponent(
    `Hello, I would like to pay for my GitHub order ($${calcAmount}) via ${selectedWallet.symbol} on ${selectedWallet.network}.\nI am sending to address:\n${selectedWallet.address}\n\nPlease confirm and dispatch order.`
  );

  const whatsappOrderMsg = encodeURIComponent(
    `Hello, I want to make a payment of $${calcAmount} using ${selectedWallet.symbol} (${selectedWallet.network}) to address:\n${selectedWallet.address}`
  );

  // Generate SVG QR Code representation with custom styling
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(selectedWallet.address)}&bgcolor=ffffff&color=24292f&margin=1`;

  return (
    <section id="crypto-payments" className="py-16 bg-[#F6F8FA] border-y border-[#D0D7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-[#E1F0DA] text-[#1A7F37] text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-[#2DA44E]/30">
            <Coins className="w-3.5 h-3.5" />
            <span>Official Crypto Payment Methods</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24292F] tracking-tight">
            Supported Cryptocurrency Wallets &amp; Instant Billing
          </h2>
          <p className="mt-3 text-sm text-[#57606A] leading-relaxed">
            We accept 12 verified cryptocurrency payment networks for all GitHub accounts and promotion orders. Send to our official wallet addresses below and share the transaction ID with support for immediate dispatch.
          </p>
        </div>

        {/* 2-Column Section: Left = Active Wallet & Details, Right = Interactive Calculator & QR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Wallet Selector & Address Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category Filter Tabs */}
            <div className="bg-white border border-[#D0D7DE] rounded-xl p-2 flex flex-wrap gap-1 shadow-xs">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#24292F] text-white shadow-xs'
                    : 'text-[#57606A] hover:bg-[#F6F8FA]'
                }`}
              >
                All 12 Payment Methods
              </button>
              <button
                onClick={() => setActiveCategory('stablecoin')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === 'stablecoin'
                    ? 'bg-[#24292F] text-white shadow-xs'
                    : 'text-[#57606A] hover:bg-[#F6F8FA]'
                }`}
              >
                Stablecoins (USDT &amp; USDC)
              </button>
              <button
                onClick={() => setActiveCategory('major')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === 'major'
                    ? 'bg-[#24292F] text-white shadow-xs'
                    : 'text-[#57606A] hover:bg-[#F6F8FA]'
                }`}
              >
                Major Coins (BTC, ETH, SOL, BNB)
              </button>
              <button
                onClick={() => setActiveCategory('altcoin')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === 'altcoin'
                    ? 'bg-[#24292F] text-white shadow-xs'
                    : 'text-[#57606A] hover:bg-[#F6F8FA]'
                }`}
              >
                Altcoins (LTC, TRX, DOGE)
              </button>
            </div>

            {/* List of Wallet Cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredWallets.map((wallet) => {
                const isSelected = selectedWalletId === wallet.id;
                const isCopied = copiedId === wallet.id;

                return (
                  <div
                    key={wallet.id}
                    onClick={() => setSelectedWalletId(wallet.id)}
                    className={`border rounded-xl p-4 sm:p-5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#2DA44E] ring-2 ring-[#2DA44E]/30 shadow-md'
                        : 'bg-white/90 border-[#D0D7DE] hover:border-[#24292F] hover:bg-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D0D7DE]/60">
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isSelected ? 'bg-[#2DA44E] text-white' : 'bg-[#F6F8FA] text-[#24292F] border border-[#D0D7DE]'
                        }`}>
                          <Wallet className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-[#24292F]">{wallet.symbol}</span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F6F8FA] text-[#57606A] border border-[#D0D7DE]">
                              {wallet.networkBadge}
                            </span>
                            {wallet.recommended && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E1F0DA] text-[#1A7F37] border border-[#2DA44E]/30">
                                Recommended
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#57606A] block mt-0.5">
                            {wallet.name} • Network: <strong className="text-[#24292F]">{wallet.network}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWalletId(wallet.id);
                            setShowQrModal(true);
                          }}
                          className="text-xs bg-[#F6F8FA] hover:bg-[#EAEEF2] text-[#24292F] border border-[#D0D7DE] px-2.5 py-1.5 rounded-md flex items-center transition-colors"
                          title="View QR Code"
                        >
                          <QrCode className="w-3.5 h-3.5 mr-1 text-[#0969DA]" />
                          <span>QR</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(wallet);
                          }}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-md flex items-center transition-colors ${
                            isCopied
                              ? 'bg-[#2DA44E] text-white'
                              : 'bg-[#24292F] hover:bg-[#1B1F23] text-white'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 mr-1" />
                              Copy Address
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Address Box */}
                    <div className="mt-3">
                      <div className="text-[11px] text-[#57606A] mb-1 font-medium">
                        Wallet Address ({wallet.network}):
                      </div>
                      <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-lg p-2.5 flex items-center justify-between group">
                        <code className="text-xs font-mono text-[#0969DA] font-semibold break-all selection:bg-[#2DA44E] selection:text-white">
                          {wallet.address}
                        </code>
                      </div>
                    </div>

                    {wallet.notes && (
                      <div className="mt-2 text-[11px] text-[#57606A] flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5 shrink-0" />
                        <span>{wallet.notes}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Verification & Handover Instructions */}
            <div className="bg-white border border-[#D0D7DE] rounded-xl p-5 space-y-3 text-xs text-[#57606A]">
              <div className="flex items-center text-[#24292F] font-bold text-sm">
                <Lock className="w-4 h-4 text-[#2DA44E] mr-2" />
                Payment Verification &amp; Order Handover Workflow
              </div>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Copy our official address above or scan the QR code using your wallet app (Trust Wallet, Binance, MetaMask, Phantom, Exodus, etc.).</li>
                <li>Ensure you choose the <strong>exact matching network</strong> (e.g. TRC-20 for Tron, BEP-20 for BSC, ERC-20 for Ethereum).</li>
                <li>Send the payment and take a screenshot or copy the Transaction Hash (TxID).</li>
                <li>Send the TxID to our Telegram (<strong>@EgSupport24</strong>) or WhatsApp (<strong>+1 307 393 9979</strong>) for instant account delivery.</li>
              </ol>
            </div>

          </div>

          {/* Right Column: Selected Currency Details, QR & Calculator */}
          <div className="lg:col-span-5 space-y-6 sticky top-20">
            
            {/* Active Payment Method Highlight Card */}
            <div className="bg-[#24292F] text-white rounded-xl border border-[#30363D] p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#30363D]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8B949E] font-semibold block">
                    Selected Payment Method
                  </span>
                  <div className="text-xl font-bold text-white mt-0.5 flex items-center">
                    {selectedWallet.symbol}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono bg-[#30363D] text-[#58A6FF] px-2.5 py-1 rounded border border-[#58A6FF]/30">
                    {selectedWallet.networkBadge}
                  </span>
                </div>
              </div>

              {/* QR Code Preview */}
              <div className="mt-5 bg-white p-4 rounded-xl border border-white/20 flex flex-col items-center justify-center text-center">
                <img 
                  src={qrSvgUrl} 
                  alt={`${selectedWallet.symbol} QR Code`}
                  className="w-44 h-44 rounded-md shadow-xs"
                  loading="lazy"
                />
                <span className="text-[11px] font-mono text-[#24292F] font-semibold mt-2">
                  Scan to Pay with {selectedWallet.displaySymbol}
                </span>
                <span className="text-[10px] text-[#57606A]">
                  Network: {selectedWallet.network}
                </span>
              </div>

              {/* Selected Address Display & Quick Copy */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8B949E]">
                  <span>Deposit Address:</span>
                  <button
                    onClick={() => handleCopy(selectedWallet)}
                    className="text-[#58A6FF] hover:underline flex items-center text-xs font-semibold"
                  >
                    {copiedId === selectedWallet.id ? (
                      <>
                        <Check className="w-3 h-3 mr-1 text-[#2DA44E]" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" /> Copy Address
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-3">
                  <code className="text-xs font-mono text-[#7EE787] break-all leading-relaxed block">
                    {selectedWallet.address}
                  </code>
                </div>
              </div>

              {/* Calculator Section */}
              <div className="mt-6 pt-5 border-t border-[#30363D] space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#C9D1D9]">
                    Calculate Payment Amount (USD):
                  </label>
                  <span className="text-xs font-mono text-[#8B949E]">
                    1 {selectedWallet.displaySymbol} ≈ ${selectedWallet.estRateUsd.toLocaleString()}
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm text-[#8B949E] font-mono">$</span>
                  <input
                    type="number"
                    min="5"
                    max="10000"
                    step="5"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Math.max(1, Number(e.target.value) || 0))}
                    className="w-full bg-[#161B22] border border-[#30363D] rounded-md py-2 pl-7 pr-3 text-sm text-white font-mono focus:outline-none focus:border-[#58A6FF]"
                  />
                </div>

                {/* Amount Quick Presets */}
                <div className="flex flex-wrap gap-1.5">
                  {[5, 17, 35, 55, 65, 100, 200].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCalcAmount(preset)}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors ${
                        calcAmount === preset
                          ? 'bg-[#2DA44E] text-white border-[#2DA44E]'
                          : 'bg-[#161B22] text-[#8B949E] border-[#30363D] hover:text-white'
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                {/* Calculation Output Box */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-3.5">
                  <div className="text-[11px] text-[#8B949E] mb-1">
                    Send Exactly:
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#58A6FF]">
                    {estimatedCryptoAmount} <span className="text-sm text-[#C9D1D9]">{selectedWallet.displaySymbol}</span>
                  </div>
                  <div className="text-[11px] text-[#8B949E] mt-1">
                    For order total: <strong className="text-white font-mono">${calcAmount} USD</strong>
                  </div>
                </div>
              </div>

              {/* Direct Dispatch Buttons */}
              <div className="mt-6 space-y-2.5">
                <a
                  href={`https://t.me/EgSupport24?text=${telegramOrderMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold py-3 px-4 rounded-md flex items-center justify-center transition-colors border border-[#58A6FF]/40 shadow-xs"
                >
                  <Send className="w-4 h-4 text-[#58A6FF] mr-2" />
                  Confirm Payment on Telegram (@EgSupport24)
                </a>
                <a
                  href={`https://wa.me/13073939979?text=${whatsappOrderMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-semibold py-3 px-4 rounded-md flex items-center justify-center transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Confirm Payment on WhatsApp (+1 307 393 9979)
                </a>
              </div>

              {/* Safety Warning */}
              <div className="mt-5 pt-4 border-t border-[#30363D] text-[11px] text-[#8B949E] flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-[#D29922] shrink-0 mt-0.5" />
                <span>
                  Always verify the network matches: <strong>{selectedWallet.network}</strong>. Sending coins via the incorrect blockchain may result in permanent transaction failure.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Optional Large QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-[#D0D7DE] animate-in fade-in zoom-in-95 duration-150">
            <h4 className="text-base font-bold text-[#24292F] mb-1">
              {selectedWallet.name} ({selectedWallet.networkBadge})
            </h4>
            <p className="text-xs text-[#57606A] mb-4">
              Scan with your crypto wallet app to send payment
            </p>

            <div className="bg-[#F6F8FA] p-4 rounded-xl border border-[#D0D7DE] inline-block mb-4">
              <img 
                src={qrSvgUrl} 
                alt={`${selectedWallet.symbol} QR Code`} 
                className="w-52 h-52 mx-auto rounded"
              />
            </div>

            <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-lg p-2.5 mb-4 text-left">
              <span className="text-[10px] uppercase font-bold text-[#57606A] block">Address:</span>
              <code className="text-xs font-mono text-[#0969DA] break-all block">
                {selectedWallet.address}
              </code>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(selectedWallet)}
                className="flex-1 bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center"
              >
                {copiedId === selectedWallet.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copy Address
                  </>
                )}
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="bg-[#F6F8FA] hover:bg-[#EAEEF2] border border-[#D0D7DE] text-[#24292F] text-xs font-semibold px-4 py-2.5 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
