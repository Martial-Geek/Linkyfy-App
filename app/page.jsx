"use client";
import RegisterForm from "@components/RegisterForm";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <span className="blue_gradient">Welcome to</span>{" "}
        <span className="green_gradient">Linkyfy</span>
      </h1>
      <br className="max-md:hidden" />
      <span className="subhead_text orange_gradient text-center mb-5">
        Connect to professionals
      </span>

      <p className="desc text-center font-semibold">
        Linkyfy is a place where you can customize your resume and connect with
        other professionals
      </p>
      <div className="flex space-x-48">
        <RegisterForm />
      </div>
    </section>
  );
};
export default Home;
