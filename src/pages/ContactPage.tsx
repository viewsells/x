import { useState, type FormEvent } from 'react';
import { Send, MessageSquare, Mail, Clock, ShieldCheck, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CryptoPaymentSection } from '../components/CryptoPaymentSection';
import { allServices } from '../data/allServices';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactHandle: '',
    channel: 'telegram',
    service: 'buy-new-github-accounts',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const directTelegramMsg = encodeURIComponent(
    `Hello BuyGitHubAccounts team, I am contacting you from the website regarding: ${formData.service}. Contact: ${formData.contactHandle}. Details: ${formData.message}`
  );

  return (
    <div className="bg-[#FFFFFF]">
      <SEOHead
        title="Contact Customer Support | Telegram & WhatsApp | BuyGitHubAccounts.com"
        description="Contact our technical and sales support directly via Telegram (@EgSupport24) or WhatsApp (+1 307 393 9979). Active 7 days a week for immediate crypto payment instructions and account fulfillment."
        canonicalPath="/contact"
      />

      {/* Breadcrumbs */}
      <div className="bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Contact Support' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#D0D7DE] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#F6F8FA] border border-[#D0D7DE] px-3 py-1 rounded-full text-xs font-semibold text-[#24292F] mb-4">
              <Send className="w-3.5 h-3.5 text-[#58A6FF]" />
              <span>Direct Support &amp; Order Handover</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24292F] tracking-tight">
              Contact Our Team
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#57606A] leading-relaxed">
              Have questions about an account type, bulk custom volume, or repository promotion pacing? Connect directly with our operators via Telegram or WhatsApp for fastest response.
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Contact Grid */}
      <section className="py-14 bg-[#F6F8FA] border-b border-[#D0D7DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Direct Channels Info */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Telegram Card */}
              <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs hover:border-[#24292F] transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#58A6FF]/10 text-[#0969DA] flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#24292F]">Telegram Support</h2>
                    <span className="text-xs text-[#57606A]">Fastest Response Channel</span>
                  </div>
                </div>
                <p className="text-xs text-[#57606A] leading-relaxed">
                  Message our team directly on Telegram for real-time consultation, crypto payment addresses, and immediate credential dispatch.
                </p>
                <div className="mt-4 pt-4 border-t border-[#D0D7DE] flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#0969DA]">@EgSupport24</span>
                  <a
                    href="https://t.me/EgSupport24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                  >
                    Open Telegram &rarr;
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white border border-[#D0D7DE] rounded-xl p-6 shadow-xs hover:border-[#24292F] transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2DA44E]/10 text-[#1A7F37] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#24292F]">WhatsApp Support</h2>
                    <span className="text-xs text-[#57606A]">Direct Messaging &amp; Orders</span>
                  </div>
                </div>
                <p className="text-xs text-[#57606A] leading-relaxed">
                  Connect via WhatsApp for order status updates, invoice requests, and questions regarding custom order packages.
                </p>
                <div className="mt-4 pt-4 border-t border-[#D0D7DE] flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1A7F37]">+1 (307) 393-9979</span>
                  <a
                    href="https://wa.me/13073939979"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                  >
                    Open WhatsApp &rarr;
                  </a>
                </div>
              </div>

              {/* Hours & Response Box */}
              <div className="bg-white border border-[#D0D7DE] rounded-xl p-5 text-xs text-[#57606A] space-y-2.5">
                <div className="flex items-center text-[#24292F] font-semibold">
                  <Clock className="w-4 h-4 mr-2 text-[#57606A]" />
                  Operational Hours &amp; Response Times
                </div>
                <p>
                  <strong>Active Schedule:</strong> Monday – Sunday, 08:00 – 23:00 UTC
                </p>
                <p>
                  <strong>Typical Response Time:</strong> Within 10 to 30 minutes during active hours.
                </p>
                <p className="text-[11px] text-[#8C959F] pt-1">
                  Inquiries received outside standard operating hours are handled at the start of the next shift.
                </p>
              </div>

            </div>

            {/* Right Column: Web Inquiry Form */}
            <div className="lg:col-span-7 bg-white border border-[#D0D7DE] rounded-xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-[#24292F] mb-1">
                Send an Online Inquiry
              </h2>
              <p className="text-xs text-[#57606A] mb-6">
                Fill out your details and our team will get back to you via your preferred messaging handle.
              </p>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-[#F6F8FA] rounded-xl border border-[#D0D7DE]">
                  <div className="w-12 h-12 bg-[#E1F0DA] text-[#1A7F37] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#24292F]">Inquiry Prepared!</h3>
                  <p className="text-xs sm:text-sm text-[#57606A] max-w-md mx-auto">
                    Thank you, <strong>{formData.name || 'Developer'}</strong>. To speed up fulfillment, click below to open your pre-formatted order directly on Telegram or WhatsApp.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-3 justify-center">
                    <a
                      href={`https://t.me/EgSupport24?text=${directTelegramMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#24292F] hover:bg-[#1B1F23] text-white text-xs font-semibold py-2.5 px-4 rounded-md flex items-center justify-center"
                    >
                      <Send className="w-3.5 h-3.5 text-[#58A6FF] mr-2" />
                      Forward to Telegram (@EgSupport24)
                    </a>
                    <a
                      href={`https://wa.me/13073939979?text=${directTelegramMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-semibold py-2.5 px-4 rounded-md flex items-center justify-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-2" />
                      Forward to WhatsApp
                    </a>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs text-[#57606A] hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#24292F] mb-1">
                        Your Name / Organization:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe / Acme Labs"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:ring-2 focus:ring-[#2DA44E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#24292F] mb-1">
                        Your Telegram Handle / WhatsApp / Email:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="@username or +1..."
                        value={formData.contactHandle}
                        onChange={(e) => setFormData({ ...formData, contactHandle: e.target.value })}
                        className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:ring-2 focus:ring-[#2DA44E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#24292F] mb-1">
                        Service of Interest:
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:ring-2 focus:ring-[#2DA44E]"
                      >
                        <optgroup label="Account Services">
                          {allServices.filter(s => s.category === 'accounts').map(s => (
                            <option key={s.id} value={s.name}>
                              {s.name} ({s.basePrice})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Promotion Services">
                          {allServices.filter(s => s.category === 'promotion').map(s => (
                            <option key={s.id} value={s.name}>
                              {s.name} ({s.basePrice})
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#24292F] mb-1">
                        Preferred Response Channel:
                      </label>
                      <select
                        value={formData.channel}
                        onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                        className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:ring-2 focus:ring-[#2DA44E]"
                      >
                        <option value="telegram">Telegram (@EgSupport24)</option>
                        <option value="whatsapp">WhatsApp (+1 307 393 9979)</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24292F] mb-1">
                      Message / Order Details / Target Repo Link:
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Specify your requirements (e.g. quantity, year of tenure, target public repo URL, or preferred cryptocurrency)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-[#D0D7DE] rounded-md px-3 py-2 text-xs text-[#24292F] focus:outline-none focus:ring-2 focus:ring-[#2DA44E]"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#2DA44E] hover:bg-[#2C974B] text-white text-xs font-bold py-3 rounded-md transition-colors shadow-xs"
                    >
                      Generate &amp; Submit Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Crypto Payment Section */}
      <CryptoPaymentSection />

    </div>
  );
};
