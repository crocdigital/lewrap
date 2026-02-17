export const prerender = false;
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();

    // Extract form data
    const firstName = formData.first_name as string;
    const lastName = formData.last_name as string;
    const phone = formData.phone as string;
    const email = formData.email as string;
    const location = formData.location as string;
    const timeline = formData.timeline as string;
    const fundCapacity = formData.fund_capacity as string;

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: import.meta.env.EMAIL_HOST,
      port: parseInt(import.meta.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS,
      },
    });

    // Internal email HTML
    const internalEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #2D5016;
            color: white;
            padding: 30px 20px 20px 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .header img {
            max-width: 200px;
            height: auto;
            margin-bottom: 15px;
          }
          .content {
            background-color: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }
          .section {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
          }
          .section:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #2D5016;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: 600;
            color: #2D5016;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            color: #333;
            font-size: 16px;
            padding: 10px;
            background-color: white;
            border-left: 3px solid #2D5016;
            margin-top: 5px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="https://lewrap.com/lewrap-logo-email.png" alt="LeWrap Logo" />
          <h1 style="margin: 0; font-size: 24px;">New Franchise Enquiry</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">LeWrap Website</p>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">📋 Personal Information</div>
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #2D5016; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value"><a href="tel:${phone}" style="color: #2D5016; text-decoration: none;">${phone}</a></div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">📍 Location & Timeline</div>
            <div class="field">
              <div class="label">Location of Interest</div>
              <div class="value">${location}</div>
            </div>
            <div class="field">
              <div class="label">Investment Timeline</div>
              <div class="value">${timeline}</div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">💰 Investment Capacity</div>
            <div class="field">
              <div class="label">Fund Capacity</div>
              <div class="value">${fundCapacity}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>This enquiry was submitted via the LeWrap website at ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
        </div>
      </body>
      </html>
    `;

    // Customer confirmation email HTML
    const customerEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #2D5016;
            color: white;
            padding: 30px 20px 20px 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .header img {
            max-width: 200px;
            height: auto;
            margin-bottom: 15px;
          }
          .content {
            background-color: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }
          .message-box {
            background-color: #e8f5e9;
            border-left: 4px solid #2D5016;
            padding: 20px;
            margin-bottom: 25px;
            border-radius: 4px;
          }
          .download-button {
            display: inline-block;
            background-color: #2D5016;
            color: white !important;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #2D5016;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field {
            margin-bottom: 10px;
          }
          .label {
            font-weight: 600;
            color: #666;
            font-size: 13px;
          }
          .value {
            color: #333;
            font-size: 15px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="https://lewrap.com/lewrap-logo-email.png" alt="LeWrap Logo" />
          <h1 style="margin: 0; font-size: 24px;">Thank You for Your Interest!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">LeWrap Franchise Opportunities</p>
        </div>
        <div class="content">
          <div class="message-box">
            <h2 style="margin-top: 0; color: #2D5016;">We've received your enquiry</h2>
            <p style="margin: 10px 0 0;">Thank you for your interest in becoming a LeWrap franchisee! Our team will review your information and be in touch within 2-3 business days to discuss the next steps.</p>
            <p style="margin: 15px 0 0;">If you have any immediate questions, or keen to chat now, please don't hesitate to contact us at <a href="mailto:franchising@lewrap.com" style="color: #2D5016; text-decoration: none; font-weight: 600;">franchising@lewrap.com</a> or call <a href="tel:+61451732267" style="color: #2D5016; text-decoration: none; font-weight: 600;">+61 451 732 267</a>.</p>
            <p style="margin: 15px 0 0; font-weight: 600; color: #2D5016;">We'd love to hear from you!</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 16px; margin-bottom: 15px;"><strong>Download Your Franchise Information Pack</strong></p>
            <a href="https://lewrap.com/downloads/LW-Franchising-Pack.pdf" class="download-button">📄 Download Info Pack</a>
            <p style="font-size: 13px; color: #666; margin-top: 10px;">This comprehensive guide contains everything you need to know about our franchise opportunity.</p>
          </div>

          <div class="section">
            <div class="section-title">Your Enquiry Details</div>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${phone}</div>
            </div>
            <div class="field">
              <div class="label">Location of Interest:</div>
              <div class="value">${location}</div>
            </div>
            <div class="field">
              <div class="label">Investment Timeline:</div>
              <div class="value">${timeline}</div>
            </div>
            <div class="field">
              <div class="label">Fund Capacity:</div>
              <div class="value">${fundCapacity}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} LeWrap. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    // Send internal email to franchise team
    await transporter.sendMail({
      from: import.meta.env.EMAIL_FROM,
      to: import.meta.env.EMAIL_FRANCHISE,
      replyTo: email,
      subject: 'Franchise Enquiry from LeWrap Website',
      html: internalEmailHTML,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: import.meta.env.EMAIL_FROM,
      to: email,
      subject: 'Thank You for Your LeWrap Franchise Enquiry',
      html: customerEmailHTML,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your enquiry! We'll be in touch within 2-3 business days."
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Franchise enquiry error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Something went wrong. Please try again or contact us directly at info@lewrap.com'
      }),
      { status: 500 }
    );
  }
};
