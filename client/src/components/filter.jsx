import React, { useState, useEffect } from "react";
import "./filter.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import Select from "react-select";
export const Filter = ({ ondata }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [society, setSociety] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [sortBy, setSortBy] = useState(0);
  const [sortByOption, setSortByOption] = useState(0);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/data/filter`);
        // console.log("filter", data);
        setFilter(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const applyFilter = async () => {
    try {
      const response = await axios.post("/api/data/filter", {
        Society: society.map((topic) => topic.value),
        Sectors: sectors.map((sector) => sector.value),
        State: state.map((region) => region.value),
        District: district.map((c) => c.value),
        sortBy: sortBy,
      });
      //console.log(response);
      ondata(response.data);

      setIsOpen(!isOpen);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleEndYearChange = (event) => {
  //   setEndYear(event);
  // };

  const handleSelectSociety = (data) => {
    setSociety(data);
  };

  const handleSelectSectors = (data) => {
    setSectors(data);
  };

  const handleSelectState = (data) => {
    setState(data);
  };
  const handleSelectDistrict = (data) => {
    setDistrict(data);
  };

  const handleSelectSortBy = (data) => {
    //console.log("sort", data.value);
    setSortByOption(data);
    setSortBy(data.value);
  };

  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
  ];
  return (
    <div className="filter-menu">
      <div className="top">
        <button
          className="filter-menu-button filter-apply"
          onClick={toggleMenu}
        >
          Filter
          <i style={{ fontSize: "1.5rem" }} className="fa fa-filter"></i>
        </button>
        <h1 className="header">Dashboard</h1>
      </div>
      <div className={"filter-menu-dropdown " + (isOpen ? "animation" : "")}>
        {isOpen && filter.hasOwnProperty("Society") && (
          <>
            <div className="f-head">
              <h2 className="head">Filter Records</h2>
              <i className="fa fa-2x fa-times" onClick={toggleMenu} />
            </div>
            <div className="menu">
              <div className="filter-option">
                <h2>Choose Society</h2>
                <div className="dropdown-container">
                  <Select
                    options={filter.Society.map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    placeholder="Select society"
                    value={society}
                    onChange={handleSelectSociety}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>
              <div className="filter-option">
                <h2>Choose Sector</h2>
                <div className="dropdown-container">
                  <Select
                    options={filter.Sectors.map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    placeholder="Select sectors"
                    value={sectors}
                    onChange={handleSelectSectors}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>

              <div className="filter-option">
                <h2>Choose State</h2>
                <div className="dropdown-container">
                  <Select
                    options={filter.State.map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    placeholder="Select States"
                    value={state}
                    onChange={handleSelectState}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>
              <div className="filter-option">
                <h2>Choose District</h2>
                <div className="dropdown-container">
                  <Select
                    options={filter.District.map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    placeholder="Select Districts"
                    value={district}
                    onChange={handleSelectDistrict}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>
              {
                <div className="filter-option">
                  <h2>Choose Sort By</h2>
                  <div className="dropdown-container">
                    <Select
                      options={[
                        {
                          value: 1,
                          label: "Date of Registration in Ascending",
                        },
                        {
                          value: -1,
                          label: "Date of Registration in Descending",
                        },
                      ]}
                      placeholder="Select variables"
                      value={sortByOption}
                      onChange={handleSelectSortBy}
                    />
                  </div>
                </div>
              }
              <button className="filter-apply" onClick={applyFilter}>
                Apply
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
