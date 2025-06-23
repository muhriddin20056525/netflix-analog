import { connectToDb } from "@/lib/mongodb";
import AccountModel from "@/models/AccountModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Create Account
export async function POST(req: Request) {
  // connect To Db
  await connectToDb();

  // Get Req.Json Data
  const { accountImg, username, password, uid, fileId } = await req.json();

  // Validate Data
  if (!accountImg || !username || !password || !uid || !fileId) {
    return NextResponse.json(
      { message: "Complete all sections" },
      { status: 400 }
    );
  }

  try {
    // Hash Password With Bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create New Account
    const newAccount = await AccountModel.create({
      accountImg,
      username,
      password: hashedPassword,
      uid,
      fileId,
    });

    // Return Response To Frontend
    return NextResponse.json(
      {
        message: "Created New Account Successfully",
        account: newAccount,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server Error ${error}`, success: false },
      { status: 500 }
    );
  }
}

// Get All Accounts
export async function GET(req: Request) {
  await connectToDb();

  // Get uid it need becouse find this user all accounts
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  // Checked uid
  if (!uid) {
    return NextResponse.json({ message: "uId is required" });
  }

  try {
    // Find all account by uid
    const allAccounts = await AccountModel.find({ uid });

    // Sent to frontend AllAccounts
    return NextResponse.json(
      {
        message: "Get all accounts",
        success: true,
        accounts: allAccounts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server Error ${error}`, success: false },
      { status: 500 }
    );
  }
}
