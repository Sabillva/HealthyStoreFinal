import { useEffect, useState } from "react";
import api from "../services/api";

function AdminOrdersPage() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const response =
        await api.get(
          "/api/orders"
        );

      setOrders(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const updateStatus = async (
    orderId,
    status
  ) => {

    try {

      await api.put(
        `/api/orders/${orderId}/status`,
        {
          status
        }
      );

      fetchOrders();

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
        Admin Orders
      </h1>

      {orders.length === 0 && (

        <p>
          No orders yet
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
            Customer:
            {" "}
            {order.userName}
          </p>

          <p>
            Date:
            {" "}
            {order.createdAt}
          </p>

          <p>
            Total:
            {" "}
            $
            {order.totalPrice}
          </p>

          <p>
            Status:
            {" "}
            <strong>
              {order.status}
            </strong>
          </p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(
                order.id,
                e.target.value
              )
            }
          >
            <option value="PENDING">
              PENDING
            </option>

            <option value="CONFIRMED">
              CONFIRMED
            </option>

            <option value="SHIPPED">
              SHIPPED
            </option>

            <option value="DELIVERED">
              DELIVERED
            </option>
          </select>

          <h4>
            Items
          </h4>

          {order.items.map(item => (

            <div
              key={item.productName}
            >

              {item.productName}
              {" - "}
              Qty:
              {" "}
              {item.quantity}
              {" - $"}
              {item.price}

            </div>

          ))}

        </div>

      ))}

    </div>

  );
}

export default AdminOrdersPage;