import {useForm, SubmitHandler} from "react-hook-form"

type ProductDetailFieldTypes = {
    name: string,
    url: string,
    description: string
}

export default function ProductDetailsForm(){
    {/*Now we have to register the input fields with the useForm*/}
    const {register, handleSubmit, formState: {errors}} = useForm<ProductDetailFieldTypes>()

    const onSubmit: SubmitHandler<ProductDetailFieldTypes> = (data) => {
        console.log(data)
    }

     {/*Handle submit prevents default behaviour of form submission*/}

    return (
       
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*Name*/}
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name", {required: "Name is required", minLength: {value: 3, message: "Name must be at least 3 characters long"}})}/>
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            {/*URL*/}
            <div>
                <label htmlFor="url">URL</label>
                <input type="text" id="url" {...register("url", {required: "URL is required", pattern: {value: /https?:\/\//, message: "URL must start with http or https"}})}/>
                {errors.url && <p>{errors.url.message}</p>}
            </div>
            {/*Description*/}
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" {...register("description", {maxLength: {value: 100, message: "Description must be at most 100 characters long"}})}/>
                {errors.description && <p>{errors.description.message}</p>}
            </div>
            {/*Submit button*/}
            <button type="submit">Submit</button>
        </form>
    )
}