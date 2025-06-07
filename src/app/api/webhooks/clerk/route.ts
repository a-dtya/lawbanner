import { db } from '@/drizzle/db'
import { UserSubscriptionTable } from '@/drizzle/schema'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

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
        case 'user.created':
            await db.insert(UserSubscriptionTable).values({
                clerkUserId: event.data.id,
                tier: 'free',
            })
            break;
        default:
            break;
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}