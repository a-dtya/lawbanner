import { db } from "@/drizzle/db";
import { eq, desc, and } from "drizzle-orm";
import { PolicyBannerCustomisationTable, ProductTable } from "@/drizzle/schema";
import { getUserTag, dbCache, CACHE_TAGS} from "@/lib/cache";
import { revalidateTag } from "next/cache";


export function getProducts(userId: string){
    const cacheFn = dbCache(getProductsInternal, {tags: [getUserTag(userId, CACHE_TAGS.products)]})
    return cacheFn(userId)
}

export function getProduct({id, userId}:{id: string, userId: string}){
    return db.select().from(ProductTable).where(and(eq(ProductTable.id, id), eq(ProductTable.clerkUserId, userId))).limit(1)
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

    revalidateTag(getUserTag(data.clerkUserId, CACHE_TAGS.products))

    return newProduct
}

export async function deleteProduct(productId: string, userId: string){
    const {rowCount} = await db.delete(ProductTable).where(and(eq(ProductTable.id, productId), eq(ProductTable.clerkUserId, userId)))

    revalidateTag(getUserTag(userId, CACHE_TAGS.products))
    
    return rowCount > 0
}

function getProductsInternal(userId: string){
    return db.select().from(ProductTable).where(eq(ProductTable.clerkUserId, userId)).orderBy(desc(ProductTable.createdAt))
}
    