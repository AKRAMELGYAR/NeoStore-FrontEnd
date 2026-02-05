import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ConfirmEmail() {
    const location = useLocation();
    const email = location.state?.email || "";
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleVerifyOtp = async (otp: string) => {
        const toastId = toast.loading("Verifying OTP...");
        try {
            const response = await api.post("/users/confirmEmail", { email, otp });
            if (response.status === 201) {
                toast.success("Email confirmed successfully!");
                console.log("Email confirmed successfully!");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error: any) {
            toast.error(error.message || "OTP verification failed");
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <>
            <div className=" flex flex-col items-center bg-gray-600 text-white p-4 rounded-md shadow-md max-w-xl mt-10 mb-10 my-auto mx-auto gap-4">
                <h1 className="text-center font-bold text-2xl text-black">Enter OTP</h1>
                <p>We sent an OTP to: <b>{email}</b></p>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-white rounded-md py-2 px-4 text-black shadow-md border border-gray-300" type="text" placeholder="Enter OTP here" />
                <button onClick={() => { handleVerifyOtp(otp) }} className="bg-black text-white rounded-md py-2 px-4 font-semibold my-4" type="submit">Verify OTP</button>
            </div>
        </>
    )
}