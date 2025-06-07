import { UserSubscriptionTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export default function createUserSubscription(data : typeof UserSubscriptionTable.$inferInsert){
    return db.insert(UserSubscriptionTable).values(data).onConflictDoNothing({
        target: UserSubscriptionTable.clerkUserId,
    })
    //on conflict ensures that if user is already subscribed, it will not throw an error. (esp when i delete the user and create again) 
}