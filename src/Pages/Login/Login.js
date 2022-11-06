import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import svg from "../../assets/images/login/login.svg";
import { AuthContext } from "../../contexts/AuthProvider";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const [error, setError] = useState("");
  const { logIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    form.reset();

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user.email);

        const currentUser = {
          email: user.email,
        };

        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("genius-token", data.token);
          });

        navigate(from, { replace: true });
      })
      .catch((error) => setError(error.message));
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
              <p className="text-red-500">{error}</p>
              <label className="label">
                <Link href="" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button>
                <input className="btn btn-primary" type="text" value="Log In" />
              </button>
            </div>
          </form>
          <SocialLogin></SocialLogin>
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
