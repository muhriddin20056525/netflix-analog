import { connectToDb } from "@/lib/mongodb";
import ProfileModel from "@/models/Profile";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDb();

  try {
    const profile = await ProfileModel.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Profile deleted successfully",
      profile,
    });
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
