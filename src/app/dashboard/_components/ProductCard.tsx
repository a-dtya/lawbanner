import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GripHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AddToSiteModalContent } from "./AddToSiteModalContent"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import DeleteProductAlertDialog from "./DeleteProductAlertDialog"

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
                    <Dialog>
                    <AlertDialog>
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
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    Add to Site
                                </DropdownMenuItem>
                            </DialogTrigger>
                            </DropdownMenuContent>
                            <AddToSiteModalContent productId={id}/>

                        
                        <DropdownMenuContent>
                            <AlertDialogTrigger asChild>
                            <DropdownMenuItem>
                                Delete
                            </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>  
                        <DeleteProductAlertDialog productId={id}/>

                    </DropdownMenu>
                    </AlertDialog>
                    </Dialog>
                </div>
                <CardDescription>{url}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}