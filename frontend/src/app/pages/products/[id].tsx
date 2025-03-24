import { GetServerSideProps } from "next";
import type { ProductFullInfo } from "../../types/ProductFullInfo";
import Image from "next/image";

type Props = {
  product: ProductFullInfo;
};

export default function SingleProduct({ product }: Props) {
  return (
    <div>
      <h1>{product.brand} {product.name}</h1>

      {product.colorOptions.length > 0 && (
        <Image
          src={product.colorOptions[0].imageUrl}
          alt={product.name}
          width={400}
          height={400}
        />
      )}

      <p>{product.description}</p>
      <p>From: {product.basePrice} EUR</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const res = await fetch(`http://localhost:5000/shop/${id}`, {
    headers: {
      "x-api-key": "87909682e6cd74208f41a6ef39fe4191",
      accept: "application/json",
    },
  });

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const product = await res.json();

  return {
    props: { product },
  };
};
