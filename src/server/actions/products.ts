"use server"

import { productDetailsSchema } from "@/app/dashboard/_components/forms/ProductDetailsForm";
import {z} from "zod"
import {auth} from "@clerk/nextjs/server"
import {createProduct as createProductDb, deleteProduct as deleteProductDb} from "../db/products"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProduct(unsafeData: z.infer<typeof productDetailsSchema>) 
: Promise<{error: boolean, message: string} | undefined> // this promise ensures that fn returns an object with error and message properties or will be undefined
{
    const {userId} = await auth()
    const {success, data} = productDetailsSchema.safeParse(unsafeData) // this checks if the data is valid, as per z.object

    if(!success || userId == null){
        return {error: true, message: "There was an error creating the product"}
    }

    const {id} = await createProductDb({...data, clerkUserId: userId})
    redirect(`/dashboard/products/${id}/edit?tab=countries`)
}

export async function deleteProduct(productId: string){
    const {userId} = await auth()
    if(userId == null){
        return {error: true, message: "There was an error deleting the product"}
    }
    const isSuccess = await deleteProductDb(productId, userId)

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/products")
    revalidatePath(`/dashboard/products/edit`)

    if(!isSuccess){
        return {error: true, message: "There was an error deleting the product"}
    }
    return {error: false, message: "Product deleted successfully"}
}


