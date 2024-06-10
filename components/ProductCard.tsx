'use client'

import Image from 'next/image'
import Link from 'next/link'
import HeartFavorite from './HeartFavorite'

interface ProductCardProps {
    product: ProductType;
    updateSignInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignInUser }: ProductCardProps) => {
    console.log(product);

    const mediaUrl = product.media && product.media.length > 0 ? product.media[0] : '/placeholder-image.png'; // Use a placeholder image if no media is available

    return (
        <Link href={`/products/${product._id}`} className='w-[220px] flex flex-col gap-2 max-sm:mx-auto group'>
            <Image
                src={mediaUrl}
                alt={product.title}
                width={250}
                height={300}
                className='h-[250px] rounded-lg group-hover:opacity-70'
            />
            <div>
                <p className='text-base-bold'>{product.title}</p>
                <p className='text-small-medium text-grey-2'>{product.category}</p>
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-body-bold'>${product.price}</p>
                <HeartFavorite product={product} updateSignInUser={updateSignInUser}/>
            </div>
        </Link>
    )
}

export default ProductCard
