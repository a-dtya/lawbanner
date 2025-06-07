import { UserSubscriptionTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export default function createUserSubscription(data : typeof UserSubscriptionTable.$inferInsert){
    return db.insert(UserSubscriptionTable).values(data)
}