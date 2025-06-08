import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GripHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

export default function ProductCard({
    id,
    name,
    url,
    description,
  }: {
    id: string
    name: string
    url: string
    description: string
  }) {
    return(
        <Card>
            <CardHeader>
                <div className="flex gap-2 justify-between items-end">
                    <CardTitle><Link href={`/dashboard/products/${id}/edit`}>{name}</Link></CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="size-8 p-0">
                                <GripHorizontal className="size-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/products/${id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Add to Site
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>    
                    </DropdownMenu>
                </div>
                <CardDescription>{url}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}