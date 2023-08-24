import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../Helpers/auth.helper";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const SignupForm = () => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handlesignUp() {
    const { data, error } = await register(inputState);
    if (error) {
      setErrors(error);
      return;
    }
    navigate("/");
  }

  const { name, email, password } = inputState;
  return (
    <div className="w-full h-screen flex items-center justify-center background">
      <div className="min-w-96 w-96 bg-white p-5 py-7 rounded-md">
        <h2 className="text-xl uppercase text-center">
          Sign In to Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Please sign in order to explore books that you love{" "}
        </p>
        <div className="form-group mt-7">
          <label htmlFor="name" className="text-sm text-yellow-700">
            ~ name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={onChange}
            value={name}
            placeholder="your name here"
            className="px-2 py-2 outline-none border border-gray-700 w-full focus:border-yellow-700 rounded-sm bg-gray-100"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="email" className="text-sm text-yellow-700">
            ~ email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={onChange}
            value={email}
            placeholder="email here"
            className="px-2 py-2 outline-none border border-gray-700 w-full focus:border-yellow-700 rounded-sm bg-gray-100"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password" className="text-sm text-yellow-700">
            ~ password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={onChange}
            value={password}
            placeholder="password here"
            className="px-2 py-2 outline-none border border-gray-700 w-full focus:border-yellow-700 rounded-sm bg-gray-100"
          />
        </div>
        <div className="error text-red-600 text-xs min-h-[14px] mt-2">
          {errors}
        </div>
        <div className="form-group mt-10">
          <button
            onClick={() => handlesignUp()}
            className="px-3 py-1 outline-none bg-yellow-700 hover:opacity-75 rounded-sm text-white self-center"
          >
            Sign Up
          </button>
        </div>
        <div>
          <p className="text-center mt-10">
            Already have an account ?
            <span
              onClick={() => navigate("/")}
              className="text-yellow-700 hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
