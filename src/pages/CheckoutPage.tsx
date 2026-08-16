import { useState, useEffect, type FormEvent } from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Coins, 
  Copy, 
  Check, 
  QrCode, 
  AlertTriangle, 
  Lock, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Wallet, 
  Star, 
  Download, 
  Printer, 
  RefreshCw, 
  ExternalLink, 
  HelpCircle,
  CreditCard,
  Tag,
  CheckCheck,
  ChevronDown,
  ShoppingBag,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductVisual, getServiceSKU, getServiceStockStatus } from '../components/ProductVisual';
import { allServices, getServiceById } from '../data/allServices';
import { cryptoWallets, getCryptoWalletById } from '../data/cryptoWallets';
import { ServiceItem, PricingTier, CryptoWallet } from '../types';
import { navigateTo } from '../utils/router';

interface CheckoutPageProps {
  initialServiceId?: string;
}

export const CheckoutPage = ({ initialServiceId }: CheckoutPageProps) => {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const queryServiceId = urlParams?.get('service') || urlParams?.get('id') || initialServiceId;
  const queryTier = urlParams?.get('tier');

  const defaultService = (queryServiceId && getServiceById(queryServiceId)) || allServices[0];

  const [selectedServiceId, setSelectedServiceId] = useState<string>(defaultService.id);
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);
  const [quantityMultiplier, setQuantityMultiplier] = useState<number>(1);
  const [showServiceSelector, setShowServiceSelector] = useState<boolean>(false);
  const [categoryTab, setCategoryTab] = useState<'all' | 'accounts' | 'promotion'>('all');

  // Coupon state
  const [couponCode, setCouponCode] = useState<string>('');
  const [showCouponInput, setShowCouponInput] = useState<boolean>(false);
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number; amount: number } | null>(null);
  const [couponError, setCouponError] = useState<string>('');

  // WooCommerce Billing Details
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [billingEmail, setBillingEmail] = useState<string>('');
  const [country, setCountry] = useState<string>('United States (US)');
  const [contactChannel, setContactChannel] = useState<'telegram' | 'whatsapp' | 'email'>('telegram');
  const [contactHandle, setContactHandle] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [deliveryFormat, setDeliveryFormat] = useState<'text' | 'json' | 'csv'>('text');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  // WooCommerce Payment Gateway
  const [selectedWalletId, setSelectedWalletId] = useState<string>('usdt-trc20');
  const [walletCategory, setWalletCategory] = useState<'all' | 'stablecoin' | 'major' | 'altcoin'>('all');
  const [txHash, setTxHash] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // Submission & Receipt state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [orderDate, setOrderDate] = useState<string>('');
  const [copiedManifest, setCopiedManifest] = useState<boolean>(false);

  // Synchronize when query changes
  useEffect(() => {
    if (queryServiceId) {
      const found = getServiceById(queryServiceId);
      if (found) {
        setSelectedServiceId(found.id);
        if (queryTier) {
          const tIdx = parseInt(queryTier, 10);
          if (!isNaN(tIdx) && found.pricingTiers && found.pricingTiers[tIdx]) {
            setSelectedTierIndex(tIdx);
          }
        }
      }
    }
  }, [queryServiceId, queryTier]);

  const currentService: ServiceItem = getServiceById(selectedServiceId) || allServices[0];
  const activeTiers: PricingTier[] = currentService.pricingTiers && currentService.pricingTiers.length > 0
    ? currentService.pricingTiers
    : [{ quantity: 1, label: currentService.name, price: currentService.basePrice, unitPrice: currentService.priceUnit }];

  const selectedTier = activeTiers[selectedTierIndex] || activeTiers[0];
  const selectedWallet: CryptoWallet = getCryptoWalletById(selectedWalletId) || cryptoWallets[0];

  const parsePriceToNumber = (priceVal: string | number): number => {
    if (typeof priceVal === 'number') return priceVal;
    const num = parseFloat(String(priceVal).replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 35 : num;
  };

  const unitBasePrice = parsePriceToNumber(selectedTier.price);
  const rawSubtotal = unitBasePrice * quantityMultiplier;
  const discountAmount = appliedDiscount ? (rawSubtotal * appliedDiscount.percent) / 100 : 0;
  const finalTotalUsd = Math.max(1, rawSubtotal - discountAmount);
  const cryptoTotal = (finalTotalUsd / selectedWallet.estRateUsd).toFixed(selectedWallet.decimals);

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (code === 'WELCOME5' || code === 'GITHUB5') {
      setAppliedDiscount({ code, percent: 5, amount: (rawSubtotal * 0.05) });
      setCouponError('');
    } else if (code === 'CRYPTO10' || code === 'DEV10' || code === 'GITHUB10') {
      setAppliedDiscount({ code, percent: 10, amount: (rawSubtotal * 0.10) });
      setCouponError('');
    } else {
      setCouponError('Coupon code is invalid or expired. Try: GITHUB10');
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedWallet.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2200);
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert('Please agree to the website terms and conditions to proceed.');
      return;
    }

    if (!billingEmail && !contactHandle) {
      alert('Please provide either an Email address or your Telegram / WhatsApp handle for deliverable handover.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `BGA-${Math.floor(100000 + Math.random() * 900000)}`;
      const nowStr = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      setOrderId(generatedOrderId);
      setOrderDate(nowStr);
      setIsSubmitting(false);
      setIsOrderPlaced(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  const orderManifestText = `================================================
BUYGITHUBACCOUNTS.COM - WOOCOMMERCE ORDER SLIP
================================================
Order Number   : #${orderId}
Order Date     : ${orderDate}
Order Status   : Pending Verification / Processing

CUSTOMER BILLING & DELIVERY:
Customer Name  : ${firstName || 'Guest'} ${lastName || ''}
Billing Email  : ${billingEmail || 'Not specified'}
Country/Region : ${country}
Delivery Option: ${contactChannel.toUpperCase()} (${contactHandle || 'Provided on checkout'})
Target URL/Repo: ${targetUrl || 'Standard Account Delivery'}
Delivery Format: ${deliveryFormat.toUpperCase()}
Order Notes    : ${orderNotes || 'None'}

ORDER SUMMARY:
Product        : ${currentService.name}
SKU            : ${getServiceSKU(currentService.id)}
Package Tier   : ${selectedTier.label || selectedTier.quantity} (${selectedTier.price})
Quantity       : ${quantityMultiplier}
Subtotal       : $${rawSubtotal.toFixed(2)} USD
Discount       : ${appliedDiscount ? `-$${discountAmount.toFixed(2)} (${appliedDiscount.code})` : '$0.00'}
TOTAL AMOUNT   : $${finalTotalUsd.toFixed(2)} USD

PAYMENT GATEWAY:
Payment Method : ${selectedWallet.name} (${selectedWallet.network})
Required Crypto: ${cryptoTotal} ${selectedWallet.symbol}
Pay Address    : ${selectedWallet.address}
TxID / Hash    : ${txHash || 'Awaiting dispatch confirmation'}

WARRANTY & SUPPORT:
- 48-Hour Replacement Guarantee Included
- 100% Primary Email Mailbox Access Handover
- Support Telegram: @EgSupport24 | WhatsApp: +1 (307) 393-9979
================================================`;

  const handleCopyManifest = () => {
    navigator.clipboard.writeText(orderManifestText);
    setCopiedManifest(true);
    setTimeout(() => setCopiedManifest(false), 2500);
  };

  const telegramDispatchUrl = `https://t.me/EgSupport24?text=${encodeURIComponent(
    `Hello BuyGitHubAccounts Support! I have placed an order:\n\nOrder Ref: #${orderId}\nProduct: ${currentService.name} (${selectedTier.label || selectedTier.quantity})\nTotal: $${finalTotalUsd.toFixed(2)} (${cryptoTotal} ${selectedWallet.symbol})\nTxID: ${txHash || 'Will share in chat'}\nDelivery Channel: ${contactChannel} (${contactHandle || billingEmail})\n\nPlease confirm payment and initiate credentials dispatch.`
  )}`;

  const whatsappDispatchUrl = `https://wa.me/13073939979?text=${encodeURIComponent(
    `Hello BuyGitHubAccounts! I placed order #${orderId} for ${currentService.name} ($${finalTotalUsd.toFixed(2)} / ${cryptoTotal} ${selectedWallet.symbol}). TxID: ${txHash || 'Sending in chat'}. Please confirm dispatch.`
  )}`;

  const filteredWallets = walletCategory === 'all'
    ? cryptoWallets
    : cryptoWallets.filter((w) => w.category === walletCategory);

  const filteredServicesList = categoryTab === 'all'
    ? allServices
    : allServices.filter((s) => s.category === categoryTab);

  return (
    <div className="bg-[#F6F8FA] min-h-screen text-[#24292F] pb-20">
      <SEOHead
        title={isOrderPlaced ? `Order Received #${orderId} | BuyGitHubAccounts.com` : `Checkout & Order Confirmation | BuyGitHubAccounts.com`}
        description="Complete your order for verified GitHub accounts and promotion services with instant crypto settlement, WooCommerce-style billing, and 48-hour warranty."
        canonicalPath="/checkout"
      />

      {/* WooCommerce Progress Header */}
      <div className="bg-white border-b border-[#D0D7DE] py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <Breadcrumbs
              items={[
                { label: 'Store', path: '/accounts' },
                { label: isOrderPlaced ? `Order #${orderId}` : 'Checkout' }
              ]}
            />

            {/* Step Sequence Pills */}
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <button 
                onClick={() => navigateTo('/accounts')}
                className="text-[#57606A] hover:text-[#24292F] flex items-center"
              >
                <span className="w-5 h-5 rounded-full bg-[#F6F8FA] border border-[#D0D7DE] inline-flex items-center justify-center mr-1.5 text-[11px]">1</span>
                <span>Cart</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C959F]" />
              
              <div className={`flex items-center ${!isOrderPlaced ? 'text-[#2DA44E] font-bold' : 'text-[#57606A]'}`}>
                <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center mr-1.5 text-[11px] ${!isOrderPlaced ? 'bg-[#2DA44E] text-white' : 'bg-[#E1F0DA] text-[#1A7F37]'}`}>2</span>
                <span>Checkout</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C959F]" />

              <div className={`flex items-center ${isOrderPlaced ? 'text-[#2DA44E] font-bold' : 'text-[#8C959F]'}`}>
                <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center mr-1.5 text-[11px] ${isOrderPlaced ? 'bg-[#2DA44E] text-white' : 'bg-[#F6F8FA] border border-[#D0D7DE]'}`}>3</span>
                <span>Order Received</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* =========================================================
            STATE A: ORDER RECEIVED (WOOCOMMERCE THANK YOU PAGE)
            ========================================================= */}
        {isOrderPlaced ? (
          <div className="space-y-8 max-w-4xl mx-auto">
            
            {/* WooCommerce Order Banner */}
            <div className="bg-white border-2 border-[#2DA44E] rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center space-x-3 text-[#1A7F37] mb-3">
                <div className="w-10 h-10 rounded-full bg-[#E1F0DA] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#2DA44E]" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#24292F]">
                    Thank you. Your order has been received.
                  </h1>
                  <p className="text-xs sm:text-sm text-[#57606A] mt-0.5">
                    Our technical dispatch operators have been notified. Please confirm your transfer details below.
                  </p>
                </div>
              </div>

              {/* Order Meta Bar */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F6F8FA] rounded-lg border border-[#D0D7DE] text-xs">
                <div>
                  <span className="text-[#57606A] block text-[11px] uppercase tracking-wider font-semibold">Order Number:</span>
                  <strong className="text-[#24292F] font-mono text-sm">#{orderId}</strong>
                </div>
                <div>
                  <span className="text-[#57606A] block text-[11px] uppercase tracking-wider font-semibold">Date:</span>
                  <strong className="text-[#24292F]">{orderDate}</strong>
                </div>
                <div>
                  <span className="text-[#57606A] block text-[11px] uppercase tracking-wider font-semibold">Total:</span>
                  <strong className="text-[#1A7F37] font-mono text-sm">${finalTotalUsd.toFixed(2)} USD</strong>
                </div>
                <div>
                  <span className="text-[#57606A] block text-[11px] uppercase tracking-wider font-semibold">Payment Method:</span>
                  <strong className="text-[#24292F]">{selectedWallet.name}</strong>
                </div>
              </div>
            </div>

            {/* Instant Handover Dispatch Buttons */}
            <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-base font-bold text-[#24292F] flex items-center">
                <Send className="w-4 h-4 mr-2 text-[#0969DA]" />
                1-Click Support Dispatch (Recommended for Fast Handover)
              </h2>
              <p className="text-xs text-[#57606A] mt-1">
                To expedite account credentials delivery or promotion tracking, click below to open a pre-filled ticket with our live operators:
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={telegramDispatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#24292F] hover:bg-[#1B1F23] text-white p-4 rounded-lg flex items-center justify-between transition-colors shadow-xs group"
                >
                  <div className="flex items-center space-x-3">
                    <Send className="w-5 h-5 text-[#2DA44E] group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold">Dispatch to Telegram Support</div>
                      <div className="text-[11px] text-gray-300">@EgSupport24 (Instant)</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href={whatsappDispatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2DA44E] hover:bg-[#2C974B] text-white p-4 rounded-lg flex items-center justify-between transition-colors shadow-xs group"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold">Dispatch to WhatsApp Support</div>
                      <div className="text-[11px] text-green-100">+1 (307) 393-9979</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-green-200" />
                </a>
              </div>
            </div>

            {/* WooCommerce Order Details Table */}
            <div className="bg-white border border-[#D0D7DE] rounded-xl overflow-hidden shadow-xs">
              <div className="bg-[#F6F8FA] border-b border-[#D0D7DE] px-6 py-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#24292F]">Order Details</h2>
                <span className="text-xs font-mono text-[#57606A]">{getServiceSKU(currentService.id)}</span>
              </div>

              <div className="p-6">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#D0D7DE] text-[#57606A] font-bold">
                      <th className="pb-3">Product</th>
                      <th className="pb-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D0D7DE]">
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <ProductVisual serviceId={currentService.id} size="sm" />
                          <div>
                            <span className="font-bold text-[#24292F] block">{currentService.name}</span>
                            <span className="text-xs text-[#57606A]">
                              Tier: {selectedTier.label || selectedTier.quantity} × {quantityMultiplier}
                            </span>
                            <div className="text-[11px] text-[#1A7F37] mt-0.5">
                              ✓ 48-Hour Warranty &amp; Full Mailbox Credentials Included
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right font-mono font-bold text-[#24292F]">
                        ${rawSubtotal.toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 font-semibold text-[#57606A]">Subtotal:</td>
                      <td className="py-3 text-right font-mono text-[#24292F]">${rawSubtotal.toFixed(2)}</td>
                    </tr>

                    {appliedDiscount && (
                      <tr>
                        <td className="py-3 font-semibold text-[#1A7F37]">
                          Discount ({appliedDiscount.code}):
                        </td>
                        <td className="py-3 text-right font-mono text-[#1A7F37]">
                          -${discountAmount.toFixed(2)}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td className="py-3 font-semibold text-[#57606A]">Payment Method:</td>
                      <td className="py-3 text-right text-[#24292F]">{selectedWallet.name} ({selectedWallet.network})</td>
                    </tr>

                    <tr>
                      <td className="py-3 font-semibold text-[#57606A]">Crypto Amount:</td>
                      <td className="py-3 text-right font-mono font-bold text-[#1A7F37]">{cryptoTotal} {selectedWallet.symbol}</td>
                    </tr>

                    {txHash && (
                      <tr>
                        <td className="py-3 font-semibold text-[#57606A]">TxID / Hash:</td>
                        <td className="py-3 text-right font-mono text-xs text-[#24292F] max-w-[200px] truncate">{txHash}</td>
                      </tr>
                    )}

                    <tr className="bg-[#F6F8FA]/60 font-bold text-sm">
                      <td className="py-4 px-2 text-[#24292F]">Total:</td>
                      <td className="py-4 px-2 text-right font-mono text-[#1A7F37] text-base">
                        ${finalTotalUsd.toFixed(2)} USD
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Customer Address Details Card */}
                <div className="mt-6 pt-6 border-t border-[#D0D7DE] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#57606A]">
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#24292F] mb-2">
                      Customer &amp; Handover Details:
                    </h3>
                    <p><strong className="text-[#24292F]">Name:</strong> {firstName || 'N/A'} {lastName || ''}</p>
                    <p><strong className="text-[#24292F]">Email:</strong> {billingEmail || 'N/A'}</p>
                    <p><strong className="text-[#24292F]">Delivery Channel:</strong> {contactChannel.toUpperCase()} ({contactHandle || 'Direct'})</p>
                    <p><strong className="text-[#24292F]">Country:</strong> {country}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#24292F] mb-2">
                      Technical Specifications:
                    </h3>
                    <p><strong className="text-[#24292F]">Target URL / Repo:</strong> {targetUrl || 'N/A (Account Credentials)'}</p>
                    <p><strong className="text-[#24292F]">Deliverable Format:</strong> {deliveryFormat.toUpperCase()}</p>
                    <p><strong className="text-[#24292F]">Order Notes:</strong> {orderNotes || 'None'}</p>
                  </div>
                </div>

                {/* Slip Actions */}
                <div className="mt-8 pt-6 border-t border-[#D0D7DE] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopyManifest}
                      className="bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] text-xs font-semibold px-3 py-2 rounded text-[#24292F] flex items-center transition-colors"
                    >
                      {copiedManifest ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#2DA44E] mr-1.5" />
                          Receipt Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5" />
                          Copy Order Slip
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] text-xs font-semibold px-3 py-2 rounded text-[#24292F] flex items-center transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5 mr-1.5" />
                      Print Receipt
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setIsOrderPlaced(false);
                      navigateTo('/accounts');
                    }}
                    className="text-xs text-[#0969DA] font-semibold hover:underline flex items-center"
                  >
                    <span>Browse More Services</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        ) : (

          /* =========================================================
              STATE B: WOOCOMMERCE 2-COLUMN CHECKOUT FORM
              ========================================================= */
          <div className="space-y-6">

            {/* Coupon Accordion Banner */}
            <div className="bg-white border border-[#D0D7DE] rounded-lg p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#57606A]">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-[#0969DA]" />
                  <span>Have a coupon?</span>
                  <button
                    type="button"
                    onClick={() => setShowCouponInput(!showCouponInput)}
                    className="text-[#0969DA] font-semibold hover:underline ml-1"
                  >
                    Click here to enter your code
                  </button>
                </div>
                {appliedDiscount && (
                  <span className="text-[#1A7F37] font-semibold bg-[#E1F0DA] px-2 py-0.5 rounded border border-[#2DA44E]/30">
                    Applied: {appliedDiscount.code} (-{appliedDiscount.percent}%)
                  </span>
                )}
              </div>

              {showCouponInput && (
                <form onSubmit={handleApplyCoupon} className="mt-3 pt-3 border-t border-[#D0D7DE] flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. GITHUB10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white border border-[#D0D7DE] rounded px-3 py-2 text-xs text-[#24292F] uppercase font-mono focus:outline-none focus:border-[#24292F]"
                  />
                  <button
                    type="submit"
                    className="bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
                  >
                    Apply Coupon
                  </button>
                </form>
              )}

              {couponError && (
                <p className="mt-2 text-xs text-[#CF222E]">{couponError}</p>
              )}
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* ---------------------------------------------------------
                  LEFT COLUMN: BILLING & DELIVERY DETAILS (WOOCOMMERCE)
                  --------------------------------------------------------- */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg font-bold text-[#24292F] border-b border-[#D0D7DE] pb-3 mb-5 flex items-center justify-between">
                    <span>Billing &amp; Delivery Details</span>
                    <span className="text-xs font-normal text-[#57606A] font-mono">* Required fields</span>
                  </h2>

                  <div className="space-y-4">
                    
                    {/* Names 2-Col */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#24292F] mb-1">
                          First name <span className="text-[#CF222E]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="e.g. Alex"
                          className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:border-[#24292F]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#24292F] mb-1">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Miller"
                          className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:border-[#24292F]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-[#24292F] mb-1">
                        Email address (for order receipt &amp; backup) <span className="text-[#CF222E]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={billingEmail}
                        onChange={(e) => setBillingEmail(e.target.value)}
                        placeholder="developer@example.com"
                        className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:border-[#24292F]"
                      />
                      <p className="text-[11px] text-[#57606A] mt-1">
                        We will dispatch encrypted backup credentials and order confirmation to this address.
                      </p>
                    </div>

                    {/* Country / Region */}
                    <div>
                      <label className="block text-xs font-semibold text-[#24292F] mb-1">
                        Country / Region <span className="text-[#CF222E]">*</span>
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:border-[#24292F]"
                      >
                        <option value="United States (US)">United States (US)</option>
                        <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                        <option value="Germany (DE)">Germany (DE)</option>
                        <option value="Canada (CA)">Canada (CA)</option>
                        <option value="Singapore (SG)">Singapore (SG)</option>
                        <option value="Australia (AU)">Australia (AU)</option>
                        <option value="Netherlands (NL)">Netherlands (NL)</option>
                        <option value="France (FR)">France (FR)</option>
                        <option value="India (IN)">India (IN)</option>
                        <option value="Japan (JP)">Japan (JP)</option>
                        <option value="Global / International">Global / International</option>
                      </select>
                    </div>

                    {/* Technical Delivery Channel */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-[#24292F] mb-1.5">
                        Preferred Handover Channel <span className="text-[#CF222E]">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setContactChannel('telegram')}
                          className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center space-x-1.5 transition-all ${
                            contactChannel === 'telegram'
                              ? 'bg-[#F6F8FA] border-[#24292F] text-[#24292F] font-bold shadow-xs'
                              : 'bg-white border-[#D0D7DE] text-[#57606A] hover:bg-[#F6F8FA]'
                          }`}
                        >
                          <Send className="w-3.5 h-3.5 text-[#0969DA]" />
                          <span>Telegram</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setContactChannel('whatsapp')}
                          className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center space-x-1.5 transition-all ${
                            contactChannel === 'whatsapp'
                              ? 'bg-[#F6F8FA] border-[#24292F] text-[#24292F] font-bold shadow-xs'
                              : 'bg-white border-[#D0D7DE] text-[#57606A] hover:bg-[#F6F8FA]'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#2DA44E]" />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setContactChannel('email')}
                          className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center space-x-1.5 transition-all ${
                            contactChannel === 'email'
                              ? 'bg-[#F6F8FA] border-[#24292F] text-[#24292F] font-bold shadow-xs'
                              : 'bg-white border-[#D0D7DE] text-[#57606A] hover:bg-[#F6F8FA]'
                          }`}
                        >
                          <Lock className="w-3.5 h-3.5 text-[#8250DF]" />
                          <span>Email Direct</span>
                        </button>
                      </div>

                      <div className="mt-2">
                        <input
                          type="text"
                          required
                          value={contactHandle}
                          onChange={(e) => setContactHandle(e.target.value)}
                          placeholder={
                            contactChannel === 'telegram' 
                              ? 'Your Telegram handle (e.g. @devuser)'
                              : contactChannel === 'whatsapp'
                              ? 'Your WhatsApp number with country code (e.g. +1 555 123 4567)'
                              : 'Confirmation email address'
                          }
                          className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:border-[#24292F]"
                        />
                      </div>
                    </div>

                    {/* Target URL / Repository Link (If Promotion or Specific setup) */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-[#24292F] mb-1">
                        {currentService.category === 'promotion' 
                          ? 'Target Repository / Profile URL *' 
                          : 'Target / Preferred Username (Optional)'}
                      </label>
                      <input
                        type="text"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        placeholder={
                          currentService.category === 'promotion'
                            ? 'https://github.com/username/repository'
                            : 'Preferred username or leave blank for auto-generated clean tag'
                        }
                        className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:border-[#24292F]"
                      />
                    </div>

                    {/* Deliverable Format Preference */}
                    <div>
                      <label className="block text-xs font-semibold text-[#24292F] mb-1.5">
                        Deliverable Format Preference
                      </label>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {[
                          { id: 'text', label: 'Plain Text (Login : Pass : Mail)' },
                          { id: 'json', label: 'Structured JSON' },
                          { id: 'csv', label: 'CSV Spreadsheet' }
                        ].map((fmt) => (
                          <button
                            key={fmt.id}
                            type="button"
                            onClick={() => setDeliveryFormat(fmt.id as any)}
                            className={`px-3 py-1.5 rounded-md border transition-colors ${
                              deliveryFormat === fmt.id
                                ? 'bg-[#24292F] text-white border-[#24292F]'
                                : 'bg-white text-[#57606A] border-[#D0D7DE] hover:text-[#24292F]'
                            }`}
                          >
                            {fmt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Order Notes */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-[#24292F] mb-1">
                        Order notes (optional)
                      </label>
                      <textarea
                        rows={3}
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Notes about your order, e.g. special commit preferences, custom country requirements, or proxy notes."
                        className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:border-[#24292F]"
                      ></textarea>
                    </div>

                  </div>
                </div>

                {/* Service Specs & Guarantees callout */}
                <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl p-5 text-xs text-[#57606A] space-y-2">
                  <div className="font-bold text-[#24292F] flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2DA44E]" />
                    <span>Included With Every Order</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[#24292F]">
                    <li>Full ownership &amp; primary email mailbox access credentials</li>
                    <li>48-Hour free replacement warranty on non-infringing delivery issues</li>
                    <li>Direct human dispatch on Telegram &amp; WhatsApp within 15–30 minutes</li>
                  </ul>
                </div>

              </div>

              {/* ---------------------------------------------------------
                  RIGHT COLUMN: YOUR ORDER REVIEW & WOOCOMMERCE GATEWAY
                  --------------------------------------------------------- */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs sticky top-20">
                  <h2 className="text-lg font-bold text-[#24292F] border-b border-[#D0D7DE] pb-3 mb-4 flex items-center justify-between">
                    <span>Your Order</span>
                    <span className="text-xs font-mono text-[#57606A]">{getServiceStockStatus(currentService.id).label}</span>
                  </h2>

                  {/* Product Review Card */}
                  <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-lg p-3.5 mb-4">
                    <div className="flex items-start space-x-3">
                      <ProductVisual serviceId={currentService.id} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="text-xs font-bold text-[#24292F] truncate">
                            {currentService.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setShowServiceSelector(!showServiceSelector)}
                            className="text-[11px] text-[#0969DA] hover:underline shrink-0 font-semibold"
                          >
                            Change
                          </button>
                        </div>
                        <div className="text-[11px] font-mono text-[#57606A] mt-0.5">
                          {getServiceSKU(currentService.id)}
                        </div>

                        {/* Tier Selection */}
                        <div className="mt-2">
                          <select
                            value={selectedTierIndex}
                            onChange={(e) => setSelectedTierIndex(parseInt(e.target.value, 10))}
                            className="w-full bg-white border border-[#D0D7DE] rounded px-2 py-1 text-xs text-[#24292F] font-medium focus:outline-none focus:border-[#24292F]"
                          >
                            {activeTiers.map((tier, idx) => (
                              <option key={idx} value={idx}>
                                {tier.label || tier.quantity} — {tier.price}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="mt-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center border border-[#D0D7DE] rounded bg-white">
                            <button
                              type="button"
                              onClick={() => setQuantityMultiplier(Math.max(1, quantityMultiplier - 1))}
                              className="px-2.5 py-0.5 text-xs text-[#57606A] hover:bg-[#F6F8FA]"
                            >
                              -
                            </button>
                            <span className="px-3 py-0.5 text-xs font-mono font-bold text-[#24292F]">
                              {quantityMultiplier}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantityMultiplier(quantityMultiplier + 1)}
                              className="px-2.5 py-0.5 text-xs text-[#57606A] hover:bg-[#F6F8FA]"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right font-mono font-bold text-[#1A7F37]">
                            ${rawSubtotal.toFixed(2)}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Change Service Dropdown / Catalog Modal */}
                    {showServiceSelector && (
                      <div className="mt-3 pt-3 border-t border-[#D0D7DE] space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-[#57606A]">
                          <span>Select a different service:</span>
                          <div className="flex space-x-1">
                            <button
                              type="button"
                              onClick={() => setCategoryTab('all')}
                              className={`px-1.5 py-0.5 rounded ${categoryTab === 'all' ? 'bg-[#24292F] text-white' : 'bg-white'}`}
                            >
                              All
                            </button>
                            <button
                              type="button"
                              onClick={() => setCategoryTab('accounts')}
                              className={`px-1.5 py-0.5 rounded ${categoryTab === 'accounts' ? 'bg-[#24292F] text-white' : 'bg-white'}`}
                            >
                              Accounts
                            </button>
                            <button
                              type="button"
                              onClick={() => setCategoryTab('promotion')}
                              className={`px-1.5 py-0.5 rounded ${categoryTab === 'promotion' ? 'bg-[#24292F] text-white' : 'bg-white'}`}
                            >
                              Promotion
                            </button>
                          </div>
                        </div>

                        <select
                          value={selectedServiceId}
                          onChange={(e) => {
                            setSelectedServiceId(e.target.value);
                            setSelectedTierIndex(0);
                            setShowServiceSelector(false);
                          }}
                          className="w-full bg-white border border-[#D0D7DE] rounded p-1.5 text-xs text-[#24292F]"
                        >
                          {filteredServicesList.map((s) => (
                            <option key={s.id} value={s.id}>
                              [{s.category === 'accounts' ? 'Account' : 'Promotion'}] {s.name} ({s.basePrice})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* WooCommerce Order Summary Totals */}
                  <div className="space-y-2 text-xs border-b border-[#D0D7DE] pb-4">
                    <div className="flex justify-between text-[#57606A]">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#24292F]">${rawSubtotal.toFixed(2)}</span>
                    </div>

                    {appliedDiscount && (
                      <div className="flex justify-between text-[#1A7F37]">
                        <span>Coupon ({appliedDiscount.code})</span>
                        <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#57606A]">
                      <span>Delivery / Dispatch Fee</span>
                      <span className="font-semibold text-[#1A7F37]">Free (Instant)</span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-[#24292F] pt-2 border-t border-[#D0D7DE]">
                      <span>Total</span>
                      <span className="font-mono text-base text-[#1A7F37]">${finalTotalUsd.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {/* WooCommerce Payment Gateway Accordion */}
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#24292F]">
                        Select Payment Method:
                      </span>
                      <span className="text-[11px] text-[#57606A] font-mono">12 Coins Supported</span>
                    </div>

                    {/* WooCommerce Gateway Radio Box */}
                    <div className="border border-[#24292F] rounded-lg p-3.5 bg-[#F6F8FA]">
                      <div className="flex items-center space-x-2 text-xs font-bold text-[#24292F] mb-2.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#2DA44E] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                        <span>Cryptocurrency Non-Custodial Gateway</span>
                        <span className="text-[10px] bg-[#2DA44E] text-white px-1.5 py-0.2 rounded font-mono ml-auto">
                          0% FEE
                        </span>
                      </div>

                      <p className="text-[11px] text-[#57606A] leading-relaxed mb-3">
                        Instant private settlement. Send exact amount to our multi-chain vault address below:
                      </p>

                      {/* Currency / Wallet Selection Dropdown */}
                      <div className="space-y-2">
                        <label className="block text-[11px] font-semibold text-[#24292F]">
                          Select Cryptocurrency:
                        </label>
                        <select
                          value={selectedWalletId}
                          onChange={(e) => setSelectedWalletId(e.target.value)}
                          className="w-full bg-white border border-[#D0D7DE] rounded-md px-2.5 py-1.5 text-xs text-[#24292F] font-semibold focus:outline-none focus:border-[#24292F]"
                        >
                          {cryptoWallets.map((w) => (
                            <option key={w.id} value={w.id}>
                              {w.name} ({w.network}) — {w.displaySymbol}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Dynamic Crypto Pay Amount & Address Display */}
                      <div className="mt-3 bg-white border border-[#D0D7DE] rounded-lg p-3 space-y-2">
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#57606A]">Amount to send:</span>
                          <span className="font-mono font-bold text-[#1A7F37] text-sm">
                            {cryptoTotal} {selectedWallet.symbol}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-[#D0D7DE]">
                          <span className="text-[11px] text-[#57606A] block mb-1">
                            {selectedWallet.name} ({selectedWallet.network}) Address:
                          </span>
                          <div className="flex items-center space-x-1.5 bg-[#F6F8FA] border border-[#D0D7DE] rounded px-2 py-1.5">
                            <span className="font-mono text-[11px] text-[#24292F] truncate flex-1 select-all">
                              {selectedWallet.address}
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyAddress}
                              className="bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] text-[11px] font-semibold px-2 py-1 rounded text-[#24292F] shrink-0 transition-colors"
                            >
                              {copiedAddress ? (
                                <span className="text-[#2DA44E] font-bold">Copied!</span>
                              ) : (
                                <span>Copy</span>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* TxID Hash input */}
                        <div className="pt-2 border-t border-[#D0D7DE]">
                          <label className="block text-[11px] font-semibold text-[#24292F] mb-1">
                            Transaction Hash (TxID) / Payment Proof:
                          </label>
                          <input
                            type="text"
                            value={txHash}
                            onChange={(e) => setTxHash(e.target.value)}
                            placeholder="Paste tx hash or type 'Will provide via Telegram'"
                            className="w-full bg-white border border-[#D0D7DE] rounded px-2 py-1 text-xs text-[#24292F] font-mono focus:outline-none focus:border-[#24292F]"
                          />
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="mt-4 pt-3 border-t border-[#D0D7DE]">
                    <label className="flex items-start space-x-2 text-xs text-[#57606A] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 rounded border-[#D0D7DE] text-[#2DA44E] focus:ring-0"
                      />
                      <span>
                        I have read and agree to the website <button type="button" onClick={() => navigateTo('/terms')} className="text-[#0969DA] underline">terms and conditions</button> and 48-hour replacement warranty policy <span className="text-[#CF222E]">*</span>
                      </span>
                    </label>
                  </div>

                  {/* WooCommerce Big Place Order Button */}
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#24292F] hover:bg-[#1B1F23] text-white font-bold py-3.5 px-4 rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all disabled:opacity-75 cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-[#2DA44E]" />
                      <span className="text-sm">
                        {isSubmitting ? 'Processing Order...' : `Place Order ($${finalTotalUsd.toFixed(2)} USD)`}
                      </span>
                    </button>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-4 flex items-center justify-center space-x-4 text-[11px] text-[#57606A] border-t border-[#D0D7DE] pt-3">
                    <span className="flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2DA44E] mr-1" />
                      256-Bit SSL
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 text-[#0969DA] mr-1" />
                      15–30m Handover
                    </span>
                  </div>

                </div>

              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
