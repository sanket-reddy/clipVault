import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export  async function POST(request: Request) {
  try {
    const { fileName, userClerkId, contentType } = await request.json();
    const newObject = await prisma.object.create({
      data: { fileName, userClerkId, contentType },
    });
    if (newObject) {
      return NextResponse.json({
        message: "data stored in db successfully",
        status: 200,
        newObject
      });
    }
    return NextResponse.json({ message: "something went wrong " });
  } catch (error) {
    console.log("an error has occured here : ", error);
    return NextResponse.json({
      message: "some error has occured here ",
      error,
    });
  }
}
