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
        <h1>user01</h1>
        {objects ? <div>{objects.map((item, index)=>(
            <div key = {index}>
                <h1>{item.fileName}</h1>
                <h1>{item.contentType}</h1>
            </div>
        ))}</div> : <h1>no user found</h1>}
        
    </div>
}