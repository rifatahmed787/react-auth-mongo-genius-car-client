import React, { useEffect, useState } from "react";

const OrderRow = ({ order, handleDelete, hanldeStatusUpdate }) => {
  const { _id, serviceName, price, customer, service, phone, status } = order;
  const [orderService, setOrderService] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/services/${service}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrderService(data));
  }, [service]);

  return (
    <tr>
      <th>
        <label>
          <button onClick={() => handleDelete(_id)} className="btn btn-ghost">
            X
          </button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {orderService?.img && (
                <img
                  src={orderService.img}
                  alt="Avatar Tailwind CSS Component"
                />
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <div className="text-sm opacity-50">{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="badge badge-ghost badge-sm">${price}</span>
      </td>

      <th>
        <button
          onClick={() => hanldeStatusUpdate(_id)}
          className=" text-orange-600"
        >
          {status ? status : "Pending..."}
        </button>
      </th>
    </tr>
  );
};

export default OrderRow;
