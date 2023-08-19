import React from "react";
import "./TicketList.css";
import TicketGroup from "./TicketGroup";

function TicketList({
  ticketsData,
  selectedGroupingOption,
  selectedOrderingOption,
}) {
  const { tickets, users } = ticketsData;

  const groupedTickets = {};

  // Grouping logic based on the selected grouping option
  tickets.forEach((ticket) => {
    let groupKey;

    if (selectedGroupingOption === "user") {
      groupKey = ticket.userId;
    } else if (selectedGroupingOption === "priority") {
      groupKey = ticket.priority;
    } else {
      groupKey = ticket.status;
    }

    if (!groupedTickets[groupKey]) {
      groupedTickets[groupKey] = [];
    }
    groupedTickets[groupKey].push(ticket);
  });

  // Sorting logic based on the selected ordering option
  Object.keys(groupedTickets).forEach((groupKey) => {
    const ticketsInGroup = groupedTickets[groupKey];
    groupedTickets[groupKey] =
      selectedOrderingOption === "title"
        ? ticketsInGroup.sort((a, b) => a.title.localeCompare(b.title))
        : ticketsInGroup.sort((a, b) => b.priority - a.priority);
  });

  return (
    <div className="ticket-list-container">
      {Object.keys(groupedTickets).map((groupKey, index) => (
        <TicketGroup
          key={index}
          groupKey={groupKey}
          tickets={groupedTickets[groupKey]}
          users={users}
          selectedGroupingOption={selectedGroupingOption}
        />
      ))}
    </div>
  );
}

export default TicketList;
