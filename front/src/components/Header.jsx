import React from "react";

export default function Header() {
  return (
    <header className="bg-teal-300 flex justify-between items-center px-4 py-2">
      <div className="flex items-center gap-4">
        <img
          src="https://images-platform.99static.com//iWb9qSS9Z9svMxNebolrdltUBkg=/101x96:1904x1899/fit-in/500x500/99designs-contests-attachments/138/138851/attachment_138851982"
          alt="Warehouse "
          className="size-10 rounded-full"
        />
        <p>Kurt Macahilas</p>
      </div>

      <div className="flex items-center gap-5">
        <p>Admin</p>
        <p>Products</p>
        <p>Categories</p>
        <p>Warehouse</p>
        <p>Profile</p>
      </div>

      <p>Logout</p>
    </header>
  );
}
