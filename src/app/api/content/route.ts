import { NextResponse } from 'next/server';
import { getCmsData, saveCmsData } from '@/lib/api';

export async function GET() {
  const data = await getCmsData();
  if (!data) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  try {
    const newData = await request.json();
    const success = await saveCmsData(newData);
    if (!success) {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Data saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
