import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../Helpers/auth.helper";

const initialState = {
  email: "",
  password: "",
};

const SigninForm = () => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignIn() {
    try {
      const { data, error } = await logIn(inputState);
      console.log(error);
      if (error) {
        setErrors(error);
        return;
      }
      if (data) {
        console.log(data);
        setErrors("");
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setErrors("incorrect email or password");
    }
  }

  const { email, password } = inputState;

  return (
    <div className="w-full h-screen flex items-center justify-center background">
      <div className="min-w-96 w-96 bg-white p-5 py-7 rounded-md">
        <h2 className="text-xl uppercase text-center">
          Sign In to Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Please sign in order to explore books that you love{" "}
        </p>
        <div className="mt-7">
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
            className="p-2 outline-none border border-gray-700 w-full focus:border-yellow-700 rounded-sm bg-gray-100"
          />
        </div>
        <div className="mt-3">
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
            onClick={() => handleSignIn()}
            className="px-3 py-1 outline-none bg-yellow-700 hover:opacity-75 rounded-sm text-white self-center"
          >
            Sign in
          </button>
        </div>
        <div>
          <p className="text-center mt-10">
            Don't have an account ?
            <span
              onClick={() => navigate("/signup")}
              className="text-yellow-700 hover:underline cursor-pointer"
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
