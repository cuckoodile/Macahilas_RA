import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import getProductAPI from "../api/product/getProductsAPI";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // const [getter, setter] = usestate(Default Value)

  // let product = ['ian', 'macahilas']

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductAPI();

        setProducts(data);
      } catch (error) {
        setError(true);
        console.log("ERROR: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  /**
   * useEffect(() => {
   *    Code block
   * }, [])
   *
   * onMount
   * onDependencyUpdate
   * onUnmount
   */

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="h-[300vh] flex flex-col items-center px-10">
      <p className="text-5xl font-bold my-10">Products</p>

      <div className="w-full flex justify-center gap-3 flex-wrap">
        {products?.map((item) => (
          <Card key={item?.id} data={item} />
        ))}
      </div>
    </div>
  );
}
