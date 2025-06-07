
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import createUserSubscription from '@/server/db/subscription'
import deleteUser from '@/server/db/users'

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req, {
        signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
    })

    // Do something with payload
    // For this guide, log payload to console
    const { id } = event.data
    const eventType = event.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', event.data)

    //custom business logic, to subscribe to free tier when user is created
    switch(eventType){
        case 'user.created': {
            await createUserSubscription({
                clerkUserId: event.data.id,
                tier: 'free',
            })
            break;
          }
        case 'user.deleted': {
            if(event.data.id != null){
              await deleteUser(event.data.id)
            }
            break;
          }
        default: {
            break;
          }
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}