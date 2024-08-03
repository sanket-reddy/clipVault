"use client"
import Navbar from "@/components/ui/navbar";
import axios from "axios";
import Image from "next/image";
import {  useState } from "react";

export default function Page(){

    const [file,setFile] = useState<File | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string>("");
    const [url,setUrl] = useState<string>("");    
    const fileAdd = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]
        setFile(file);
        if(file){
            let url : string = URL.createObjectURL(file);
            setFileUrl(url);
            console.log(url);
        }
    }
    const handleSubmit = async ()=>{
        if(!file)return null;

        const formData = new FormData();
        formData.append("file",file);
        let resp =await axios.post("/api/uploadS3",formData);
        let url = resp.data.url;
        console.log(url);
        try{
            let resp2 = await axios.put(url, file, {
                headers: {
                  "Content-Type": "application/octet-stream",
                },
              });
            console.log(resp2.data);
        }
        catch(error){
            console.log("an error has occured here : ",error);
        }
        // console.log("file : ",resp.data.file);
    }
    
    return <div className="mx-4">
        <Navbar></Navbar>
        <main>
         <input type="file" onChange={fileAdd} name = "file" ></input>
         {file && fileUrl ? (<Image src = {fileUrl} alt= "file" width = {200} height={200}></Image>) : (
            <h1>No image</h1>
         )}

         <button onClick={handleSubmit}>Send</button>
        </main>
    </div>
}