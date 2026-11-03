import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Strict input validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid corporate or professional email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide detailed project requirements (minimum 10 characters)." },
        { status: 400 }
      );
    }

    // In a production environment with email SMTP or database, persist message here.
    // For portfolio demonstration, validate and acknowledge receipt with technical reference code.
    const transmissionId = `TX-${Date.now().toString().slice(-6)}`;
    console.log("Engineering inquiry received:", { name, email, subject, transmissionId });

    return NextResponse.json(
      {
        success: true,
        message: "Engineering inquiry received and logged.",
        transmissionId,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred processing request." },
      { status: 500 }
    );
  }
}
