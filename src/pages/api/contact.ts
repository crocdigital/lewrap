import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.json();

        // 1. Validate reCAPTCHA
        const recaptchaResponse = formData['g-recaptcha-response'];

        if (!recaptchaResponse) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Please complete the reCAPTCHA verification'
                }),
                { status: 400 }
            );
        }

        // Verify reCAPTCHA with Google
        const recaptchaVerify = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${import.meta.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`
            }
        );

        const recaptchaResult = await recaptchaVerify.json();

        if (!recaptchaResult.success) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'reCAPTCHA verification failed. Please try again.'
                }),
                { status: 400 }
            );
        }

        // 2. Create email transporter
        const transporter = nodemailer.createTransport({
            host: import.meta.env.EMAIL_HOST,
            port: parseInt(import.meta.env.EMAIL_PORT),
            secure: true, // SSL
            auth: {
                user: import.meta.env.EMAIL_USER,
                pass: import.meta.env.EMAIL_PASS,
            },
        });

        // 3. Prepare email content
        const emailHTML = `
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
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            background-color: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }
          .field {
            margin-bottom: 20px;
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
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">LeWrap Website</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${formData.name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${formData.email}" style="color: #2D5016; text-decoration: none;">${formData.email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Phone</div>
            <div class="value"><a href="tel:${formData.phone}" style="color: #2D5016; text-decoration: none;">${formData.phone}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Enquiry Type</div>
            <div class="value">${formData.enquiry_type}</div>
          </div>
          
          <div class="field">
            <div class="label">Message</div>
            <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the LeWrap contact form at ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
        </div>
      </body>
      </html>
    `;

        const emailText = `
New Contact Form Submission - LeWrap Website

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Enquiry Type: ${formData.enquiry_type}

Message:
${formData.message}

---
Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
    `;

        // 4. Send email to both recipients
        await transporter.sendMail({
            from: import.meta.env.EMAIL_FROM,
            to: `${import.meta.env.EMAIL_TO_1}, ${import.meta.env.EMAIL_TO_2}`,
            replyTo: formData.email, // Allows easy replies to the customer
            subject: 'Contact Form Submission from LeWrap Website',
            text: emailText,
            html: emailHTML,
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Thank you for your message! We\'ll be in touch soon.'
            }),
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Something went wrong. Please try again or contact us directly.'
            }),
            { status: 500 }
        );
    }
};