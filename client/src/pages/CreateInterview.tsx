import { useForm } from "react-hook-form";
import axios from "axios";


function CreateInterview(){

const {
register,
handleSubmit
}=useForm();

const onSubmit=
async(data:any)=>{

try{

await axios.post(
"http://localhost:5000/api/interview/create",
data
);

alert(
"Interview Created"
);

}catch(error){

console.log(error);

}

};

return(

<div
className="p-8"
>

<h1
className="text-3xl font-bold mb-6"
>

Create Interview

</h1>

<form
onSubmit={
handleSubmit(onSubmit)
}
className="space-y-4"
>

<input
{...register("title")}
placeholder="Interview Title"
className="border p-3 rounded w-full"
/>

<select
{...register("category")}
className="border p-3 rounded w-full"
>

<option>

Frontend

</option>

<option>

Backend

</option>

<option>

React

</option>

<option>

Node

</option>

</select>

<select
{...register("difficulty")}
className="border p-3 rounded w-full"
>

<option>

Easy

</option>

<option>

Medium

</option>

<option>

Hard

</option>

</select>

<button
className="bg-blue-600 text-white px-6 py-3 rounded"
>

Create

</button>

</form>

</div>

);

}

export default CreateInterview;