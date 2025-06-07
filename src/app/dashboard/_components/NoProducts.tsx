import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function NoProducts(){
    return <div className="flex mt-28 items-center justify-center h-full text-balance text-center">
        <h1 className="text-2xl font-bold mb-2">You have not created any products yet.</h1>
        <p className="mb-4 text-muted-foreground">Click the button below to create your first product with LawBanner.</p>
        <Button size="lg" asChild> <Link href="/dashboard/products/new">Add Product</Link></Button>
    </div>
}