"use client"
import Navbar from "@/components/ui/navbar";
import axios from "axios";
import Image from "next/image";
import {  useState } from "react";
import { useAuth,useUser } from "@clerk/nextjs";

export default function Page(){
    // const { userId  , sessionId , getToken }  = useAuth();
    const {isLoaded , isSignedIn, user} = useUser();
    
    // console.log("userId : ",userId);
    // console.log("sessionId : ",sessionId)
    // console.log("getToken", getToken);
    console.log("isloading : ",isLoaded);
    console.log("isSignedIn : ",isSignedIn)
    

    const [file,setFile] = useState<File | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [contentType,setContentType] = useState<string>("");
    const fileAdd = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]
        setFile(file);
        if(file){
            let url : string = URL.createObjectURL(file);
            setFileUrl(url);
        }
    }
    const handleSubmit = async ()=>{
        if(!user){
            alert("please login !!!");
        }
        else{
        if(!file)return null;
        const formData = new FormData();
        formData.append("userId",user.id);
        formData.append("file",file);
        formData.append("fileName",fileName)
        formData.append("contentType",contentType);
        let resp =await axios.post("/api/uploadS3",formData);
        let url = resp.data.url;
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
    }
    }
    
    return <div className="mx-4">
        <Navbar></Navbar>
        <main>
         <input type="file" onChange={fileAdd} name = "file" ></input>
         {file && fileUrl ? (<Image src = {fileUrl} alt= "file" width = {200} height={200}></Image>) : (
            <h1>No image</h1>
         )}
        <input
        onChange={(e)=>{
            setFileName(e.target.value);
        }}
        placeholder="fileName"
         className=" text-black"
        ></input>
        <br></br>
        <br></br>
        <input
        placeholder="content-type"
        onChange={(e)=>{
            setContentType(e.target.value);
        }}
         className="  text-black"
        ></input>
        <br></br>
         <button onClick={handleSubmit}>Send</button>
        </main>
    </div>
}