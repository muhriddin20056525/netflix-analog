import { authOptions } from "@/lib/auth";
import { connectToDb } from "@/lib/mongodb";
import ProfileModel from "@/models/Profile";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await connectToDb();
  const { password, profileId } = await req.json();

  if (!password || !profileId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const currentProfile = await ProfileModel.findOne({
      _id: profileId,
      userId: session.user.id,
    });

    if (!currentProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, currentProfile.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ profile: currentProfile });
  } catch (error) {
    return NextResponse.json(
      { error: `Server error ${error}` },
      { status: 500 }
    );
  }
}
