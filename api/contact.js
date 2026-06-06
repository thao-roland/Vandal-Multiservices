// Vercel Serverless Function — envoi du formulaire de devis via Resend
// Reçoit le POST du formulaire, envoie un e-mail formaté à Louis,
// puis renvoie {ok: true} pour que le front affiche le succès.

const TO_EMAIL = ['green.clean2201@gmail.com', 'thao.roland163@gmail.com'];
const FROM_EMAIL = 'Green Clean <onboarding@resend.dev>'; // Resend free tier sans domaine

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const {
      name = '',
      email = '',
      telephone = '',
      code_postal = '',
      prestation = '',
      message = '',
      _gotcha = ''
    } = body;

    // Honeypot anti-spam — on simule un succès pour ne pas alerter le bot
    if (_gotcha && String(_gotcha).trim()) {
      return res.status(200).json({ ok: true });
    }

    if (!name.trim() || !email.trim() || !prestation.trim()) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY non configurée sur Vercel');
      return res.status(500).json({ error: 'Configuration manquante' });
    }

    const text =
      `Nouvelle demande de devis via le site Green Clean\n` +
      `\n` +
      `Nom         : ${name}\n` +
      `E-mail      : ${email}\n` +
      `Téléphone   : ${telephone || '—'}\n` +
      `Code postal : ${code_postal || '—'}\n` +
      `Prestation  : ${prestation}\n` +
      `\n` +
      `Message :\n${message || '—'}\n`;

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0a0a0a;background:#fff;">
        <div style="text-align:center;margin-bottom:28px;">
          <div style="display:inline-block;width:14px;height:14px;background:#82a280;border-radius:9999px;"></div>
          <h2 style="margin:14px 0 0;font-weight:500;letter-spacing:-0.02em;font-size:22px;">Nouvelle demande de devis</h2>
          <p style="margin:6px 0 0;color:#888;font-size:13px;">Site Green Clean</p>
        </div>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          <tr><td style="padding:10px 0;color:#888;width:130px;border-bottom:1px solid #f0f0f0;">Nom</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${esc(name)}</td></tr>
          <tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">E-mail</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;"><a href="mailto:${esc(email)}" style="color:#456b44;text-decoration:none;">${esc(email)}</a></td></tr>
          <tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Téléphone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${esc(telephone) || '—'}</td></tr>
          <tr><td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;">Code postal</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${esc(code_postal) || '—'}</td></tr>
          <tr><td style="padding:10px 0;color:#888;">Prestation</td><td style="padding:10px 0;font-weight:500;">${esc(prestation)}</td></tr>
        </table>
        <div style="margin-top:24px;">
          <p style="margin:0 0 8px;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
          <div style="background:#f5f5f7;padding:16px 18px;border-radius:12px;white-space:pre-wrap;font-size:14px;line-height:1.55;">${esc(message) || '—'}</div>
        </div>
        <p style="margin-top:28px;color:#aaa;font-size:11px;text-align:center;">Répondez directement à ce mail — votre réponse part à ${esc(email)}.</p>
      </div>`;

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        reply_to: email,
        subject: `Devis Green Clean — ${name}`,
        text: text,
        html: html
      })
    });

    if (!r.ok) {
      const err = await r.text();
      console.error('Resend error:', r.status, err);
      return res.status(500).json({ error: 'Envoi échoué', detail: err });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
