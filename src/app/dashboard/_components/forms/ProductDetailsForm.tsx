import {useForm, SubmitHandler} from "react-hook-form"

type ProductDetailFieldTypes = {
    name: string,
    url: string,
    description: string
}

export default function ProductDetailsForm(){
    {/*Now we have to register the input fields with the useForm*/}
    const {register, handleSubmit} = useForm<ProductDetailFieldTypes>()

    const onSubmit: SubmitHandler<ProductDetailFieldTypes> = (data) => {
        console.log(data)
    }

     {/*Handle submit prevents default behaviour of form submission*/}

    return (
       
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*Name*/}
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name")}/>
            </div>
            {/*URL*/}
            <div>
                <label htmlFor="url">URL</label>
                <input type="text" id="url" {...register("url")}/>
            </div>
            {/*Description*/}
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" {...register("description")}/>
            </div>
            {/*Submit button*/}
            <button type="submit">Submit</button>
        </form>
    )
}