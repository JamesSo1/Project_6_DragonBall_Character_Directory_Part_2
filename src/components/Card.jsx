import { useState, useEffect } from "react";
import "../App.css";

function Card({ dataType, data }) {
  return (
    <div className="card">
      <p>
        <b>{dataType}</b> : {data}
      </p>
    </div>
  );
}

export default Card;
