import React, { useState, useEffect } from "react";
import Card from "./Card";

const Cards = ({ data }) => {
  const blog = data.slice(0, 8);

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full h-auto justify-center"
      style={{ gridAutoRows: "1fr" }}
    >
      {blog.map((a, i) => (
        <Card key={i} data={a} />
      ))}
    </div>
  );
};

export default Cards;
