import type { ILoginInput } from "../../../../shared/types"
import { useForm, type SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import api from "../../../../api/axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

export default function Login() {
  const { register, handleSubmit } = useForm<ILoginInput>()
  const { setToken } = useContext(UserContext)

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      let response = await api.post("/users/signin", data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/home");
        }, 2000)
      }

    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center gap-4 max-w-xl min-h-lg my-15 mx-auto bg-gray-600 text-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input {...register("email")} type="email" placeholder="Enter Your Email" className="bg-white text-black border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-xs" />
        <input {...register("pass")} type="password" placeholder="Enter Your Password" className="bg-white text-black border border-gray-300 rounded-md py-2 px-4 mb-4 w-full max-w-xs" />
        <button className="bg-black text-white rounded-md py-2 px-4 font-semibold w-xs">Log In</button>
      </div>
    </form>
  )
}