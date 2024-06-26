// what data to check or validate
// name has to be zoded* = min/max/string/no-special chars or num; only letters/
// -make sure sql injection is improbable by using variables and binding those to queries


import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { userSchema } from "@/lib/validators/userSchema";

export async function POST(request: NextRequest) {
  try {
    // Attempt to parse and validate the request body using Zod
    const body = await request.json();
    const validatedData = userSchema.parse(body);

    // Extract the validated data
    const { name } = validatedData;

    // Execute the SQL query with the validated data
    try {
      await sql`
          INSERT INTO Users (name, username, wallet_address)
          VALUES (${name}, ${username}, ${wallet_address});
        `;
    } catch (sqlError) {
      // Handle SQL query execution errors
      console.error("SQL query execution error:", sqlError);
      return NextResponse.json(
        { error: "An error occurred while adding the user to the database." },
        { status: 500 },
      );
    }

    // Return a success response after successfully inserting the user
    return NextResponse.json(
      { message: "User added successfully" },
      { status: 201 },
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      // Return a custom error response with the validation errors
      console.error("Zod validation error:", error.errors);
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else {
      // Handle other types of errors
      console.error("An error occurred while adding the user:", error);
      return NextResponse.json(
        { error: "An error occurred while adding the user." },
        { status: 500 },
      );
    }
  }
}