import React from "react";

export default function Card({ data }) {
  return (
    <div className="min-h-40 min-w-64 flex flex-col justify-between border rounded-2xl p-3">
      <div>
        <p>{data.name || "Name"}</p>

        <div className="flex justify-between">
          <p>{data.sku || "SKU"}</p>
          <p>P{data.price || "Price"}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <p>Category</p>
        <p>Warehouse</p>
      </div>
    </div>
  );
}
