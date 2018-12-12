import React from "react";
import spinner from "./spinner.svg";

export default function Spinner() {
  return (
    <div className="row justify-content-center">
      <img src={spinner} alt="Spinner" className="spinner" />
    </div>
  );
}
