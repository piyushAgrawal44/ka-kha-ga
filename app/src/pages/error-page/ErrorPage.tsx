import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-xl">
        <h1 className="text-5xl font-bold mb-4">Oops!</h1>
        <p className="text-gray-600 text-lg mb-6">Something went wrong.</p>

        <a
          href="/"
          className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
