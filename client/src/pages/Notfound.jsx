import React from "react";

const Notfound = () => {
  return (
    <div class="flex h-screen w-full flex-col items-center justify-center bg-teal-50 text-center overflow-hidden">
      <h1 class="text-primary-600 mb-4 text-center text-7xl font-extrabold tracking-tight lg:text-9xl">
        404
      </h1>
      <p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        Oops!
      </p>
      <p class="mb-4 text-lg font-light text-gray-500">
        Sorry, we can't find that page.
      </p>
      <a
        href="/"
        class="hover:bg-primary-800 focus:ring-primary-300 mt-4 inline-flex rounded-lg bg-gray-200 px-5 py-2.5 text-center text-sm font-medium focus:ring-4 focus:outline-none"
      >
        Back to Homepage
      </a>
    </div>
  );
};

export default Notfound;
