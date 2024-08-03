import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse,NextRequest } from "next/server";
 export async function POST(req : NextRequest, res: NextResponse){

    const data  = await req.formData()
    const file : File |undefined = data.get("file")as unknown as File;
    if(!file){
        return NextResponse.json({
            message : "no file found",
            status : 200
        })
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    const client = new S3Client({
        region: "ap-southeast-2",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
            secretAccessKey: process.env.AWS_SECRET_aCCESS_KEY ?? ""
        }
    });
    
     async function putObject(fileName:string,ContentType : string) {
        const params= {
            Bucket : "clipvaulttemp",
            Key : fileName,
            ContentType
            
        }
        const url = await getSignedUrl(client, new PutObjectCommand(params)); 
        return url;
    }

    let url =await putObject("nextjsObject", "image/jpeg");
    if(url){
        return NextResponse.json({message : "the url is recieved ", url,status : 200})
    }
    return NextResponse.json({msg : "no url recieved something went wrong"})

 } 