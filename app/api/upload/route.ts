import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest , res : NextResponse) {
    try{
    let data =  await req.formData()
    let file = data.get("file");
    if(file){

        return NextResponse.json({msg : "file recieved",file})
    }
    else{
        return NextResponse.json({msg : "no file found"})
    }

    }catch(error){
        console.log("an error has occured : ",error);
    }
}