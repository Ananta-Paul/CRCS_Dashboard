const asyncHandler = require("express-async-handler");
const Data = require("../models/dataModel");

const getData = asyncHandler(async (req, res) => {
  try {
    const dashboard = await Data.find();
    //console.log("yes");
    res.send(dashboard);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  // console.log(keyword);
});
const getDistinct = asyncHandler(async (req, res) => {
  try {
    const distinctSectors = await Data.distinct("Sector Type");
    const distinctSociety = await Data.distinct("Name of Society");
    const distinctDistrict = await Data.distinct("District");
    const distinctState = await Data.distinct("State");

    const distinctValues = {
      Sectors: distinctSectors,
      Society: distinctSociety,
      District: distinctDistrict,
      State: distinctState,
      // Add more properties as needed
    };

    res.send(distinctValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
const getFData = asyncHandler(async (req, res) => {
  const { Sectors, Society, District, State, sortBy } = req.body;
  //console.log(sortBy);
  try {
    const matchStage = {};

    if (Sectors.length > 0) {
      matchStage["Sector Type"] = { $in: Sectors };
    }
    if (Society.length > 0) {
      matchStage["Name of Society"] = { $in: Society };
    }
    if (State.length > 0) {
      matchStage.State = { $in: State };
    }
    if (District.length > 0) {
      matchStage.District = { $in: District };
    }
    const sortStage = {};
    if (sortBy === 1 || sortBy === -1) {
      sortStage.$sort = {};
      sortStage.$sort["Date of Registration"] = sortBy;
    }

    const pipeline = [
      {
        $match: matchStage,
      },
      {
        $addFields: {
          "Date of Registration": {
            $dateToString: {
              date: {
                $dateFromString: {
                  dateString: "$Date of Registration",
                  format: "%m/%d/%Y",
                },
              },
              format: "%Y-%m-%d",
            },
          },
        },
      },
    ];

    if (sortBy === 1 || sortBy === -1) {
      pipeline.push({
        $sort: sortStage.$sort,
      });
    }
    const data = await Data.aggregate(pipeline);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = { getData, getDistinct, getFData };
