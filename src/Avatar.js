import React from "react";
import "./Avatar.css"; // Create this CSS file

const Avatar = ({ name, status }) => {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
  const circleColor = status === "no" ? "grey" : "yellow";

  return (
    <div className="avatar">
      <div className="title-circle">{initials}</div>
      <div className={`status-circle ${circleColor}`} />
    </div>
  );
};

export default Avatar;
