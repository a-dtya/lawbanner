import { db } from "@/drizzle/db";
import { eq, desc, and } from "drizzle-orm";
import { PolicyBannerCustomisationTable, ProductTable } from "@/drizzle/schema";

export function getProducts(userId: string){
    return db.select().from(ProductTable).where(eq(ProductTable.clerkUserId, userId)).orderBy(desc(ProductTable.createdAt))
}


//create new product, at the same time add in policy banner cust table. if duplicate entry found, delete the product
export async function createProduct(data : typeof ProductTable.$inferInsert){
    const [newProduct] = await db.insert(ProductTable).values(data).returning({
        id: ProductTable.id,
    })

    try{
        await db.insert(PolicyBannerCustomisationTable).values({productId: newProduct.id}).onConflictDoNothing({
            target: PolicyBannerCustomisationTable.productId,
        })
    }
    catch(error){
        console.log(error)
        await db.delete(ProductTable).where(eq(ProductTable.id, newProduct.id))
    }

    return newProduct
}

export async function deleteProduct(productId: string, userId: string){
    const {rowCount} = await db.delete(ProductTable).where(and(eq(ProductTable.id, productId), eq(ProductTable.clerkUserId, userId)))
    
    return rowCount > 0
}