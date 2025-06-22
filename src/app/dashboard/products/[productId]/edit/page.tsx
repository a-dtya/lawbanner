import { auth } from "@clerk/nextjs/server"
import { getProduct } from "@/server/db/products"
import { notFound } from "next/navigation"
import PageWithbackButton from "../../../_components/PageWithbackButton"

export default async function EditProductPage(
    {params: {productId},
    searchParams: {tab = "details"}}: {
        params: {productId: string}
        searchParams: {tab?: string}
    }
){
    const {userId, redirectToSignIn} = await auth()

    if(!userId){
        return redirectToSignIn()
    }

    const product = await getProduct({id: productId, userId})

    if(product.length === 0){
        return notFound()
    }

    return (
        <PageWithbackButton backButtonHref="/dashboard/products" pageTitle="Edit Product">
            {/* Product form */}
        </PageWithbackButton>
    )

}