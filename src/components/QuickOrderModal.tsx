import { useState, useEffect, type FormEvent } from 'react';
import { X, Send, MessageSquare, Check, Copy, ShieldCheck, Terminal, Coins, Wallet, ChevronRight } from 'lucide-react';
import { allServices } from '../data/allServices';
import { cryptoWallets, getCryptoWalletById } from '../data/cryptoWallets';
import { ServiceItem, PricingTier, CryptoWallet } from '../types';
import { sendOrderNotification } from '../services/emailService';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const QuickOrderModal = ({ isOpen, onClose, preselectedServiceId }: QuickOrderModalProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preselectedServiceId || 'buy-aged-github-accounts');
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);
  const [selectedWalletId, setSelectedWalletId] = useState<string>('usdt-trc20');
  const [customerContact, setCustomerContact] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'wallets'>('details');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [walletCopied, setWalletCopied] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
      setSelectedTierIndex(0);
    }
  }, [preselectedServiceId]);

  if (!isOpen) return null;

  const currentService = allServices.find((s) => s.id === selectedServiceId) || allServices[0];
  const activeTiers = currentService.pricingTiers || [
    { quantity: 1, label: currentService.name, price: currentService.basePrice, unitPrice: currentService.priceUnit }
  ];
  const selectedTier = activeTiers[selectedTierIndex] || activeTiers[0];
  const selectedWallet = getCryptoWalletById(selectedWalletId) || cryptoWallets[0];

  const prefilledMessage = `Hello BuyGitHubAccounts team, I want to order:
- Service: ${currentService.name}
- Package: ${selectedTier.label} (${selectedTier.price})
- Payment Method: ${selectedWallet.symbol} (${selectedWallet.network})
- Send to Wallet: ${selectedWallet.address}
- My Contact: ${customerContact ? customerContact : 'Please message me here'}
${notes ? `- Note: ${notes}` : ''}
Please confirm payment details. Thank you!`;

  const handleCopyOrderText = () => {
    navigator.clipboard.writeText(prefilledMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyWalletAddress = () => {
    navigator.clipboard.writeText(selectedWallet.address);
    setWalletCopied(true);
    setTimeout(() => setWalletCopied(false), 2500);
  };

  const handleLaunchTelegram = () => {
    const encoded = encodeURIComponent(prefilledMessage);
    window.open(`https://t.me/EgSupport24?text=${encoded}`, '_blank');
  };

  const handleLaunchWhatsApp = () => {
    const encoded = encodeURIComponent(prefilledMessage);
    window.open(`https://wa.me/13073939979?text=${encoded}`, '_blank');
  };

  const handleSubmitInquiry = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const generatedOrderId = `BGA-Q${Math.floor(10000 + Math.random() * 90000)}`;
    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const priceNum = parseFloat(String(selectedTier.price).replace(/[^0-9.]/g, '')) || 5;
    const isEmail = customerContact.includes('@');

    try {
      await sendOrderNotification({
        orderId: generatedOrderId,
        orderDate: nowStr,
        customerName: 'Quick Order Customer',
        billingEmail: isEmail ? customerContact.trim() : '',
        country: 'Global',
        contactChannel: isEmail ? 'email' : customerContact.startsWith('+') ? 'whatsapp' : 'telegram',
        contactHandle: customerContact.trim(),
        targetUrl: notes.trim(),
        deliveryFormat: 'text',
        orderNotes: notes.trim(),
        serviceName: currentService.name,
        serviceId: currentService.id,
        tierLabel: selectedTier.label || String(selectedTier.quantity),
        quantity: 1,
        subtotal: priceNum,
        totalUsd: priceNum,
        paymentMethod: selectedWallet.name,
        cryptoAmount: (priceNum / selectedWallet.estRateUsd).toFixed(selectedWallet.decimals),
        cryptoSymbol: selectedWallet.symbol,
        depositWalletAddress: selectedWallet.address,
      });
    } catch (err) {
      console.warn('Quick order email dispatch error:', err);
    }

    try {
      const confettiModule = await import('canvas-confetti');
      const confetti = (confettiModule.default || confettiModule) as unknown as (options?: unknown) => void;
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Graceful fallback if confetti fails to load
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-[#D0D7DE] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#24292F] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#30363D]">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-[#2DA44E]" />
            <h3 className="text-base font-bold tracking-tight">
              Order Checkout &amp; Crypto Payment
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close order modal"
            className="text-[#8B949E] hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-[#F6F8FA] border-b border-[#D0D7DE] px-6 pt-3 flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2.5 border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-[#2DA44E] text-[#24292F]'
                : 'border-transparent text-[#57606A] hover:text-[#24292F]'
            }`}
          >
            1. Service &amp; Details
          </button>
          <button
            onClick={() => setActiveTab('wallets')}
            className={`pb-2.5 border-b-2 flex items-center transition-all ${
              activeTab === 'wallets'
                ? 'border-[#2DA44E] text-[#24292F]'
                : 'border-transparent text-[#57606A] hover:text-[#24292F]'
            }`}
          >
            <Coins className="w-3.5 h-3.5 mr-1 text-[#0969DA]" />
            2. Payment Wallets ({cryptoWallets.length} Networks)
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#E1F0DA] text-[#1A7F37] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-[#24292F]">Order Inquiry Prepared!</h4>
            <p className="text-sm text-[#57606A] max-w-md mx-auto">
              Your order for <strong>{currentService.name} ({selectedTier.price})</strong> via <strong>{selectedWallet.symbol}</strong> is ready for instant processing.
            </p>

            {/* Selected Wallet Quick Copy Box */}
            <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-lg p-3 text-left">
              <div className="flex items-center justify-between text-xs font-semibold text-[#24292F] mb-1">
                <span>Official Deposit Address ({selectedWallet.network}):</span>
                <button
                  type="button"
                  onClick={handleCopyWalletAddress}
                  className="text-[#0969DA] hover:underline flex items-center"
                >
                  {walletCopied ? (
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
              <code className="text-xs font-mono text-[#0969DA] break-all block bg-white p-2 rounded border border-[#D0D7DE]">
                {selectedWallet.address}
              </code>
            </div>

            <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-lg p-3 text-left font-mono text-xs text-[#24292F] whitespace-pre-line">
              {prefilledMessage}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleLaunchTelegram}
                className="flex-1 bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold py-3 rounded-md flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4 text-[#58A6FF] mr-2" />
                Send via Telegram (@EgSupport24)
              </button>
              <button
                onClick={handleLaunchWhatsApp}
                className="flex-1 bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-semibold py-3 rounded-md flex items-center justify-center transition-colors"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send via WhatsApp (+1 307 393 9979)
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs text-[#57606A] hover:underline"
              >
                Close this window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitInquiry} className="p-6 space-y-5">
            {activeTab === 'details' ? (
              <>
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#24292F] uppercase tracking-wider mb-1.5">
                    Select Service:
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => {
                      setSelectedServiceId(e.target.value);
                      setSelectedTierIndex(0);
                    }}
                    className="w-full bg-[#F6F8FA] border border-[#D0D7DE] rounded-md px-3 py-2 text-sm text-[#24292F] focus:outline-none focus:ring-2 focus:ring-[#2DA44E]"
                  >
                    <optgroup label="Account Services">
                      {allServices.filter(s => s.category === 'accounts').map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {s.basePrice}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Promotion Services">
                      {allServices.filter(s => s.category === 'promotion').map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {s.basePrice}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Tier / Package Selection */}
                {activeTiers && activeTiers.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-[#24292F] uppercase tracking-wider mb-1.5">
                      Choose Package / Quantity Tier:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeTiers.map((tier, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setSelectedTierIndex(idx)}
                          className={`p-3 rounded-md border text-left transition-all ${
                            selectedTierIndex === idx
                              ? 'border-[#2DA44E] bg-[#E1F0DA]/30 ring-1 ring-[#2DA44E]'
                              : 'border-[#D0D7DE] bg-white hover:bg-[#F6F8FA]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#24292F]">{tier.label}</span>
                            <span className="text-xs font-mono font-bold text-[#2DA44E]">{tier.price}</span>
                          </div>
                          {tier.notes && (
                            <div className="text-[11px] text-[#57606A] mt-1 line-clamp-1">{tier.notes}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preferred Payment Method Dropdown */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#24292F] uppercase tracking-wider">
                      Select Crypto Payment Currency:
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveTab('wallets')}
                      className="text-xs text-[#0969DA] hover:underline font-medium"
                    >
                      View full wallet list &rarr;
                    </button>
                  </div>
                  <select
                    value={selectedWalletId}
                    onChange={(e) => setSelectedWalletId(e.target.value)}
                    className="w-full bg-[#F6F8FA] border border-[#D0D7DE] rounded-md px-3 py-2 text-sm text-[#24292F] focus:outline-none focus:ring-2 focus:ring-[#2DA44E]"
                  >
                    {cryptoWallets.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.symbol} ({w.network}) {w.recommended ? '— [Recommended]' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Summary Banner */}
                <div className="bg-[#24292F] text-white rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#8B949E] uppercase tracking-wider font-semibold">Total Price</div>
                    <div className="text-lg font-bold font-mono text-[#2DA44E]">{selectedTier.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-[#8B949E]">Includes 48-Hour Warranty</div>
                    <div className="text-xs text-[#58A6FF] font-medium">{selectedWallet.symbol} Accepted</div>
                  </div>
                </div>

                {/* Contact Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#24292F] mb-1">
                      Your Telegram Handle / WhatsApp / Email:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@yourusername or +1..."
                      value={customerContact}
                      onChange={(e) => setCustomerContact(e.target.value)}
                      className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-sm text-[#24292F] focus:outline-none focus:ring-2 focus:ring-[#2DA44E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24292F] mb-1">
                      Target Repo Link / Notes (Optional):
                    </label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-sm text-[#24292F] focus:outline-none focus:ring-2 focus:ring-[#2DA44E]"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* Wallets Tab */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#24292F] uppercase tracking-wider">
                    Choose Deposit Blockchain &amp; Copy Address:
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className="text-xs text-[#0969DA] hover:underline"
                  >
                    &larr; Back to Order Details
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {cryptoWallets.map((w) => {
                    const isSelected = selectedWalletId === w.id;
                    return (
                      <div
                        key={w.id}
                        onClick={() => setSelectedWalletId(w.id)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#2DA44E] bg-[#E1F0DA]/30 ring-1 ring-[#2DA44E]'
                            : 'border-[#D0D7DE] bg-white hover:bg-[#F6F8FA]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-[#24292F]">{w.symbol}</span>
                            <span className="text-[10px] bg-[#F6F8FA] px-2 py-0.5 rounded border border-[#D0D7DE] text-[#57606A]">
                              {w.networkBadge}
                            </span>
                            {w.recommended && (
                              <span className="text-[10px] bg-[#2DA44E] text-white px-1.5 py-0.2 rounded font-semibold">
                                Recommended
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWalletId(w.id);
                              navigator.clipboard.writeText(w.address);
                              setWalletCopied(true);
                              setTimeout(() => setWalletCopied(false), 2000);
                            }}
                            className="text-[11px] font-semibold text-[#0969DA] hover:underline flex items-center"
                          >
                            <Copy className="w-3 h-3 mr-1" /> Copy
                          </button>
                        </div>
                        <code className="text-[11px] font-mono text-[#57606A] break-all block">
                          {w.address}
                        </code>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Direct Connect Buttons */}
            <div className="pt-2 border-t border-[#D0D7DE] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#57606A]">
                <span>Instant Connect (Fastest Response):</span>
                <button
                  type="button"
                  onClick={handleCopyOrderText}
                  className="text-[#2DA44E] hover:underline flex items-center font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1" /> Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" /> Copy Order Text
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleLaunchTelegram}
                  className="bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold py-2.5 px-4 rounded-md flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4 text-[#58A6FF] mr-2" />
                  Order on Telegram (@EgSupport24)
                </button>
                <button
                  type="button"
                  onClick={handleLaunchWhatsApp}
                  className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-semibold py-2.5 px-4 rounded-md flex items-center justify-center transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Order on WhatsApp (+1 307 393 9979)
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F6F8FA] hover:bg-[#EAEEF2] border border-[#D0D7DE] text-[#24292F] text-xs font-semibold py-2 rounded-md transition-colors"
              >
                Or Generate On-Screen Receipt
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
