import React, { useEffect, useState } from "react";
import axios from "axios";
export const Overview = ({ data }) => {
  const [filter, setFilter] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const s = new Set();
      await data.map((a) => s.add(a["Name of Society"]));
      //console.log(s.size);
      const ss = new Set();
      await data.map((a) => ss.add(a["Sector Type"]));
      // console.log(ss.size);
      setFilter({ society: s.size, sector: ss.size });
    };

    fetchData();
  }, [data]);
  return (
    <>
      <div className="overview-box">
        <div className="overview-icon bg-green">
          <i className="fas fa-database"></i>
        </div>
        <div className="overview-content">
          <div className="overview-title">Total Record Count</div>
          <div className="overview-value">{data.length}</div>
        </div>
      </div>
      <div className="overview-box">
        <div className="overview-icon">
          <i className="fa fa-city"></i>
        </div>
        <div className="overview-content">
          <div className="overview-title">Number of Societies</div>
          <div className="overview-value">{filter.society}</div>
        </div>
      </div>

      <div className="overview-box">
        <div className="overview-icon">
          <i className="fas fa-cog"></i>
        </div>
        <div className="overview-content">
          <div className="overview-title">Number of Sectors</div>
          <div className="overview-value">{filter.sector}</div>
        </div>
      </div>
    </>
  );
};
