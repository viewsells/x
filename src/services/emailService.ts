export interface OrderEmailPayload {
  orderId: string;
  orderDate: string;
  customerName: string;
  billingEmail: string;
  country: string;
  contactChannel: string;
  contactHandle: string;
  targetUrl?: string;
  deliveryFormat: string;
  orderNotes?: string;
  serviceName: string;
  serviceId: string;
  tierLabel: string;
  quantity: number;
  subtotal: number;
  discountCode?: string;
  discountAmount?: number;
  totalUsd: number;
  paymentMethod: string;
  cryptoAmount: string;
  cryptoSymbol: string;
  depositWalletAddress: string;
  txHash?: string;
}

export interface ContactEmailPayload {
  name: string;
  contactHandle: string;
  channel: string;
  service: string;
  message: string;
}

const ADMIN_EMAIL = 'smmbuy2022@gmail.com';

/**
 * Saves order to local browser storage as a permanent client-side receipt backup
 */
function backupOrderLocally(payload: OrderEmailPayload) {
  try {
    const existing = JSON.parse(localStorage.getItem('bga_saved_orders') || '[]');
    existing.unshift({
      ...payload,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('bga_saved_orders', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Sends order notification to admin (smmbuy2022@gmail.com)
 * and confirmation email to the customer.
 * Uses a resilient multi-tier dispatch strategy:
 * 1. Primary: Server-side Node / Express API (/api/order)
 * 2. Static Site Fallback: Direct FormSubmit.co API to smmbuy2022@gmail.com (works on GitHub Pages)
 */
export async function sendOrderNotification(payload: OrderEmailPayload): Promise<{ success: boolean; message?: string }> {
  backupOrderLocally(payload);

  let serverSuccess = false;

  // 1. Try local/production Node API first
  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      serverSuccess = true;
      console.log('Order dispatched via server API:', data);
    }
  } catch (err) {
    console.log('Server /api/order endpoint not available (static host), falling back to static dispatch:', err);
  }

  // 2. If server API didn't succeed (e.g. on GitHub Pages static hosting), use FormSubmit direct email API
  if (!serverSuccess) {
    try {
      const formPayload: Record<string, string | number> = {
        _subject: `🔥 New Order [${payload.orderId}] - $${payload.totalUsd} (${payload.serviceName})`,
        _replyto: payload.billingEmail || ADMIN_EMAIL,
        _template: 'table',
        _captcha: 'false',
        'Order ID': payload.orderId,
        'Order Date': payload.orderDate,
        'Customer Name': payload.customerName,
        'Billing Email': payload.billingEmail || 'N/A',
        'Contact Channel': `${payload.contactChannel.toUpperCase()}: ${payload.contactHandle}`,
        'Country': payload.country,
        'Service Ordered': `${payload.serviceName} (${payload.tierLabel})`,
        'Quantity': payload.quantity,
        'Total USD': `$${payload.totalUsd}`,
        'Payment Method': `${payload.paymentMethod} (${payload.cryptoAmount} ${payload.cryptoSymbol})`,
        'Deposit Address': payload.depositWalletAddress,
        'Transaction Hash (TxID)': payload.txHash || 'Pending verification / Direct handover',
        'Delivery Target / URL': payload.targetUrl || 'Provided via chat',
        'Delivery Format': payload.deliveryFormat,
        'Order Notes': payload.orderNotes || 'None'
      };

      if (payload.billingEmail && payload.billingEmail.includes('@')) {
        formPayload._autoresponse = `Thank you for your order (${payload.orderId}) on BuyGitHubAccounts.com!\n\nWe have received your order for: ${payload.serviceName} (${payload.tierLabel}) totaling $${payload.totalUsd}.\n\nPayment Method: ${payload.paymentMethod}\nAmount: ${payload.cryptoAmount} ${payload.cryptoSymbol}\nDeposit Address: ${payload.depositWalletAddress}\n\nOur team will verify your transaction and deliver credentials within 30–180 minutes. For instant delivery support, connect with us:\nTelegram: https://t.me/EgSupport24\nWhatsApp: https://wa.me/13073939979`;
      }

      await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });
      console.log('Order notification dispatched via FormSubmit directly to', ADMIN_EMAIL);
    } catch (fallbackErr) {
      console.warn('FormSubmit fallback dispatch notice:', fallbackErr);
    }
  }

  return { success: true, message: 'Order submitted successfully' };
}

/**
 * Sends contact inquiry notification to admin (smmbuy2022@gmail.com)
 */
export async function sendContactInquiry(payload: ContactEmailPayload): Promise<{ success: boolean; message?: string }> {
  let serverSuccess = false;

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      serverSuccess = true;
    }
  } catch (err) {
    console.log('Server /api/contact not available, using static fallback:', err);
  }

  if (!serverSuccess) {
    try {
      const formPayload = {
        _subject: `💬 New Customer Inquiry from ${payload.name} (${payload.channel})`,
        _replyto: payload.contactHandle.includes('@') ? payload.contactHandle : ADMIN_EMAIL,
        _template: 'table',
        _captcha: 'false',
        'Customer Name': payload.name,
        'Preferred Channel': payload.channel.toUpperCase(),
        'Contact Handle / Email': payload.contactHandle,
        'Service of Interest': payload.service,
        'Inquiry Message': payload.message
      };

      await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });
    } catch (fallbackErr) {
      console.warn('Contact fallback dispatch notice:', fallbackErr);
    }
  }

  return { success: true, message: 'Inquiry submitted' };
}
