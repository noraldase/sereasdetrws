export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { id, nick, jumlah, bank, norek, nama } = req.body;
    const token = "8281346868:AAGLSYVYHVjR6uZHqx0pukGABVOXD-6UOjw";
    const chat_id = "7614282744";

    const pesan = `🔔 *BONGKAR CHIP* 🔔\n\n🆔 ID: ${id}\n👤 Nick: ${nick}\n💰 Jumlah: ${jumlah}\n🏦 Bank: ${bank}\n💳 No Rek: ${norek}\n📛 Nama: ${nama}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chat_id,
                text: pesan,
                parse_mode: 'Markdown'
            })
        });

        const result = await response.json();

        if (result.ok) {
            return res.status(200).json({ status: 'success' });
        } else {
            // INI PENTING: Mengirim alasan error asli dari Telegram
            return res.status(500).json({ 
                status: 'error', 
                message: `Telegram Bilang: ${result.description}` 
            });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}
