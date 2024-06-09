import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";

const ProductDetails = async ({ params }: { params: { productId: string } }) => {

    const productDetails = await getProductDetails(params.productId)
    const relatedProduct = await getRelatedProducts(params.productId)
    console.log(productDetails);

    return (
        <>
            <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
                <Gallery productMedia={productDetails.media} />
                <ProductInfo productInfo={productDetails} />
            </div>
            <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
                <p className="flex flex-wrap gap-16 mx-auto mt-8">
                    {relatedProduct?.map((product: ProductType) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </p>
            </div>
        </>

    )
}

export const dynamic = "force-dynamic";

export default ProductDetails
