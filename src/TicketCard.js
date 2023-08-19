import React from "react";
import "./TicketCard.css";
import Avatar from "./Avatar";

function TicketCard({ ticket, users, selectedGroupingOption }) {
  const user = users.find((user) => user.id === ticket.userId);
  return (
    <div className="ticket-card">
      <div className="left">
        <h3 className="ticket-id">{ticket.id}</h3>
        <h5 className="ticket-title">{ticket.title}</h5>
        <p>
          <div className="circle" />
          <span className="ticket-tag">{ticket.tag.join(", ")}</span>
        </p>
      </div>
      <div className="right">
        {selectedGroupingOption !== "user" && user && (
          <Avatar name={user.name} status={user.available ? "yes" : "no"} />
        )}
      </div>
    </div>
  );
}

export default TicketCard;
