
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return <>
    
    <section className="min-h-screen flex items-center justify-center text-balance text-center flex-col gap-10 px-4" style={{
    background: `radial-gradient(circle at center,hsl(0,70%,40%,30%) 0%, hsl(0,70%,40%,30%) 40%, transparent 80%)`,
  }}>
      <h1 className="text-5xl font-bold">Auto Comply, Anywhere in the World!</h1>
      <p className="text-xl"><span className="font-semibold">75%</span> of websites get privacy wrong. We make sure yours isn't one of them-with smart, region-aware legal pages handled by <span className="font-semibold">AI</span>, zero stress required.</p>
      <SignUpButton>
        <Button className="text-lg p-6 rounded-xl flex gap-2">
          Get Started for Free <ArrowRightIcon className="size-5"/>
        </Button>
      </SignUpButton>
    </section>
  </>
}