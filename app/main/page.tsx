import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { writeFile } from "fs/promises";
import { join } from "path";
import { auth } from "@clerk/nextjs/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
export default function Page() {
    const {userId} = auth();
    async function upload(data : FormData){
        "use server"
        let file : File | undefined = data.get("file") as unknown as File
        const ContentTpe : string = data.get("ContentType") as unknown as string
        const Key : string =  data.get("fileName") as unknown as string
        const client = new S3Client({
            region : "ap-southeast-2",
            credentials : {
                accessKeyId : process.env.AWS_ACCESS_KEY_ID ??"",
                secretAccessKey: process.env.AWS_SECRET_aCCESS_KEY ?? "",
            }
        })

        if(!file){
            throw new Error("No file uploaded");
        }
        else{
        const params = {
            Bucket : "clipvaulttemp",
            Key : userId + "/" + Key,
            ContentTpe
        }
        const url = await getSignedUrl(client, new PutObjectCommand(params));
        if(url){
            try{
                let resp = await axios.put(url,file,{
                    headers :{
                        "Content-Type" : "application/octet-stream"
                    }
                })
                console.log(resp.data);
            }
            catch(error){
                console.log('something went wrong while uploading to the aws',error)
            }
        }
    }


       

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join('/','tmp',file.name)
        await writeFile(path,buffer)
        console.log(`open ${path} to see the uploaded file`);
        
        return {success : true};

    }

    return (
    <div>
        <h1>React Server Componet  : Upload</h1>
        <form action={upload} >
           
            <input type = "file" name = "file"></input>
            <input type = "text" name = "fileName"></input>
            <input type = "text" name = "ContentType"></input>
            <input type = "submit" name = "Upload"></input>
        </form>
    </div>
  );
}
