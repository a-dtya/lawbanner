import {ReactNode} from "react"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {ArrowLeftIcon} from "lucide-react"

export default function PageWithbackButton({
    backButtonHref,
    pageTitle,
    children
}:{
    backButtonHref: string,
    pageTitle: string,
    children?: ReactNode
}){
    //basically this ensures the grid to have left element to be extremely small (in terms of width) and right element to be as big as possible
    return <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-6">
        {/*size icon ensures the button to be as small (square) as possible*/}
        <Button size="icon" variant="outline" className="rounded-full" asChild>
            <Link href={backButtonHref}>
                <ArrowLeftIcon className="size-5"/>
            </Link>
        </Button>
        {/*ensures the title to be centered vertically*/}
        <h1 className="text-2xl font-semibold self-center">{pageTitle}</h1>
        {/*ensures the children to start below the title instead of below the button*/}
        <div className="col-start-2">{children}</div>
    </div>
}