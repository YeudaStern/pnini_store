'use client'

import Loader from "@/components/Loader"
import ProductCard from "@/components/ProductCard"
import { getProductDetails } from "@/lib/actions/actions"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

const Wishlist = () => {

    const { user } = useUser()
    const [loading, setLoading] = useState(true)
    const [signInUser, setSignInUser] = useState<UserType | null>(null)
    const [wishlist, setWishlist] = useState<ProductType[]>([])

    const getUser = async () => {
        try {
            const res = await fetch("/api//users")
            const data = await res.json()

            setSignInUser(data)
            setLoading(false)

        } catch (error) {
            console.log("user GET", error);
        }
    }

    useEffect(() => {
        if (user) {
            getUser()
        }
    }, [user])

    const getWishListProduct = async () => {
        setLoading(true)

        if (!signInUser) {
            return
        }

        const wishlistProduct = await Promise.all(signInUser.wishlist.map(async (productId) => {
            const res = await getProductDetails(productId)
            return res
        }))

        setWishlist(wishlistProduct)
        setLoading(false)
    }

    useEffect(() => {
        if (signInUser) {
            getWishListProduct()
        }
    }, [signInUser])

    const updateSignInUser = (updatedUser: UserType) =>{
        setSignInUser(updatedUser)
    }



    return loading ? <Loader /> : (
        <div className="px-10 py-5">
            <p className="text-heading3-bold my-10">
                Your Wishlist
            </p>
            {wishlist.length === 0 && (
                <p>No items in your wishlist</p>
            )}

            <div className="flex flex-wrap justify-center gap-16">
                {wishlist.map((product) => (
                    <div>
                        {loading? <Loader/> : (
                            <ProductCard key={product._id} product={product} updateSignInUser={updateSignInUser}/>   
                        )}
                         
                    </div>
                
                ))}
            </div>
        </div>
    )
}

export const dynamic = "force-dynamic";

export default Wishlist
