import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function GET() {
  const publicDir = path.join(process.cwd(), 'public');
  try {
    const files = fs.readdirSync(publicDir);
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext);
    });
    // Return API URLs
    return NextResponse.json({ images: images.map(img => `/api/file/${img}`) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read public directory' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicDir = path.join(process.cwd(), 'public');
    
    // Extract base filename without extension and append .webp extension
    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${baseName}.webp`;
    const filePath = path.join(publicDir, filename);

    // Process image with sharp
    let sharpInstance = sharp(buffer);
    const metadata = await sharpInstance.metadata();

    // Auto-resize if dimensions are excessively large (helps guarantee < 500KB)
    if (metadata.width && metadata.width > 1920) {
      sharpInstance = sharpInstance.resize({ width: 1920 });
    } else if (metadata.height && metadata.height > 1080) {
      sharpInstance = sharpInstance.resize({ height: 1080 });
    }

    let quality = 82;
    let webpBuffer = await sharpInstance.clone().webp({ quality }).toBuffer();

    // Loop compression if size is still greater than 500KB (512,000 bytes)
    while (webpBuffer.length > 500 * 1024 && quality > 10) {
      quality -= 10;
      webpBuffer = await sharpInstance.clone().webp({ quality }).toBuffer();
    }

    fs.writeFileSync(filePath, webpBuffer);
    return NextResponse.json({ url: `/api/file/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    if (!filename) return NextResponse.json({ error: 'Filename missing' }, { status: 400 });

    const safeFilename = path.basename(filename);
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, safeFilename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
