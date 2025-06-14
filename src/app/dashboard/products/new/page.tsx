import PageWithbackButton from "../../_components/PageWithbackButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProductDetailsForm from "../../_components/forms/ProductDetailsForm"

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
                <ProductDetailsForm/>
            </CardContent>
        </Card>
    </PageWithbackButton>
}