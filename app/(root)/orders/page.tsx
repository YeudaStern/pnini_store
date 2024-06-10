import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const Orders = async () => {
    const { userId } = auth();
    let orders = null;

    try {
        orders = await getOrders(userId as string);
        console.log(orders);
        if (orders.length > 0) {
            console.log(orders[0].products);
        }
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    }

    return (
        <div className="px-10 py-5 max-sm:px-3 bg-gradient-to-tr from-indigo-900">
            <p className="text-heading3-bold my-10">Your Orders</p>
            {!orders || orders.length === 0 ? (
                <p className="text-body-bold my-5">You have no orders yet.</p>
            ) : (
                <div className="flex flex-col gap-10">
                    {orders.map((order: OrderType) => (
                        <div
                            key={order._id}
                            className="flex flex-col gap-8 p-4 hover:bg-grey-1 border border-gray-600 shadow-lg rounded-lg"
                        >
                            <div className="flex flex-col gap-8 p-4 hover:bg-grey-1 backdrop-blur-sm bg-opacity-10">
                                <div className="flex gap-20 max-md:flex-col max-md:gap-3">
                                    <div className='flex gap-2'>
                                        <p className='text-base-medium text-grey-2 font-bold underline decoration-sky-500'>Order ID:</p>
                                        <p className='text-base-bold'>{order._id}</p>
                                    </div>
                                    <p className="text-base-bold">
                                        Total Amount: <strong>${order.totalAmount}</strong>
                                    </p>
                                </div>
                                <div className="flex flex-col gap-5">
                                    {order.products.map((orderItem: OrderItemType) => (
                                        <div key={orderItem.product?._id} className="flex gap-4">
                                            {orderItem.product?.media && orderItem.product.media.length > 0 && (
                                                <Image
                                                    src={orderItem.product.media[0]}
                                                    alt={orderItem.product.title}
                                                    width={100}
                                                    height={100}
                                                    className="w-32 h-32 object-cover rounded-lg"
                                                />
                                            )}
                                            <div className="flex flex-col justify-between">
                                                <div className='flex gap-2'>
                                                    <p className='text-base-medium text-grey-2 font-bold underline decoration-sky-500'>Title:</p>
                                                    <p className='text-base-bold'>{orderItem.product?.title}</p>
                                                </div>
                                                {orderItem.color && (
                                                    <div className='flex gap-2'>
                                                        <p className='text-base-medium text-grey-2 font-bold underline decoration-sky-500'>Color:</p>
                                                        <p className='text-base-bold'>{orderItem.color}</p>
                                                    </div>
                                                )}
                                                {orderItem.size && (
                                                    <div className='flex gap-2'>
                                                        <p className='text-base-medium text-grey-2 font-bold underline decoration-sky-500'>Size:</p>
                                                        <p className='text-base-bold'>{orderItem.size}</p>
                                                    </div>
                                                )}
                                                <div className='flex gap-2'>
                                                    <p className='text-base-medium text-grey-2 font-bold underline decoration-sky-500'>Price:</p>
                                                    <p className='text-base-bold'>{orderItem.product?.price}$</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p className='text-base-medium text-grey-2 font-bold underline decoration-sky-500'>Quantity:</p>
                                                    <p className='text-base-bold'>{orderItem.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

export const dynamic = "force-dynamic";
