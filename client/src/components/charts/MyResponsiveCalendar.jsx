import { ResponsiveTimeRange } from "@nivo/calendar";
import { useState, useEffect } from "react";
import { sortYearByOccurrence } from "../../config/logic";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveCalendar = ({ data /* see data tab */ }) => {
  const [year, setYear] = useState("2022");
  let arry = sortYearByOccurrence(data);
  const handleYear = (event) => {
    // console.log(event.target.value);
    setYear(event.target.value);
  };
  // useEffect(() => {
  //   //console.log(year);
  // }, [year]);
  return (
    <>
      {" "}
      <div className="calenderheader">
        <div className="chartTitle">Heatmap of Added Dates</div>
        <div className="year-option">
          <select
            className="form-select"
            onChange={handleYear}
            id="week"
            name="week"
          >
            {arry.map(({ year }, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
            {/* <option value="2022">2022</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option> */}
          </select>
        </div>
      </div>
      <ResponsiveTimeRange
        data={data}
        from={`${year}-01-01`}
        to={`${year}-12-30`}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        weekdayLegendOffset={0}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            justify: true,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
            translateX: 0,
            translateY: 50,
            symbolSize: 20,
          },
        ]}
      />
    </>
  );
};
