import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import "./CheckOut.css";

const CheckOut = () => {
  const { price, _id, title } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    if (phone.length < 10) {
      alert("Phone number should be 10 character long");
    }

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Order placed successfully");
          form.reset();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div>
        <h1 className="text-5xl font-bold text-center">{title}</h1>
        <p className="text-3xl font-semibold text-center mt-5">
          Price: ${price}
        </p>
      </div>
      <form onSubmit={handlePlaceOrder} className="p-40 checkout-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered input-accent w-full"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered input-accent w-full"
          />
          <input
            required
            name="phone"
            type="text"
            placeholder="Your Phone"
            className="input input-bordered input-accent w-full"
          />
          <input
            defaultValue={user?.email}
            name="email"
            type="text"
            placeholder="Your Email"
            className="input input-bordered input-accent w-full"
          />
        </div>
        <div className="mt-10">
          <textarea
            required
            name="message"
            className="textarea textarea-accent textarea-block w-full h-40"
            placeholder="Your Message"
          ></textarea>
        </div>
        <div>
          <button className="btn btn-success btn-block mt-5">
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
