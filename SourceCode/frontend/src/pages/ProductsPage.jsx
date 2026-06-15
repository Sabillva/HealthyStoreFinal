import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ProductsPage() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] =
  useState("");

const [selectedCategory,
  setSelectedCategory] =
  useState("ALL");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response =
        await api.get("/api/products");

      setProducts(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const filteredProducts =
  products.filter(product => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =
      selectedCategory === "ALL"
      ||
      product.category ===
      selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );

  });

  return (

    <div>

      <h1>Products</h1>

      <input
  type="text"
  placeholder="Search product..."
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
/>

<div
  style={{
    marginTop: "10px",
    marginBottom: "20px"
  }}
>

  <button
    onClick={() =>
      setSelectedCategory(
        "ALL"
      )
    }
  >
    All
  </button>

  <button
    onClick={() =>
      setSelectedCategory(
        "Protein"
      )
    }
  >
    Protein
  </button>

  <button
    onClick={() =>
      setSelectedCategory(
        "Snacks"
      )
    }
  >
    Snacks
  </button>

  <button
    onClick={() =>
      setSelectedCategory(
        "Vitamins"
      )
    }
  >
    Vitamins
  </button>

</div>

      {filteredProducts.map(product => (

        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >

          <Link
            to={`/products/${product.id}`}
          >
            <h3>{product.name}</h3>
          </Link>

          <p>{product.description}</p>

          <p>
            Price: ${product.price}
          </p>

          <p>
            Stock: {product.stock}
          </p>

        </div>

      ))}

    </div>
  );
}

export default ProductsPage;