import { connectToDb } from "@/lib/mongodb";
import ProfileModel from "@/models/Profile";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDb();

  try {
    await ProfileModel.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Profile deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Server error ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDb();

  const profile = await ProfileModel.findOne({
    _id: params.id,
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json({ profile });
}
