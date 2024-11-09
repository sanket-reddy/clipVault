import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export default async function Page (){
    const {userId} = auth();
    
    async function getPost(){
        "use server"
        if(userId){
            const post  = await prisma.object.findMany({where : {userClerkId : userId}})
            console.log(post);
            return post;
            
        }
        else{
            console.log("no user  id ")
            return null;
        }
    }
    const objects = await getPost();
    
    return <div>
        <div className="border-b flex item-center justify-between p-3 border-white h-[50px]">
            <h1>File name</h1>
            <h1>Content Type</h1>
            <h3>Created At</h3>
        </div>
        {objects ? <div>{objects.map((item, index)=>(
            <div key = {index}>
                <div className="flex p-3 justify-between w-full">
                    <h1>{item.fileName}</h1>
                    <h1>{item.contentType}</h1>
                    <h1>{item.createdAt.toLocaleDateString()}</h1>   
                </div>
            </div>
        ))}</div> : <h1>no user found</h1>}
        
    </div>
}