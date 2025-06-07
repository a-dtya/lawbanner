import { auth } from "@clerk/nextjs/server";
import getProducts from "@/server/db/products";
import { RedirectToSignIn } from "@clerk/nextjs";
import NoProducts from "./_components/NoProducts";

export default async function DashboardPage() {
    const {userId} = await auth()
    if(userId == null){
        return <RedirectToSignIn/>
    }
    const products = await getProducts(userId)
    if(products.length === 0) return <NoProducts/>
    else return <>
    </>
}