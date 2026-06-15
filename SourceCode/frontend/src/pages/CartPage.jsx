import { useContext } from "react";
import {
  CartContext
} from "../context/CartContext";
import api from "../services/api";
import {
  auth
} from "../firebase/firebase";

function CartPage() {

  const {
  cartItems,
  removeFromCart,
  clearCart
} = useContext(
  CartContext
);

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );

    const checkout = async () => {

  try {

    const response =
      await api.post(
        `/api/checkout?amount=${totalPrice}`
      );

    window.location.href =
      response.data.url;

  } catch (error) {

    console.error(error);

  }

};

    const handleCheckout = async () => {

  try {

    const requestBody = {

      userName:
  auth.currentUser?.email,

      items: cartItems.map(item => ({

        productId: item.id,
        quantity: item.quantity

      }))

    };

    const response =
      await api.post(
        "/api/orders",
        requestBody
      );

    alert(
      "Order created successfully"
    );

    console.log(response.data);

    clearCart();

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Checkout failed"
    );

  }
};

    console.log(cartItems);

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>
        Shopping Cart
      </h1>

      {cartItems.length === 0 && (

        <p>
          Cart is empty
        </p>

      )}

      {cartItems.map(item => (

        <div
          key={item.id}
          style={{
            border:
              "1px solid gray",
            marginBottom:
              "10px",
            padding: "10px"
          }}
        >

          <h3>
            {item.name}
          </h3>

          <p>
            Quantity:
            {" "}
            {item.quantity}
          </p>

          <p>
            Price:
            {" "}
            $
            {item.price}
          </p>

          <button
            onClick={() =>
              removeFromCart(
                item.id
              )
            }
          >
            Remove
          </button>

        </div>

      ))}

      <h2>

        Total:
        {" "}
        $
        {totalPrice.toFixed(2)}

      </h2>
      <button
  onClick={checkout}
>
  Pay With Card
</button>

      <br />

      <a href="/orders">
        My Orders
      </a>

      <button
  onClick={handleCheckout}
>
  Place Order
</button>

    </div>
  );
}

export default CartPage;