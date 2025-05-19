import { authOptions } from "@/lib/auth";
import { connectToDb } from "@/lib/mongodb";
import ProfileModel from "@/models/Profile";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// create profile
export async function POST(req: Request) {
  await connectToDb();

  const { name, password, avatar } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  if (!name || !password || !avatar) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newProfile = await ProfileModel.create({
      name,
      password: hashedPassword,
      avatar,
      userId: session.user.id,
    });

    return NextResponse.json(
      { message: "Profile created successfully", profile: newProfile },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Server error ${error}` },
      { status: 500 }
    );
  }
}

// get this user profile
export async function GET(req: Request) {
  await connectToDb();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const profiles = await ProfileModel.find({ userId: session.user.id });

    return NextResponse.json(
      { message: "get user profiles", profiles },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Server error ${error}` },
      { status: 500 }
    );
  }
}
