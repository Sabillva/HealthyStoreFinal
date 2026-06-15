import { useEffect, useState } from "react";
import api from "../services/api";
import {
  auth
} from "../firebase/firebase";
import {
  onAuthStateChanged
} from "firebase/auth";

function OrdersPage() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const unsubscribe =
    onAuthStateChanged(
      auth,
      (user) => {

        if (user) {

          fetchOrders(
            user.email
          );

        }

      }
    );

  return () =>
    unsubscribe();

}, []);

  const fetchOrders = async (
  email
) => {

  try {

    const response =
      await api.get(
        `/api/orders/history/${email}`
      );

    setOrders(
      response.data
    );

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
        My Orders
      </h1>

      {orders.length === 0 && (

        <p>
          No orders found
        </p>

      )}

      {orders.map(order => (

        <div
          key={order.id}
          style={{
            border:
              "1px solid gray",
            padding: "15px",
            marginBottom: "15px"
          }}
        >

          <h3>
            Order #{order.id}
          </h3>

          <p>
            Date:
            {" "}
            {order.createdAt}
          </p>

          <p>
            Total:
            {" "}
            $
            {order.totalPrice ?? 0}
          </p>

          <h4>
            Items
          </h4>

          {order.items.map(item => (

            <div
              key={
                item.productName
              }
            >

              {item.productName}
              {" - "}
              Qty:
              {" "}
              {item.quantity}
              {" - "}
              $
              {item.price}

            </div>

          ))}

        </div>

      ))}

    </div>

  );
}

export default OrdersPage;