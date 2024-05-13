import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function SignIn() {
  const [info, setInfo] = useState({ email: "", password: "" });
  const { email, password } = info;
  // console.log(info);
  const { data, status } = useSession();
  const router = useRouter();

  // console.log(status)

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
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);
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
        sign in
      </button>
    </form>
  );
}

export default SignIn;
