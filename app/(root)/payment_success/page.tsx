'use client'

import useCart from '@/lib/hooks/useCart'
import Link from 'next/link'
import React, { useEffect } from 'react'

const SuccessulPayment = () => {

    const cart = useCart()

    useEffect(() => {
        cart.clearCart()
    }, [])

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5 bg-gradient-to-l from-slate-100 to-stone-300'>
            <p className='text-heading4-bold text-green-500'>Seccessful payment</p>
            <p>Thank you for your purchase</p>
            <Link href="/" className='p-4 text-base-bold bg-gradient-to-r from-purple-400 to-red-500 rounded-xl text-white'>CONTINUE TO SHOPPING</Link>
        </div>
    )
}

export default SuccessulPayment
