import Link from "next/link";
import {BrandLogo} from "../../../components/BrandLogo";

export function NavBar() {
    return <header className="flex py-4 shadow-xl fixed top-0 w-full z-50 bg-background/90">
        <nav className="flex items-center gap-10 container font-semibold">
            <Link href="/" className="mr-auto"><BrandLogo/></Link>
            <Link href="#" className="text-lg">Features</Link>
            <Link href="#pricing" className="text-lg">Pricing</Link> 
            <Link href="#" className="text-lg">About</Link>
        </nav>
    </header>;
}