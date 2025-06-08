import ProductCard from "./ProductCard"

export default function ProductGrid({products}:{products: {
    id: string
    name: string
    url: string
    description: string
}[]}) {
    return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/*productcard*/}
            {products.map(product => (
                <ProductCard key={product.id} {...product}/>
            ))}
    </div>
    </>
}