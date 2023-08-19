import React, { useState, useEffect } from "react";
import "./DropdownMenu.css";
import TicketList from "./TicketList";

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroupingOption, setSelectedGroupingOption] = useState("");
  const [selectedOrderingOption, setSelectedOrderingOption] = useState("");
  const [ticketsData, setTicketsData] = useState(null);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleGroupingSelect = (option) => {
    setSelectedGroupingOption(option);
    localStorage.setItem("selectedGroupingOption", option); // Save to localStorage
  };

  const handleOrderingSelect = (option) => {
    setSelectedOrderingOption(option);
    localStorage.setItem("selectedOrderingOption", option); // Save to localStorage
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent the click event from reaching the parent div
  };

  useEffect(() => {
    const savedGroupingOption = localStorage.getItem("selectedGroupingOption");
    const savedOrderingOption = localStorage.getItem("selectedOrderingOption");

    if (savedGroupingOption) {
      setSelectedGroupingOption(savedGroupingOption);
    }

    if (savedOrderingOption) {
      setSelectedOrderingOption(savedOrderingOption);
    }

    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => setTicketsData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="app-container">
      <div className="top-section">
        <div
          className={`dropdown-toggle ${isOpen ? "open" : ""}`}
          onClick={handleToggleMenu}
        >
          <div className="title-icon">
            <div className="hamburger-icon">☰</div>
            <div className="dropdown-title">Display</div>
            <div className={`dropdown-icon ${isOpen ? "open" : ""}`}>▼</div>
          </div>
          {isOpen && (
            <div className="dropdown-menu" onClick={handleDropdownClick}>
              <div className="options-row">
                <div className="sub-menu">
                  <p className="sub-menu-title">Grouping</p>
                  <select
                    onChange={(e) => handleGroupingSelect(e.target.value)}
                    value={selectedGroupingOption}
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div className="sub-menu">
                  <p className="sub-menu-title">Ordering</p>
                  <select
                    onChange={(e) => handleOrderingSelect(e.target.value)}
                    value={selectedOrderingOption}
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bottom-section">
        {/* <div className="selected-options">
          {selectedGroupingOption && (
            <p>Selected Grouping: {selectedGroupingOption}</p>
          )}
          {selectedOrderingOption && (
            <p>Selected Ordering: {selectedOrderingOption}</p>
          )}
        </div> */}
        {ticketsData && (
          <TicketList
            ticketsData={ticketsData}
            selectedGroupingOption={selectedGroupingOption}
            selectedOrderingOption={selectedOrderingOption}
          />
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
