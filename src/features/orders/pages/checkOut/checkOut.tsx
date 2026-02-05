import { useState } from "react";
import orderService from "../../api/orderService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("card");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await orderService.createOrder(phone, address, paymentMethod)

            if (response.status !== 201) {
                toast.error(response.data.message)
                return
            }

            if (paymentMethod === "cash") {
                toast.success("Order placed successfully");
                navigate("/home");
                return;
            }

            const paymentResponse = await orderService.createPayment(response.data.order._id)

            if (paymentResponse.status !== 201) {
                toast.error(paymentResponse.data.message);
                return;
            }

            window.location.href = paymentResponse.data.url;

        } catch {
            toast.error("something went wrong")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-8">

                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-800">
                    Checkout
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="01xxxxxxxxx"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Street, Building, City"
                            rows={3}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    {/* Payment Method */}
                    <div>
                        <p className="block text-sm font-medium text-gray-700 mb-3">
                            Payment Method
                        </p>

                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-black">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={paymentMethod === "cash"}
                                    onChange={() => setPaymentMethod("cash")}
                                />
                                <div>
                                    <p className="font-medium">Cash on Delivery</p>
                                    <p className="text-sm text-gray-500">
                                        Pay when you receive the order
                                    </p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-black">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="CARD"
                                    checked={paymentMethod === "card"}
                                    onChange={() => setPaymentMethod("card")}
                                />
                                <div>
                                    <p className="font-medium">Visa / Card</p>
                                    <p className="text-sm text-gray-500">
                                        Secure online payment
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition cursor-pointer"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
}
