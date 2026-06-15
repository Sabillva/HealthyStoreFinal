import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function HomePage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts = async () => {

    try {

      const data = await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div>

      <h1>Healthy Store</h1>

      {products.map(product => (

        <div key={product.id}>

          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>{product.price} ₺</p>

          <p>Stock: {product.stock}</p>

          <img
            src={product.imageUrl}
            width="200"
            alt={product.name}
          />

        </div>

      ))}

    </div>
  );
}

export default HomePage;