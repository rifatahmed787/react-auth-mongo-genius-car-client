import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setOrders(data);
      });
  }, [user?.email, logOut]);

  const handleDelete = (id) => {
    const processed = window.confirm("Are you sure want to delete?");
    if (processed) {
      fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
        //ata verifyJWT er headers method
        headers: {
          authorization: `Bearer ${localStorage.getItem("genius-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Deleted successfully");
            const remaining = orders.filter((odr) => odr._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  const hanldeStatusUpdate = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((odr) => odr !== id);
          const approving = orders.find((odr) => odr === id);
          approving.status = "Approved";

          const newOrder = [approving, ...remaining];
          setOrders(newOrder);
        }
      });
  };

  return (
    <div className="overflow-x-auto w-full pt-10 pb-40">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Service Name</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              handleDelete={handleDelete}
              hanldeStatusUpdate={hanldeStatusUpdate}
            ></OrderRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
