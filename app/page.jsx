"use client";
import RegisterForm from "@components/RegisterForm";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col pb-9 px-7 sm:px-0">
      <h1 className="head_text text-center">
        <span className="blue_gradient text-7xl">Welcome to </span>
        <br className="sm:hidden" />
        <span className="green_gradient text-7xl">Linkyfy</span>
      </h1>
      <br className="max-md:hidden" />
      <span className="orange_gradient text-3xl sm:text-5xl text-center font-semibold mt-7 sm:mt-0">
        Connect to professionals
      </span>

      <p className="font-satoshi text-slate-600 sm:text-lg text-md text-center font-semibold px-9 my-5">
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
