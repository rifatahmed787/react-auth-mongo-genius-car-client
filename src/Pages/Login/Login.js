import React from "react";
import { Link } from "react-router-dom";
import svg from "../../assets/images/login/login.svg";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
  };
  return (
    <div className="hero w-full bg-base-200 my-20 rounded-lg">
      <div className="hero-content grid md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={svg} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                required
                name="email"
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                required
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <Link href="" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="text" value="Log In" />
            </div>
          </form>
          <p className="text-center mb-5 ">
            New to genius car please{" "}
            <Link className="font-bold text-orange-600" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
