import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  useContext
} from "react";

import {
  CartContext
} from "../context/CartContext";

function ProductDetailsPage() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [questions, setQuestions] =
    useState([]);

    const [reviewUserName, setReviewUserName] =
  useState("");

const [reviewRating, setReviewRating] =
  useState(5);

const [reviewComment, setReviewComment] =
  useState("");

  const [questionUserName, setQuestionUserName] =
  useState("");

const [questionText, setQuestionText] =
  useState("");

  const { addToCart } =
  useContext(CartContext);

  useEffect(() => {

    fetchProduct();

    fetchReviews();

    fetchQuestions();

  }, [id]);

  const submitReview = async () => {

  try {

    await api.post(
      `/api/products/${id}/reviews`,
      {
        userName: reviewUserName,
        rating: reviewRating,
        comment: reviewComment
      }
    );

    setReviewUserName("");
    setReviewRating(5);
    setReviewComment("");

    fetchReviews();

  } catch (error) {

    console.error(error);

  }
};

const submitQuestion = async () => {

  try {

    await api.post(
      `/api/products/${id}/questions`,
      {
        userName: questionUserName,
        question: questionText
      }
    );

    setQuestionUserName("");
    setQuestionText("");

    fetchQuestions();

  } catch (error) {

    console.error(error);

  }
};

  const fetchProduct = async () => {

    try {

      const response =
        await api.get(
          `/api/products/${id}`
        );

      setProduct(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const fetchReviews = async () => {

    try {

      const response =
        await api.get(
          `/api/products/${id}/reviews`
        );

      setReviews(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const fetchQuestions = async () => {

    try {

      const response =
        await api.get(
          `/api/products/${id}/questions`
        );

      setQuestions(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  if (!product) {

    return <h2>Loading...</h2>;

  }

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>
        {product.name}
      </h1>

      <img
        src={product.imageUrl}
        alt={product.name}
        width="300"
      />

      <p>
        {product.description}
      </p>

      <p>
        Price: ${product.price}
      </p>

      <p>
        Stock: {product.stock}
      </p>

      <button
        onClick={() =>
          addToCart(product)
        }
      >
        Add to Cart
      </button>
      <Link to="/cart">
  Go To Cart
</Link>

      <hr />

      <h2>
        Reviews
      </h2>

      <div
  style={{
    marginBottom: "20px"
  }}
>

  <input
    placeholder="Your Name"
    value={reviewUserName}
    onChange={(e) =>
      setReviewUserName(
        e.target.value
      )
    }
  />

  <br />
  <br />

  <input
    type="number"
    min="1"
    max="5"
    value={reviewRating}
    onChange={(e) =>
      setReviewRating(
        Number(e.target.value)
      )
    }
  />

  <br />
  <br />

  <textarea
    placeholder="Your Review"
    value={reviewComment}
    onChange={(e) =>
      setReviewComment(
        e.target.value
      )
    }
  />

  <br />
  <br />

  <button
    onClick={submitReview}
  >
    Submit Review
  </button>

</div>

      {reviews.length === 0 && (

        <p>
          No reviews yet
        </p>

      )}

      {reviews.map(review => (

        <div
  key={review.id}
  style={{
    border: "1px solid gray",
    padding: "10px",
    marginBottom: "10px"
  }}
>

  <strong>
    {review.userName}
  </strong>

  <p>

    {"⭐".repeat(
      review.rating
    )}

    {"☆".repeat(
      5 - review.rating
    )}

  </p>

  <p>
    {review.comment}
  </p>

</div>

      ))}

      <hr />

      <h2>
        Questions & Answers
      </h2>

      <div
  style={{
    marginBottom: "20px"
  }}
>

  <input
    placeholder="Your Name"
    value={questionUserName}
    onChange={(e) =>
      setQuestionUserName(
        e.target.value
      )
    }
  />

  <br />
  <br />

  <textarea
    placeholder="Ask a question..."
    value={questionText}
    onChange={(e) =>
      setQuestionText(
        e.target.value
      )
    }
  />

  <br />
  <br />

  <button
    onClick={submitQuestion}
  >
    Ask Question
  </button>

</div>

      {questions.length === 0 && (

        <p>
          No questions yet
        </p>

      )}

      {questions.map(question => (

        <div
          key={question.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <strong>
            {question.userName}
          </strong>

          <p>
            Q: {question.question}
          </p>

          {question.answer ? (

            <p>
              A: {question.answer}
            </p>

          ) : (

            <p>
              Waiting for answer...
            </p>

          )}

        </div>

      ))}

    </div>

  );
}

export default ProductDetailsPage;