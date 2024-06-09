
import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src="/resturant.jpg" alt="" width={2000} height={80} className="w-screen h-[500px] object-cover" />
      <Collections />
      <ProductList />
    </div>
  );
}


export const dynamic = "force-dynamic"