"use client"

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {env} from "@/data/env/client"

export function AddToSiteModalContent({productId}: {productId: string}){
    const scriptCode = `<script src="${env.NEXT_PUBLIC_SERVICE_URL}/api/products/${productId}/popup"></script>`
    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Embed Your Compliance Pop-up</DialogTitle>
                <DialogDescription>
                    Show region-aware policies with a single snippet. Paste this code into your site’s HTML to display the compliance pop-up automatically.
                </DialogDescription>
            </DialogHeader>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-4">
                <code className="text-sm">{scriptCode}</code>
            </pre>
        </DialogContent>
    )
}

