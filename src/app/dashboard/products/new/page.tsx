import PageWithbackButton from "../../_components/PageWithbackButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProductPage(){
    return <PageWithbackButton backButtonHref="/dashboard/products" pageTitle="New Product">
        <Card>
            <CardHeader>
                <CardTitle>
                    Product Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/*Product form*/}
            </CardContent>
        </Card>
    </PageWithbackButton>
}