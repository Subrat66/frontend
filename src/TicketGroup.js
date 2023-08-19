import React from "react";
import "./TicketGroup.css";
import TicketCard from "./TicketCard";
import Avatar from "./Avatar";
import {
  SignalCellularAltIcon,
  SignalCellularAlt1BarIcon,
  SignalCellularAlt2BarIcon,
  PriorityHighIcon,
  MoreHorizIcon,
  CheckCircleIcon,
  CancelIcon,
  RadioButtonUncheckedIcon,
  TimelapseIcon,
  ReplayIcon,
} from "./iconHelpers";

function TicketGroup({ groupKey, tickets, users, selectedGroupingOption }) {
  let groupTitle = "";
  let groupCount = 0;
  let groupIcon = null;

  // Define mappings for status icons and priority icons
  const icons = {
    backlog: <ReplayIcon />,
    todo: <RadioButtonUncheckedIcon />,
    inprogress: <TimelapseIcon />,
    done: <CheckCircleIcon />,
    cancelled: <CancelIcon />,

    0: <MoreHorizIcon />,
    1: <SignalCellularAlt1BarIcon />,
    2: <SignalCellularAlt2BarIcon />,
    3: <SignalCellularAltIcon />,
    4: <PriorityHighIcon />,
  };

  const priorityInfoMap = {
    0: { name: "No Priority" },
    1: { name: "Low" },
    2: { name: "Medium" },
    3: { name: "High" },
    4: { name: "Urgent" },
  };

  // Function to get priority information based on the priority key
  const getPriorityInfo = (priorityKey) => {
    return priorityInfoMap[priorityKey] || { name: "Unknown" };
  };

  if (selectedGroupingOption === "user") {
    const user = users.find((u) => u.id === groupKey);
    groupTitle = user ? user.name : "No User";
    groupIcon = <Avatar name={groupTitle} />;
  } else if (selectedGroupingOption === "priority") {
    const priorityInfo = getPriorityInfo(groupKey);
    groupTitle = priorityInfo.name;
    groupIcon = icons[groupKey];
  } else {
    groupTitle = `${groupKey}`;
    groupIcon = icons[groupKey];
  }

  groupCount = tickets.length;

  const handleClick = () => {};

  return (
    <>
      <div className="ticket-group">
        <div className="title">
          <span className="group-icon">{groupIcon}</span>
          <h2 className="group-title">
            {groupTitle} <span className="group-count">{groupCount}</span>
          </h2>
          <div className="btn">
            <button className="plus-btn" onClick={handleClick}>
              +
            </button>
            <button className="dots-btn" onClick={handleClick}>
              &#8230;
            </button>
          </div>
        </div>

        <div className="ticket-cards">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              users={users}
              selectedGroupingOption={selectedGroupingOption}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default TicketGroup;
