import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    // SPAM PROTECTION: Cek apakah email ini sudah mengirim pesan dalam 2 menit terakhir
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const recentMessage = await prisma.contactMessage.findFirst({
      where: {
        email: email,
        createdAt: {
          gte: twoMinutesAgo
        }
      }
    });

    if (recentMessage) {
      return NextResponse.json(
        { error: 'Anda mengirim pesan terlalu cepat. Silakan tunggu beberapa saat.' }, 
        { status: 429 }
      );
    }

    // Simpan pesan
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message
      }
    });

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
