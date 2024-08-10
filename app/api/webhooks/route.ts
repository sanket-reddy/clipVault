import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();


export async function POST(req: Request) {

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);






    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data;
    const eventType = evt.type;
    // console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    // console.log('Webhook body:', body)
    if (evt.type === 'user.created') {

    try{
        if (evt.data.id && evt.data.username && evt.data.first_name && evt.data.first_name.length > 0) {
            const newUser  = await prisma.user.create({data : {
                    userId : evt.data.id,
                    username : evt.data.username,
                    firstName : evt.data.first_name,

                }})
            if(newUser){
                console.log("new user created", newUser)
            }
            else{
                console.log("something went wrong here ")
            }
        }
    }catch(error){
        console.log("an error has occured here : ",error);
    }

    }
    return new Response('', { status: 200 })
}