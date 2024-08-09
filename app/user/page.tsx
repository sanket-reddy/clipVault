import { Button } from "@/components/ui/button";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@clerk/nextjs/server";

export default function Page() {
  const { userId } = auth();
  async function fetchFiles() {
    "use server";
    console.log("called")
    if (userId) {
      const client = new S3Client({
        region: "ap-southeast-2",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.AWS_SECRET_aCCESS_KEY ?? "",
        },
      });

      const params = {
        Bucket: "clipvaulttemp",
        Key: userId,
      };
      try {
        const url = await getSignedUrl(client, new GetObjectCommand(params));
        console.log("url : ", url);
      } catch (error) {
        console.log("an error has occured here : ", error);
      }
    }
    else{
        alert("something went wrong")
    }
  }

  return (
    <div>
      <h1>{userId}</h1>
      <form action={fetchFiles}>
        <Button type="submit">send</Button>
        <input type = "submit" name = "Upload"></input>

      </form>
    </div>
  );
}
