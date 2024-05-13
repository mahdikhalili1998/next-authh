import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Signup() {
  const [info, setInfo] = useState({ email: "", password: "" });
  const router = useRouter();
  const { data, status } = useSession();
  useEffect(() => {
    {
      status === "authenticated" ? router.replace("/dashbord") : null;
    }
  }, [status]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/auth/signup", { info })
      .then((res) => {
        res.status === 201 ? router.replace("/signin") : null;
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        className="rounded-xl border-2 border-blue-600 px-2 py-1 text-center"
        type="email"
        value={info.email}
        placeholder="Email ..."
        name="email"
        onChange={(e) => changeHandler(e)}
      />
      <input
        className="rounded-xl border-2 border-blue-600 px-2 py-1 text-center"
        type="password"
        value={info.password}
        placeholder="Password ..."
        name="password"
        onChange={(e) => changeHandler(e)}
      />
      <button
        type="submit"
        className="rounded-xl bg-pink-600 px-2 py-1 text-center text-white"
      >
        sign up
      </button>
    </form>
  );
}

export default Signup;
