"use server"

import { productDetailsSchema } from "@/app/dashboard/_components/forms/ProductDetailsForm";
import {z} from "zod"

import {auth} from "@clerk/nextjs/server"
import {createProduct as createProductDb} from "../db/products"
import { redirect } from "next/navigation";

export default async function createProduct(unsafeData: z.infer<typeof productDetailsSchema>) 
: Promise<{error: boolean, message: string} | undefined>{
    const {userId} = await auth()
    const {success, data} = productDetailsSchema.safeParse(unsafeData) // this checks if the data is valid, as per z.object

    if(!success || userId == null){
        return {error: true, message: "There was an error creating the product"}
    }

    const {id} = await createProductDb({...data, clerkUserId: userId})
    redirect(`/dashboard/products/${id}/edit?tab=countries`)
}
