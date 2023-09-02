"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function SignInForm({ onChange, onSubmit }) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);

  return (
    <div>
      {!session ? (
        <form
          onSubmit={onSubmit}
          className="mt-10 w-full max-w-3xl flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Name
            </span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form_input"
              onChange={onChange}
              // value={formData.username}
            />
          </label>

          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Phone Number
            </span>
            <input
              type="text"
              name="phone"
              placeholder="Password"
              className="form_input"
              onChange={onChange}
              // value={formData.password}
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
              onChange={onChange}
              // value={formData.username}
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
              onChange={onChange}
              // value={formData.password}
            />
          </label>

          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            Sign in
          </button>
        </form>
      ) : (
        <p>Welcome, {session.user.name}!</p>
      )}
    </div>
  );
}

export default SignInForm;
