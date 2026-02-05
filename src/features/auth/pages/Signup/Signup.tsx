import { useForm, type SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import type { IFormInput } from "../../../../shared/types"
import api from "../../../../api/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "./validaion/signup.schema"
import { useNavigate } from "react-router-dom"

export default function Signup() {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const toastId = toast.loading("Registering...");
    try {
      let response = await api.post("/users/signup", data);
      if (response.status === 201) {
        toast.success(response.data.message)
        setTimeout(() => {
          navigate("/confirm-email", { state: { email: data.email } });
        }, 2000)
      }

    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <>
      <div className="container mx-auto bg-gray-600 text-white p-4 rounded-md shadow-md max-w-xl mt-10 mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center font-bold text-2xl">Register Now</h1>
          <div className="flex flex-col gap-4 mt-6">
            <label>name:</label>
            <input {...register("name")} className="bg-white rounded-md py-2 px-4 text-black shadow-md border border-gray-300" type="text" id="name" name="name" placeholder="Enter Your Name" required />
            {errors.name && (<p className="text-red-400 text-sm">{errors.name.message}</p>)}


            <label>email:</label>
            <input {...register("email")} className="bg-white rounded-md py-2 px-4 text-black shadow-md border border-gray-300" type="email" id="email" name="email" placeholder="Enter Your Email" required />
            {errors.email && (<p className="text-red-400 text-sm">{errors.email.message}</p>)}


            <label>password:</label>
            <input {...register("pass")} className="bg-white rounded-md py-2 px-4 text-black shadow-md border border-gray-300" type="password" id="pass" name="pass" placeholder="Enter Your Password" required />
            {errors.pass && (<p className="text-red-400 text-sm">{errors.pass.message}</p>)}


            <label>confirm password:</label>
            <input {...register("cpass")} className="bg-white rounded-md py-2 px-4 text-black shadow-md border border-gray-300" type="password" id="cpass" name="cpass" placeholder="Confirm Your Password" required />
            {errors.cpass && (<p className="text-red-400 text-sm">{errors.cpass.message}</p>)}


            <label>phone:</label>
            <input {...register("phone")} className="bg-white rounded-md py-2 px-4 text-black shadow-md border border-gray-300" type="tel" id="phone" name="phone" placeholder="Enter Your Phone Number" required />
            {errors.phone && (<p className="text-red-400 text-sm">{errors.phone.message}</p>)}


            <label>date of birth:</label>
            <input {...register("DOB")} className="bg-white rounded-md py-2 px-4 text-black shadow-md border border-gray-300" type="date" id="DOB" name="DOB" required />
            {errors.DOB && (<p className="text-red-400 text-sm">{errors.DOB.message}</p>)}


            <label>gender:</label>
            <select {...register("gender")} className="bg-white rounded-md py-2 px-4 text-black shadow-md border border-gray-300" id="gender" name="gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (<p className="text-red-400 text-sm">{errors.gender.message}</p>)}


            <label>address:</label>
            <input {...register("address")} className="bg-white rounded-md py-2 px-4 text-black shadow-md border border-gray-300" type="text" id="address" name="address" placeholder="Enter Your Address" required />
            {errors.address && (<p className="text-red-400 text-sm">{errors.address.message}</p>)}


            <button className="bg-black text-white rounded-md py-2 px-4 font-semibold my-4" type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}