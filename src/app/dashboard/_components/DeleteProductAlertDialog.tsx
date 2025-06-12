"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"
import { deleteProduct } from "@/server/actions/products"

export default function DeleteProductAlertDialog({productId}: {productId: string}){
    const [isDeletePending, startDeleteTransition] = useTransition()
    return(
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your product and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => startDeleteTransition(
                        async () => {
                            const {error, message} = await deleteProduct(productId)
                            if(error){
                                toast(message)
                            }
                            else{
                                toast(message)
                            }
                        }
                    )} disabled={isDeletePending}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
    )
}