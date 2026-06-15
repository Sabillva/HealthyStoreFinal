import { useEffect, useState } from "react";
import api from "../services/api";

function AdminPage() {

  const [products, setProducts] =
    useState([]);

    const [questions, setQuestions] =
  useState([]);

const [answers, setAnswers] =
  useState({});

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

  useEffect(() => {

  fetchProducts();

  fetchQuestions();

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

  const fetchQuestions = async () => {

  try {

    const response =
      await api.get(
        "/api/questions"
      );

    setQuestions(
      response.data
    );

  } catch (error) {

    console.error(error);

  }
};

  const deleteProduct = async (id) => {

    try {

      await api.delete(
        `/api/products/${id}`
      );

      fetchProducts();

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
          imageUrl,
          price: Number(price),
          stock: Number(stock)
        }
      );

      setName("");
      setDescription("");
      setImageUrl("");
      setPrice("");
      setStock("");

      fetchProducts();

    } catch (error) {

      console.error(error);

    }
  };

  const answerQuestion = async (
  questionId
) => {

  try {

    await api.put(
      `/api/questions/${questionId}/answer`,
      {
        answer:
          answers[questionId]
      }
    );

    fetchQuestions();

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
        Admin Dashboard
      </h1>

      <h2>
        Create Product
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
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

      <button
        onClick={createProduct}
      >
        Create Product
      </button>

      <hr />

      <h2>
        Products
      </h2>

      {products.map(product => (

        <div
          key={product.id}
          style={{
            border:
              "1px solid gray",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>
            {product.name}
          </h3>

          <p>
            ${product.price}
          </p>

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

      <hr />

<h2>
  Questions
</h2>

{questions.map(question => (

  <div
    key={question.id}
    style={{
      border:
        "1px solid gray",
      padding: "10px",
      marginBottom: "10px"
    }}
  >

    <strong>
      {question.userName}
    </strong>

    <p>
      Q:
      {" "}
      {question.question}
    </p>

    {question.answer ? (

      <p>
        A:
        {" "}
        {question.answer}
      </p>

    ) : (

      <>

        <textarea
          placeholder="Write answer..."
          value={
            answers[
              question.id
            ] || ""
          }
          onChange={(e) =>
            setAnswers({
              ...answers,
              [question.id]:
                e.target.value
            })
          }
        />

        <br />

        <button
          onClick={() =>
            answerQuestion(
              question.id
            )
          }
        >
          Answer
        </button>

      </>

    )}

  </div>

))}

    </div>

  );
}

export default AdminPage;