import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import Card from "../../../products/components/Card/Card";
import Loader from "../../../../components/Loader/Loader";
import HomeSlider from "../../components/HomeSlider";
import CategorySlider from "../../../products/components/CategorySlider/CategorySlider";


export default function Home() {

  const [products, setProducts] = useState<any[] | null>(null);


  async function fetchData() {
    let response = await api.get("/product");
    setProducts(response.data);
  }

  useEffect(() => { fetchData() }, [])

  return (
    <>
      <HomeSlider />
      <CategorySlider />
      {!products ? <Loader /> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {products.map((product) => <Card product={product} key={product._id} />)}
      </div>}

    </>
  )
}