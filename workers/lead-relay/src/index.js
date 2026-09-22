// Cloudflare Worker that replaces the Next.js API routes on the static site.
// GitHub Pages cannot run app/api/*, so this Worker sits on thebrightbyte.com/api/*
// and forwards form submissions to the Telegram bot.
//
// Secrets: TELEGRAM_BOT_TOKEN (required). Vars: TELEGRAM_CHAT_ID.

const MAX_TEXT = 3500; // Telegram limit is 4096 characters per message
const MAX_FILE = 20 * 1024 * 1024; // Telegram bot upload limit for documents

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const clip = (value, max = 500) =>
  String(value ?? '')
    .slice(0, max)
    .trim();

async function telegram(env, method, body) {
  const res = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`,
    body instanceof FormData
      ? { method: 'POST', body }
      : {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        },
  );
  if (!res.ok) {
    console.error('Telegram API error', res.status, await res.text());
  }
  return res.ok;
}

async function sendMessage(env, text) {
  return telegram(env, 'sendMessage', {
    chat_id: env.TELEGRAM_CHAT_ID,
    text: clip(text, MAX_TEXT),
    disable_web_page_preview: true,
  });
}

async function handleMessage(request, env) {
  const body = await request.json().catch(() => null);
  const message = clip(body?.message, MAX_TEXT);
  if (!message) return json({ error: 'Message is required' }, 400);
  const ok = await sendMessage(env, `Lead from thebrightbyte.com\n\n${message}`);
  return ok ? json({ success: true }) : json({ error: 'Failed to send message' }, 502);
}

async function handleDocument(request, env) {
  const form = await request.formData().catch(() => null);
  const document = form?.get('document');
  if (!document || typeof document === 'string') {
    return json({ error: 'Document is required' }, 400);
  }
  if (document.size > MAX_FILE) return json({ error: 'File is too large' }, 413);

  const out = new FormData();
  out.append('chat_id', env.TELEGRAM_CHAT_ID);
  out.append('document', document, document.name);
  out.append('caption', clip(`Application from thebrightbyte.com\n\n${form.get('caption') ?? ''}`, 1000));
  const ok = await telegram(env, 'sendDocument', out);
  return ok ? json({ success: true }) : json({ error: 'Failed to send document' }, 502);
}

async function handleBrief(request, env) {
  const b = await request.json().catch(() => null);
  if (!b) return json({ error: 'Invalid body' }, 400);
  const lines = [
    'Project brief from thebrightbyte.com',
    '',
    `Name: ${clip(b.name, 200)}`,
    `Company: ${clip(b.company_name, 200)}`,
    `Email: ${clip(b.email, 200)}`,
    `About business: ${clip(b.about_business)}`,
    `Idea: ${clip(b.idea)}`,
    `Objective: ${clip(b.objective)}`,
    `Obstacles: ${clip(b.obstacle)}`,
    `Budget: ${clip(b.budget, 200)}`,
  ];
  const ok = await sendMessage(env, lines.join('\n'));
  return ok ? json({ success: true }) : json({ error: 'Failed to send brief' }, 502);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return json({ error: 'Telegram not configured' }, 500);
    }

    switch (pathname) {
      case '/api/telegram':
        return handleMessage(request, env);
      case '/api/telegram/document':
        return handleDocument(request, env);
      case '/api/briefsend':
        return handleBrief(request, env);
      case '/api/send':
        // Email via Resend is not wired up; the same lead already goes to Telegram.
        return json({ success: true, email: 'skipped' });
      default:
        return json({ error: 'Not found' }, 404);
    }
  },
};
