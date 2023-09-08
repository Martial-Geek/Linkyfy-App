"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";

function RegisterForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleChange = async (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok && response.status === 201) {
        console.log("Register Request Successful");
        router.push("/signin");
      } else if (response.status === 302) {
        const data = await response.json();
        router.push(`/signin?message=${data.message}`);
      } else if (response.status === 400) {
        const data = await response.json();
        alert(data.message);
      } else {
        console.log("Register request unsuccessful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      {!session && (
        <form className="mt-10 w-96 flex flex-col gap-5 glassmorphism">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Name
            </span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form_input"
              onChange={handleChange}
              value={formData.name}
            />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Phone Number
            </span>
            <input
              type="text"
              name="phone"
              placeholder="Phone No"
              className="form_input"
              onChange={handleChange}
              value={formData.phone}
            />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Email/Username
            </span>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="form_input"
              onChange={handleChange}
              value={formData.email}
            />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form_input"
              onChange={handleChange}
              value={formData.password}
            />
          </label>
          <button
            type="submit"
            className="px-5 py-1.5 w-full mx-auto text-sm bg-primary-orange rounded-full text-white"
            onClick={handleRegister}
          >
            Register
          </button>
          <hr />
          <span className="font-satoshi text-sm text-slate-600 mx-auto my-auto">
            Already a user?
          </span>
          {providers &&
            Object.values(providers)
              .filter((provider) => provider.name !== "Credentials")
              .map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn space-x-4"
                >
                  <img src="/google-logo.svg" alt="lol" />
                  <div>Sign in with {provider.name}</div>
                </button>
              ))}
          <span>
            <Link href="/signin" className="black_btn">
              Sign In with Credentials
            </Link>
          </span>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;
