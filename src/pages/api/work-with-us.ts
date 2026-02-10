export const prerender = false;

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse multipart form data (for file uploads)
    const formData = await request.formData();

    // 1. Validate reCAPTCHA
    const recaptchaResponse = formData.get('g-recaptcha-response') as string;

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

    // 2. Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const locationPreference = formData.get('location_preference') as string;
    const preferredStore = formData.get('preferred_store') as string;
    const message = formData.get('message') as string || 'No additional information provided';
    const resumeFile = formData.get('resume') as File;

    // 3. Validate file upload
    if (!resumeFile || resumeFile.size === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please upload your resume'
        }),
        { status: 400 }
      );
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (resumeFile.size > maxSize) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'File size must be less than 10MB'
        }),
        { status: 400 }
      );
    }

    // Convert file to buffer for attachment
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const fileSizeKB = (resumeFile.size / 1024).toFixed(2);

    // 4. Determine recipients
    let recipients = `${import.meta.env.EMAIL_TO_1}, ${import.meta.env.EMAIL_TO_2}`;
    let applyingTo = 'LeWrap Head Office';

    if (locationPreference === 'store' && preferredStore) {
      // Add store email to recipients
      recipients += `, ${preferredStore}`;
      applyingTo = preferredStore;
    }

    // 5. Create email transporter
    const transporter = nodemailer.createTransport({
      host: import.meta.env.EMAIL_HOST,
      port: parseInt(import.meta.env.EMAIL_PORT),
      secure: true, // SSL
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS,
      },
    });

    // 6. Prepare email content
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
          .file-info {
            background-color: #e8f5e9;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #2D5016;
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
          <h1 style="margin: 0; font-size: 24px;">New Job Application</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">LeWrap Website</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Applicant Name</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${email}" style="color: #2D5016; text-decoration: none;">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Phone</div>
            <div class="value"><a href="tel:${phone}" style="color: #2D5016; text-decoration: none;">${phone}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Position Interested In</div>
            <div class="value">${position}</div>
          </div>
          
          <div class="field">
            <div class="label">Applying To</div>
            <div class="value">${applyingTo}</div>
          </div>
          
          <div class="field">
            <div class="label">Resume</div>
            <div class="file-info">
              <strong>📎 ${resumeFile.name}</strong><br>
              <span style="color: #666; font-size: 14px;">File size: ${fileSizeKB} KB</span>
            </div>
          </div>
          
          <div class="field">
            <div class="label">Additional Information</div>
            <div class="value">${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>This application was submitted via the LeWrap website at ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
        </div>
      </body>
      </html>
    `;

    const emailText = `
New Job Application - LeWrap Website

Applicant Name: ${name}
Email: ${email}
Phone: ${phone}
Position Interested In: ${position}
Applying To: ${applyingTo}

Resume: ${resumeFile.name} (${fileSizeKB} KB)

Additional Information:
${message}

---
Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
    `;

    // 7. Send email with attachment
    await transporter.sendMail({
      from: import.meta.env.EMAIL_FROM,
      to: recipients,
      replyTo: email, // Allows easy replies to the applicant
      subject: 'Job Application from LeWrap Website',
      text: emailText,
      html: emailHTML,
      attachments: [
        {
          filename: resumeFile.name,
          content: resumeBuffer,
          contentType: resumeFile.type,
        }
      ]
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your application! We\'ll review your resume and be in touch soon.'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Work with us form error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Something went wrong. Please try again or email us directly at info@lewrap.com'
      }),
      { status: 500 }
    );
  }
};