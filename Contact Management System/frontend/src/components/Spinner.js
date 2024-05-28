import React from "react";

function Spinner({ splash = "loading...." }) {
  return (
    <div className="text-center mt-5">
      <div
        class="spinner-border m-5"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      ></div>
      <h3>{splash}</h3>
    </div>
  );
}

export default Spinner;
