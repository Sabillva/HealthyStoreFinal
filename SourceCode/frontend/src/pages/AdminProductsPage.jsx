import { useEffect, useState } from "react";
import api from "../services/api";

function AdminProductsPage() {

  const [products, setProducts] =
    useState([]);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response =
        await api.get(
          "/api/products"
        );

      setProducts(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  };

  const createProduct = async () => {

    try {

      await api.post(
        "/api/products",
        {
          name,
          description,
          price:
            Number(price),
          stock:
            Number(stock),
          imageUrl,
          category
        }
      );

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
      setCategory("");

      fetchProducts();

    } catch (error) {

      console.error(error);

    }
  };

  const updateProduct = async () => {

    try {

      await api.put(
        `/api/products/${editingId}`,
        {
          name,
          description,
          price:
            Number(price),
          stock:
            Number(stock),
          imageUrl,
          category
        }
      );

      setEditingId(null);

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
      setCategory("");

      fetchProducts();

    } catch (error) {

      console.error(error);

    }
  };

  const deleteProduct = async (
    id
  ) => {

    try {

      await api.delete(
        `/api/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>
        Admin Products
      </h1>

      <h2>
        {editingId
          ? "Edit Product"
          : "Add Product"}
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) =>
          setStock(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) =>
          setImageUrl(
            e.target.value
          )
        }
      />

      <br /><br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
      />

      <br /><br />

      <button
        onClick={
          editingId
            ? updateProduct
            : createProduct
        }
      >

        {editingId
          ? "Update Product"
          : "Create Product"}

      </button>

      <hr />

      <h2>
        Product List
      </h2>

      {products.map(product => (

        <div
          key={product.id}
          style={{
            border:
              "1px solid gray",
            padding: "10px",
            marginBottom:
              "10px"
          }}
        >

          <h3>
            {product.name}
          </h3>

          <p>
            Category:
            {" "}
            {product.category}
          </p>

          <p>
            Price:
            {" "}
            $
            {product.price}
          </p>

          <p>
            Stock:
            {" "}
            {product.stock}
          </p>

          <button
            onClick={() => {

              setEditingId(
                product.id
              );

              setName(
                product.name
              );

              setDescription(
                product.description
              );

              setPrice(
                product.price
              );

              setStock(
                product.stock
              );

              setImageUrl(
                product.imageUrl
              );

              setCategory(
                product.category
              );

            }}
          >
            Edit
          </button>

          {" "}

          <button
            onClick={() =>
              deleteProduct(
                product.id
              )
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default AdminProductsPage;