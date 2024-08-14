import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        console.log("handler reached")
        const users = await prisma.user.findMany({});
        return NextResponse.json(users, { status: 200 });
    } catch (err) {
        console.error("An error has occurred:", err);
        return NextResponse.json({ msg: "Something went wrong", error: err }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try{
        const {value} = await req.json()
        const users = await prisma.user.findMany({})
        const selectedUsers = users.filter( (user => user.username.toLowerCase().includes(value.toLowerCase())))
        const userNames = selectedUsers.
        map(user=>user.username);
        return NextResponse.json(userNames, { status: 200 });
    }catch(error){
        console.log("An error has occurred:", error);
        return NextResponse.json({message:error,status: 500 });
    }
}