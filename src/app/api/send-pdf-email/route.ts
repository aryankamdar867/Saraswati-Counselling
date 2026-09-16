import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentName,
      studentEmail,
      studentPhone,
      exam,
      percentile,
      counsellorName,
      counsellorRemarks,
      pdfBase64
    } = body;

    if (!studentEmail || !studentName) {
      return NextResponse.json(
        { success: false, error: 'Student email and name are required' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || 'khotarearyan@gmail.com';
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASSWORD;

    // Email HTML Template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #701a2b 0%, #4a0414 100%); padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; font-weight: bold; color: #ffd700; letter-spacing: 1px;">SARASWATI CAREER COUNSELLING CENTRE</h1>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #f3e5ab; text-transform: uppercase; letter-spacing: 2px;">Right Guidance • Brighter Tomorrow</p>
          <p style="margin: 8px 0 0 0; font-size: 11px; color: #ffffff;">Helpline: +91 7387773164 | khotarearyan@gmail.com</p>
        </div>

        <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
          <p style="font-size: 15px; margin-top: 0;">Dear <strong>${studentName}</strong>,</p>
          
          <p style="font-size: 13px; color: #334155;">
            Thank you for requesting an admission strategy session with <strong>Saraswati Career Counselling Centre</strong>. Our senior counsellor, <strong>${counsellorName || 'Aryan Khotare'}</strong>, has processed your score profile and attached your official <strong>3-Tier College Prediction Report (PDF)</strong>.
          </p>

          <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 13px; color: #701a2b; text-transform: uppercase;">Scorecard & Exam Summary</h3>
            <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; color: #64748b;">Target Exam:</td>
                <td style="padding: 4px 0; font-weight: bold; color: #0f172a;">${exam}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748b;">Candidate Score:</td>
                <td style="padding: 4px 0; font-weight: bold; color: #701a2b; font-size: 14px;">${percentile} %ile</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748b;">Counsellor Guidance:</td>
                <td style="padding: 4px 0; color: #334155; font-style: italic;">${counsellorRemarks || 'Please review the attached PDF for priority option form choices.'}</td>
              </tr>
            </table>
          </div>

          <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1px solid #f59e0b; border-radius: 12px; padding: 18px; text-align: center; margin: 24px 0;">
            <h3 style="margin: 0 0 6px 0; font-size: 15px; color: #92400e;">Ready for End-to-End Admission Mentorship?</h3>
            <p style="margin: 0 0 14px 0; font-size: 12px; color: #78350f;">
              Enrol in our complete CAP Counselling package for <strong>₹6,000</strong> to get 1-on-1 strategy sessions, Option Form locking for all rounds, and spot round tracking.
            </p>
            <a href="http://localhost:3000/student" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 10px 24px; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 8px;">
              Enrol & Pay Online (₹6,000) →
            </a>
          </div>

          <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">
            If you have any questions or need immediate clarification, you can reach out directly via call or WhatsApp at <strong>+91 7387773164</strong>.
          </p>
        </div>

        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          © ${new Date().getFullYear()} Saraswati Career Counselling Centre. All rights reserved.<br />
          Maharashtra CAP Admissions & All India Counselling Suite
        </div>
      </div>
    `;

    // If SMTP Credentials are provided, send actual email via Nodemailer
    if (smtpPass) {
      let transporter;
      if (smtpHost) {
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });
      } else {
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });
      }

      const attachments: any[] = [];
      if (pdfBase64) {
        attachments.push({
          filename: `Saraswati_Prediction_${studentName.replace(/\s+/g, '_')}_${exam}.pdf`,
          content: pdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        });
      }

      const info = await transporter.sendMail({
        from: `"Saraswati Career Counselling" <${smtpUser}>`,
        to: studentEmail,
        subject: `Your Official College Prediction Report (${exam} - ${percentile}%ile) | Saraswati Career Counselling`,
        html: emailHtml,
        attachments
      });

      return NextResponse.json({
        success: true,
        delivered: true,
        messageId: info.messageId,
        recipient: studentEmail,
        message: `Email successfully sent to ${studentEmail} with attached PDF!`
      });
    } else {
      // SMTP credentials not yet configured
      return NextResponse.json({
        success: true,
        delivered: false,
        requiresSmtpConfig: true,
        recipient: studentEmail,
        smtpUser,
        message: `Prediction report prepared for ${studentEmail}. Note: To deliver live emails to students' actual inboxes, add your Gmail App Password to GMAIL_APP_PASSWORD in .env.local!`
      });
    }
  } catch (error: any) {
    console.error('Error in send-pdf-email API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
