import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

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
                <CardTitle><Link href={`/dashboard/products/${id}/edit`}>{name}</Link></CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
                <p className="text-sm text-muted-foreground">{url}</p>
            </CardContent>
        </Card>
    )
}