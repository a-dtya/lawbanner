import { db } from "@/drizzle/db";
import { eq, desc } from "drizzle-orm";
import { ProductTable } from "@/drizzle/schema";

export default function getProducts(userId: string){
    return db.select().from(ProductTable).where(eq(ProductTable.clerkUserId, userId)).orderBy(desc(ProductTable.createdAt))
}
    