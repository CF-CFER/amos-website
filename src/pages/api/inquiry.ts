import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const SMTP_USER = import.meta.env.SMTP_USER || '289614365@qq.com';
const SMTP_PASS = import.meta.env.SMTP_PASS || '';
const ALLOWED_ORIGIN = 'https://amoscomposites.cn';

// Simple rate limiter based on request timestamp (5 per minute window)
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  // Use a simple hash of IP + minute timestamp to create a bucket key
  const timeBucket = Math.floor(now / RATE_LIMIT_WINDOW);
  const bucketKey = `${clientIP}:${timeBucket}`;
  
  // Use globalThis to persist across warm invocations
  const store = (globalThis as any).__rateLimitStore || {};
  (globalThis as any).__rateLimitStore = store;
  
  const current = store[bucketKey] || 0;
  if (current >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }
  
  store[bucketKey] = current + 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - current - 1 };
}

function cleanupOldBuckets() {
  const now = Date.now();
  const currentBucket = Math.floor(now / RATE_LIMIT_WINDOW);
  const store = (globalThis as any).__rateLimitStore || {};
  
  // Remove buckets older than current window
  Object.keys(store).forEach(key => {
    const keyBucket = parseInt(key.split(':').pop() || '0');
    if (keyBucket < currentBucket - 1) {
      delete store[key];
    }
  });
}

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     request.headers.get('cf-connecting-ip') || 
                     'unknown';
    
    cleanupOldBuckets();
    const rateCheck = checkRateLimit(clientIP);
    
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({ success: false, error: 'Rate limit exceeded. Please try again in a minute.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' } }
      );
    }
    
    if (!SMTP_PASS) {
      return new Response(
        JSON.stringify({ success: false, error: 'SMTP not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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
      from: '"Amos Composites" <289614365@qq.com>',
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
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': String(rateCheck.remaining) } }
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