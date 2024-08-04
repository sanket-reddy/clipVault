import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();
  const file: File | undefined = data.get("file") as unknown as File;
  const fileName: string = data.get("fileName")  as string;
  const ContentType: string = data.get("contentType")as  string;
  const userId : string = data.get("userId")as string;
  if (!file) {
    return NextResponse.json({
      message: "no file found",
      status: 200,
    });
  }

  const client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_aCCESS_KEY ?? "",
    },
  });

  async function putObject(fileName: string, ContentType: string) {
    const params = {
      Bucket: "clipvaulttemp",
      Key: userId +"/" + fileName,
      ContentType,
    };
    const url = await getSignedUrl(client, new PutObjectCommand(params));
    return url;
  }

  let url = await putObject(fileName, ContentType);
  if (url) {
    return NextResponse.json({
      message: "the url is recieved ",
      url,
      status: 200,
    });
  }
  return NextResponse.json({ msg: "no url recieved something went wrong" });
}
