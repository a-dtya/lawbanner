import Link from "next/link";
import {BrandLogo} from "../../../components/BrandLogo";
import { UserButton } from "@clerk/nextjs";

export function NavBar() {
    return <header className="flex py-4 shadow-xl fixed top-0 w-full z-50 bg-background/90">
        <nav className="flex items-center gap-10 container font-semibold">
            <Link href="/dashboard" className="mr-auto"><BrandLogo/></Link>
            <Link href="/dashboard/products" className="text-lg">Products</Link>
            <Link href="/dashboard/analytics" className="text-lg">Analytics</Link> 
            <Link href="/dashboard/subscription" className="text-lg">Subscription</Link>
            <UserButton/>
        </nav>
    </header>;
}