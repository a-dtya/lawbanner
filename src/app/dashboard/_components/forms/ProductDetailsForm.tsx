import {useForm, SubmitHandler} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const productDetailsSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    url: z.string().url("Invalid URL"),
    description: z.string().max(100, "Description must be at most 100 characters long").min(5, "Description must be at least 5 characters long")
})
type ProductDetailFieldTypes = z.infer<typeof productDetailsSchema>
    

// type ProductDetailFieldTypes = {
//     name: string,
//     url: string,
//     description: string
// }

export default function ProductDetailsForm(){
    {/*Now we have to register the input fields with the useForm*/}
    {/*We use the zod schema to validate the form. connect hook form to zod schema using resolver*/}
    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<ProductDetailFieldTypes>({
        resolver: zodResolver(productDetailsSchema),
        defaultValues:{
            name: "test website",
            url: "https://testwebsite.com",
            description: "This is a test website"
        }
    })

    const onSubmit: SubmitHandler<ProductDetailFieldTypes> = (data) => {
        try{
            console.log(data)
        }
        catch(error){
            setError("root", {type: "server", message: "Something went wrong while creating the product"})
        }
    }

     {/*Handle submit prevents default behaviour of form submission*/}

    return (
       
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*Name*/}
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name")}/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            {/*URL*/}
            <div>
                <label htmlFor="url">URL</label>
                <input type="text" id="url" {...register("url")}/>
                {errors.url && <p className="text-red-500">{errors.url.message}</p>}
            </div>
            {/*Description*/}
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" {...register("description")}/>
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            {/*Submit button*/}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create Product"}</button>
            {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        </form>
    )
}