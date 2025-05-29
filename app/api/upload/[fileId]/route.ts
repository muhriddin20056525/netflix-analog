import { connectToDb } from "@/lib/mongodb";
import ProfileModel from "@/models/Profile";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function DELETE(
  _req: Request,
  { params }: { params: { fileId: string } }
) {
  const { fileId } = params;

  console.log(`fileid server`, fileId);

  if (!fileId) {
    return NextResponse.json({ error: "fileId Not Found" }, { status: 400 });
  }

  try {
    await imagekit.deleteFile(fileId);
    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
