import { writeFile } from "fs/promises";
import { join } from "path";

export default function Page() {

    async function upload(data : FormData){
        "use server"
        let file : File | undefined = data.get("file") as unknown as File
        console.log(data);
        
        if(!file){
            throw new Error("No file uploaded");
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
        <form action={upload}>
            <input type = "file" name = "file"></input>
            <input type = "submit" name = "Upload"></input>
        </form>
    </div>
  );
}
