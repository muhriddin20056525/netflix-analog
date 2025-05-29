// app/api/upload/route.ts
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;

  if (!file)
    return NextResponse.json({ error: "Fayl topilmadi" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = formData.get("fileName") || "unnamed";

  try {
    const result = await imagekit.upload({
      file: buffer,
      fileName: fileName.toString(),
      folder: "netflix-analog",
    });

    return NextResponse.json(
      { url: result.url, fileId: result.fileId },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Yuklashda xatolik" }, { status: 500 });
  }
}
