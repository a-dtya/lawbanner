import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-10 px-6 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-8">
        
        {/* Brand / Left side */}
        <div>
          <Link href="/" className="text-xl font-bold text-foreground">
            LawBanner
          </Link>
          <p className="mt-2 max-w-xs text-muted-foreground">
            Smart, region-aware privacy compliance for modern websites.
          </p>
        </div>

        {/* Navigation / Right side */}
        <div className="flex flex-col sm:flex-row gap-10">
          
          <div>
            <h4 className="font-semibold mb-2 text-foreground">Product</h4>
            <ul className="space-y-1">
              <li><Link href="#features">Features</Link></li>
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="#signup">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">Company</h4>
            <ul className="space-y-1">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">Legal</h4>
            <ul className="space-y-1">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LawBanner. All rights reserved.
      </div>
    </footer>
  )
}