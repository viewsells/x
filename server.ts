import express, { Request, Response } from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gmail SMTP configuration
const GMAIL_USER = process.env.GMAIL_USER || 'smmbuy2022@gmail.com';
const GMAIL_PASS = (process.env.GMAIL_APP_PASSWORD || 'cozi ibbt kzwp xato').replace(/\s+/g, '');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// API Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'BuyGitHubAccounts.com Order & Notification Server',
    mailUserConfigured: !!GMAIL_USER,
  });
});

// POST /api/order - Processes orders and sends notification & confirmation emails
app.post('/api/order', async (req: Request, res: Response) => {
  try {
    const {
      orderId,
      orderDate,
      customerName,
      billingEmail,
      country,
      contactChannel,
      contactHandle,
      targetUrl,
      deliveryFormat,
      orderNotes,
      serviceName,
      tierLabel,
      quantity,
      subtotal,
      discountCode,
      discountAmount,
      totalUsd,
      paymentMethod,
      cryptoAmount,
      cryptoSymbol,
      depositWalletAddress,
      txHash,
    } = req.body;

    const formattedDate = orderDate || new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

    // 1. Send Admin Notification Email to smmbuy2022@gmail.com
    const adminMailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d0d7de; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #24292f; color: #ffffff; padding: 20px 24px;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #2da44e;">🔔 New Order Received: #${orderId}</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #8b949e;">BuyGitHubAccounts.com Order Management Desk</p>
        </div>

        <div style="padding: 24px;">
          <div style="background-color: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; color: #57606a; width: 140px;"><strong>Order ID:</strong></td>
                <td style="padding: 6px 0; font-weight: 700; color: #24292f; font-family: monospace;">#${orderId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #57606a;"><strong>Order Date:</strong></td>
                <td style="padding: 6px 0; color: #24292f;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #57606a;"><strong>Total Amount:</strong></td>
                <td style="padding: 6px 0; font-weight: 700; color: #1a7f37; font-size: 15px;">$${Number(totalUsd || subtotal).toFixed(2)} USD (${cryptoAmount || '—'} ${cryptoSymbol || ''})</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #57606a;"><strong>Payment Method:</strong></td>
                <td style="padding: 6px 0; color: #24292f;">${paymentMethod || 'Crypto'}</td>
              </tr>
            </table>
          </div>

          <h3 style="font-size: 15px; border-bottom: 1px solid #d0d7de; padding-bottom: 8px; color: #24292f; margin-top: 0;">Ordered Service</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #57606a; width: 140px;"><strong>Service:</strong></td>
              <td style="padding: 8px 0; font-weight: 600; color: #0969da;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #57606a;"><strong>Tier / Package:</strong></td>
              <td style="padding: 8px 0; color: #24292f;">${tierLabel || 'Standard'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #57606a;"><strong>Quantity:</strong></td>
              <td style="padding: 8px 0; color: #24292f;">${quantity || 1}</td>
            </tr>
            ${discountCode ? `
            <tr>
              <td style="padding: 8px 0; color: #57606a;"><strong>Coupon:</strong></td>
              <td style="padding: 8px 0; color: #1a7f37;">${discountCode} (-$${Number(discountAmount || 0).toFixed(2)})</td>
            </tr>
            ` : ''}
          </table>

          <h3 style="font-size: 15px; border-bottom: 1px solid #d0d7de; padding-bottom: 8px; color: #24292f;">Customer & Delivery Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; color: #57606a; width: 140px;"><strong>Customer Name:</strong></td>
              <td style="padding: 6px 0; color: #24292f;">${customerName || 'Guest'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #57606a;"><strong>Customer Email:</strong></td>
              <td style="padding: 6px 0; color: #0969da;"><a href="mailto:${billingEmail}">${billingEmail || 'Not provided'}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #57606a;"><strong>Country/Region:</strong></td>
              <td style="padding: 6px 0; color: #24292f;">${country || 'International'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #57606a;"><strong>Handover Channel:</strong></td>
              <td style="padding: 6px 0; color: #24292f; font-weight: 600;">${String(contactChannel || 'Telegram').toUpperCase()}: ${contactHandle || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #57606a;"><strong>Target URL / Repo:</strong></td>
              <td style="padding: 6px 0; color: #24292f;">${targetUrl || 'Account Credentials'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #57606a;"><strong>Format:</strong></td>
              <td style="padding: 6px 0; color: #24292f;">${String(deliveryFormat || 'Plain Text').toUpperCase()}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #57606a;"><strong>Order Notes:</strong></td>
              <td style="padding: 6px 0; color: #24292f;">${orderNotes || 'None'}</td>
            </tr>
          </table>

          <h3 style="font-size: 15px; border-bottom: 1px solid #d0d7de; padding-bottom: 8px; color: #24292f;">Payment & Transaction</h3>
          <div style="background-color: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; padding: 14px; font-size: 12px; font-family: monospace;">
            <p style="margin: 0 0 6px 0;"><strong>Deposit Address:</strong> ${depositWalletAddress || 'N/A'}</p>
            <p style="margin: 0 0 6px 0;"><strong>Expected Transfer:</strong> ${cryptoAmount || ''} ${cryptoSymbol || ''} ($${Number(totalUsd || subtotal).toFixed(2)} USD)</p>
            <p style="margin: 0;"><strong>TxID / Hash:</strong> ${txHash || 'Awaiting customer dispatch confirmation'}</p>
          </div>
        </div>

        <div style="background-color: #f6f8fa; border-top: 1px solid #d0d7de; padding: 16px 24px; font-size: 12px; color: #57606a; text-align: center;">
          BuyGitHubAccounts.com • Automated Order Notification System
        </div>
      </div>
    `;

    // Dispatch admin notification
    await transporter.sendMail({
      from: `"BuyGitHubAccounts System" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: `🔔 [NEW ORDER #${orderId}] ${serviceName} - $${Number(totalUsd || subtotal).toFixed(2)} USD`,
      html: adminMailHtml,
    });

    // 2. If customer email provided, send Customer Confirmation Email
    if (billingEmail && billingEmail.includes('@')) {
      const customerMailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d0d7de; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #24292f; color: #ffffff; padding: 24px; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #ffffff;">Thank You For Your Order!</h1>
            <p style="margin: 0; font-size: 14px; color: #8b949e;">Order Reference: <strong>#${orderId}</strong></p>
          </div>

          <div style="padding: 24px;">
            <p style="font-size: 14px; color: #24292f; margin-top: 0;">
              Hello ${customerName || 'Valued Developer'},
            </p>
            <p style="font-size: 14px; color: #57606a; line-height: 1.6;">
              We have successfully received your order on <strong>BuyGitHubAccounts.com</strong>. Our technical dispatch team has been notified and is preparing your deliverable.
            </p>

            <div style="background-color: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; padding: 16px; margin: 20px 0;">
              <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #24292f; text-transform: uppercase; letter-spacing: 0.5px;">Order Summary</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 6px 0; color: #57606a;"><strong>Item:</strong></td>
                  <td style="padding: 6px 0; font-weight: 600; color: #24292f;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #57606a;"><strong>Tier / Qty:</strong></td>
                  <td style="padding: 6px 0; color: #24292f;">${tierLabel || 'Standard'} (Qty: ${quantity || 1})</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #57606a;"><strong>Total:</strong></td>
                  <td style="padding: 6px 0; font-weight: 700; color: #1a7f37; font-size: 15px;">$${Number(totalUsd || subtotal).toFixed(2)} USD</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #57606a;"><strong>Payment Method:</strong></td>
                  <td style="padding: 6px 0; color: #24292f;">${paymentMethod || 'Crypto'} (${cryptoAmount || ''} ${cryptoSymbol || ''})</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #57606a;"><strong>Delivery Channel:</strong></td>
                  <td style="padding: 6px 0; color: #24292f;">${String(contactChannel || 'Telegram').toUpperCase()} (${contactHandle || 'Provided on checkout'})</td>
                </tr>
              </table>
            </div>

            ${depositWalletAddress ? `
            <div style="background-color: #e1f0da; border: 1px solid #2da44e; border-radius: 6px; padding: 14px; margin-bottom: 20px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #1a7f37; text-transform: uppercase;">Official Deposit Wallet (${cryptoSymbol || 'USDT'}):</p>
              <code style="font-family: monospace; font-size: 12px; color: #24292f; word-break: break-all; display: block; background: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #d0d7de;">${depositWalletAddress}</code>
            </div>
            ` : ''}

            <div style="background-color: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
              <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #24292f;">⚡ Need Instant Dispatch or Have Questions?</h4>
              <p style="font-size: 12px; color: #57606a; margin: 0 0 12px 0;">
                Connect directly with our 24/7 technical operators with your Order ID (<strong>#${orderId}</strong>):
              </p>
              <div style="display: flex; gap: 10px;">
                <a href="https://t.me/EgSupport24" style="background-color: #24292f; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 600; padding: 8px 16px; border-radius: 4px; display: inline-block;">Telegram: @EgSupport24</a>
                <a href="https://wa.me/13073939979" style="background-color: #2da44e; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 600; padding: 8px 16px; border-radius: 4px; display: inline-block; margin-left: 8px;">WhatsApp: +1 307 393 9979</a>
              </div>
            </div>

            <p style="font-size: 12px; color: #57606a; line-height: 1.5; border-top: 1px solid #d0d7de; padding-top: 16px;">
              🛡️ <strong>48-Hour Replacement Guarantee:</strong> Every delivery includes full primary mailbox credentials and 48-hour warranty support against non-infringing delivery defects.
            </p>
          </div>

          <div style="background-color: #f6f8fa; border-top: 1px solid #d0d7de; padding: 16px 24px; font-size: 11px; color: #8c959f; text-align: center;">
            © ${new Date().getFullYear()} BuyGitHubAccounts.com. All rights reserved. • High-Trust Developer Solutions
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"BuyGitHubAccounts.com Order Desk" <${GMAIL_USER}>`,
        to: billingEmail,
        subject: `Order Confirmation #${orderId} - BuyGitHubAccounts.com`,
        html: customerMailHtml,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order recorded and emails dispatched successfully',
      orderId,
    });
  } catch (error: any) {
    console.error('Error processing order email:', error);
    return res.status(500).json({
      error: 'Failed to dispatch email notifications',
      details: error?.message || error,
    });
  }
});

// POST /api/contact - Inquiries notification endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, contactHandle, channel, service, message } = req.body;

    const contactMailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d0d7de; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #24292f; color: #ffffff; padding: 18px 24px;">
          <h2 style="margin: 0; font-size: 18px; font-weight: 700; color: #58a6ff;">📬 New Website Inquiry / Contact Message</h2>
        </div>
        <div style="padding: 20px;">
          <p><strong>Name:</strong> ${name || 'N/A'}</p>
          <p><strong>Contact Handle:</strong> ${contactHandle || 'N/A'}</p>
          <p><strong>Preferred Channel:</strong> ${channel || 'Telegram'}</p>
          <p><strong>Service:</strong> ${service || 'General'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f6f8fa; border: 1px solid #d0d7de; padding: 12px; border-radius: 6px; white-space: pre-wrap; font-size: 13px;">
            ${message || 'No message text provided'}
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"BuyGitHubAccounts Contact Desk" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: `📬 New Contact Inquiry from ${name || 'User'} (${service})`,
      html: contactMailHtml,
    });

    return res.status(200).json({
      success: true,
      message: 'Inquiry email sent successfully',
    });
  } catch (error: any) {
    console.error('Error sending contact email:', error);
    return res.status(500).json({
      error: 'Failed to send contact inquiry email',
      details: error?.message || error,
    });
  }
});

// Vite Middleware for SPA / Static Serving
async function setupViteAndStartServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

setupViteAndStartServer();
