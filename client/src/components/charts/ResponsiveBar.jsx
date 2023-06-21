import React from "react";
import { useState } from "react";
import { ResponsiveBarCanvas } from "@nivo/bar";

export const MyResponsiveBar = ({ data /* see data tab */ }) => {
  //console.log(data);
  return (
    <>
      <div className="chartTitle">BarChart of Registration</div>
      <ResponsiveBarCanvas
        data={data}
        keys={["No of Registration"]}
        indexBy="title"
        margin={{ top: 0, right: 0, bottom: 120, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "pastel2" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
        ]}
        fill={[
          {
            match: {
              id: "No of Registration",
            },
            id: "dots",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Year",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "No of Registration",
          legendPosition: "middle",
          legendOffset: -43,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in title: " + e.indexValue
        }
      />
    </>
  );
};
