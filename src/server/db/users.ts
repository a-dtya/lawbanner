import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { UserSubscriptionTable, ProductTable } from "@/drizzle/schema";

export default function deleteUser(clerkUserId : string){
    //basically batch performs operations one after the other and rollbacks if any operation fails
    return db.batch([
        db.delete(UserSubscriptionTable).where(eq(UserSubscriptionTable.clerkUserId, clerkUserId)),
        db.delete(ProductTable).where(eq(ProductTable.clerkUserId, clerkUserId)),
    ])
    
}