import { connectToDb } from "@/lib/mongodb";
import AccountModel from "@/models/AccountModel";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function DELETE(_req: Request, route: { params: { id: string } }) {
  await connectToDb();
  const { id } = await route.params;

  try {
    const account = await AccountModel.findById(id);

    if (!account) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    }

    if (account.fileId) {
      try {
        await imagekit.deleteFile(account.fileId);
      } catch (error) {
        return NextResponse.json(
          { message: "Something went wrong from delete img" },
          { status: 500 }
        );
      }
    }

    await AccountModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Account Deleted", success: true });
  } catch (error) {
    return NextResponse.json(
      { message: `Server Error ${error}`, success: false },
      { status: 500 }
    );
  }
}
