import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: '289614365@qq.com',
    pass: 'mcxuaqwwrplqbgeg',
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, contact, message } = data;

    if (!name || !contact) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name and contact are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const submitTime = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

    const mailOptions = {
      from: '"Amos Composites Website" <289614365@qq.com>',
      to: '289614365@qq.com',
      subject: `New Inquiry from ${name}`,
      text: `
New inquiry submitted via amoscomposites.cn:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name:           ${name}
📧 Contact:        ${contact}
📝 Message:
${message || 'No message provided'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ Submitted at:   ${submitTime}
      `,
      html: `
<h2 style="color:#1e3a5f;">🌐 New Website Inquiry — amoscomposites.cn</h2>
<table border="0" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;max-width:600px;">
  <tr style="background:#f8fafc;"><td><strong>👤 Name</strong></td><td>${name}</td></tr>
  <tr><td><strong>📧 Contact</strong></td><td>${contact}</td></tr>
  <tr style="background:#f8fafc;"><td colspan="2"><strong>📝 Message</strong></td></tr>
  <tr><td colspan="2" style="white-space:pre-wrap;">${message || '<em>No message provided</em>'}</td></tr>
  <tr style="background:#e2e8f0;"><td><strong>⏰ Submitted At</strong></td><td>${submitTime} (Asia/Shanghai)</td></tr>
</table>
<hr/>
<p style="color:#64748b;font-size:0.9em;">This inquiry was submitted through the contact form on <a href="https://amoscomposites.cn">amoscomposites.cn</a>.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: 'Inquiry sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Email send error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error?.message || 'Failed to send inquiry' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};
