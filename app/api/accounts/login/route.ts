import { connectToDb } from "@/lib/mongodb";
import AccountModel from "@/models/AccountModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  // Connect to mongodb database
  await connectToDb();
  // Get properties from frontend
  const { password, accountId } = await req.json();

  // Checking properties
  if (!password || !accountId) {
    return NextResponse.json(
      {
        message: "Password and AccountId is required",
        success: false,
      },
      { status: 401 }
    );
  }

  try {
    // Find account from mongodb by come to frontend accountId
    const account = await AccountModel.findById(accountId);

    // Checking account
    if (!account) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    }

    // Checking account password and come to frontend password
    const isPassEqual = await bcrypt.compare(password, account.password);

    // Checking password
    if (!isPassEqual) {
      return NextResponse.json(
        {
          message: "Incorrect Password",
          success: false,
        },
        { status: 401 }
      );
    }

    // Return data to frontend
    return NextResponse.json({
      message: "Account Choosed",
      success: true,
      account,
    });
  } catch (error) {
    // Return error
    return NextResponse.json(
      { message: `Server Error ${error}`, success: false },
      { status: 500 }
    );
  }
}
