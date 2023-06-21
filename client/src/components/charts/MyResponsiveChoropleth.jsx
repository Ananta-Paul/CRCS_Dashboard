import { ResponsiveChoropleth } from "@nivo/geo";
import { React, useEffect, useState } from "react";
import countries from "./world_countries.json";

import DatamapsIndia from "react-datamaps-india";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveChoropleth = ({ data /* see data tab */ }) => {
  //
  return (
    <div className="indiaMap">
      <DatamapsIndia
        regionData={data}
        hoverComponent={({ value }) => {
          return (
            <div>
              <div>
                {value.name} {value.value}
              </div>
            </div>
          );
        }}
        mapLayout={{
          title: "Statewise",
          legendTitle: "Number of Occurrence",
          startColor: "#FFDAB9",
          endColor: "#FF6347",
          hoverTitle: "Count",
          noDataColor: "#f5f5f5",
          borderColor: "#8D8D8D",
          hoverBorderColor: "#8D8D8D",
          hoverColor: "green",
          height: 90,
          weight: 50,
        }}
      />
    </div>
  );
};
