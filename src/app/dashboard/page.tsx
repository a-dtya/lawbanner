import { auth } from "@clerk/nextjs/server";
import {getProducts} from "@/server/db/products";
import { RedirectToSignIn } from "@clerk/nextjs";
import NoProducts from "./_components/NoProducts";
import Link from "next/link";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
    const {userId} = await auth()
    if(userId == null){
        return <RedirectToSignIn/>
    }
    const products = await getProducts(userId)
    if(products.length === 0) return <NoProducts/>
    return <>
        <h2 className="text-2xl font-semibold mb-4 flex justify-between">
            <Link className="group flex gap-2" href="/dashboard/products">
                Products <ArrowRightIcon className="group-hover:translate-x-1 transition-transform"/>
            </Link>
        </h2>
        <Button asChild>
            <Link href="/dashboard/products/new"><PlusIcon className="mr-2 size-4"/>Add Product</Link>
        </Button>
    </>
}