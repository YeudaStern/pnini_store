import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8 w-full">
          {collections.map((collection: CollectionType) => (
            <Link className="group" href={`/collections/${collection._id}`} key={collection._id}>
              <div className="relative rounded-lg cursor-pointer h-60">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={350}
                  height={20}
                  className="object-cover h-60 rounded-lg drop-shadow-lg  group-hover:opacity-75"
                />
                <p className="absolute bottom-0 left-0  bg-white text-black p-2 rounded-l-lg rounded-t-none border-gray-200 border-l">
                  {collection.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
