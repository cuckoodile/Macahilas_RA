import React from "react";

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-red-600 text-yellow-400 flex flex-col justify-center items-center text-7xl font-bold">
      <p>SAN KA PUNTA?</p>

      <a href="/" className="underline text-blue-600 hover:text-black">
        Back
      </a>
    </div>
  );
}
