

export default function OrderCard({ order }: any) {
    return (
        <>
            <div className="container max-w-6xl mx-auto bg-gray-50 p-6 rounded-md shadow-md border border-gray-200 flex flex-col gap-3 ">
                <div className="info flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-bag-shopping text-lg"></i>
                        <p className="text-md md:text-lg lg:text-xl font-semibold">{order._id}</p>
                    </div>
                    <div className="status bg-green-200 px-4 py-1 mx-2 rounded-lg">
                        <p className="text-sm font-semibold">{order.status}</p>
                    </div>
                </div>
                <div className="arrivesAt w-fit flex self-center items-center gap-2 px-3 rounded-lg border border-gray-200 inline-flex">
                    <p className="text-sm text-gray-500">Estimated arrival: </p>
                    <p className="text-sm text-gray-500">{new Date(order.arrivesAt).toLocaleDateString()}</p>
                </div>
                {order.items.map((item: any) => (
                    <div key={item._id} className="productInfo max-w-6xl mx-auto rounded-lg shadow-md border border-gray-200 flex gap-5 items-center w-full">
                        <div className="image">
                            <img className='w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-xl overflow-hidden bg-gray-100 shadow-md ring-1 ring-gray-200' src={item.mainImage} alt={item.name} />
                        </div>
                        <div className="productInfo">
                            <p className='font-semibold'>{item.name}</p>
                            <p className='font-semibold'>EGP {item.subPrice}<span className='text-sm text-gray-500'> x {item.quantity}</span></p>
                        </div>
                    </div>
                ))}

                <hr className='text-gray-300' />
                <div className="total">
                    <h1 className='font-semibold'>Total: {order.totalPrice}</h1>
                </div>
            </div>
        </>
    )
}