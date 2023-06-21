import { countryToAlpha3 } from "country-to-iso";
function fixit(a) {
  if (a === null || a === "") return 0;
  else return parseInt(a);
}
export const processRadar = async (data, r) => {
  let radardata = [
    {
      taste: "relevance",
    },
    {
      taste: "likelihood",
    },
    {
      taste: "impact",
    },
    {
      taste: "intensity",
    },
  ];
  // console.log(fixit(""));
  let data1 = data.slice(r, r + 5);
  let key = await data1.map((obj) => {
    radardata[0][`${obj.title.substring(0, 20)}...`] =
      (fixit(obj.relevance) * 100) / 10;
    radardata[1][`${obj.title.substring(0, 20)}...`] =
      (fixit(obj.likelihood) * 100) / 5;
    radardata[2][`${obj.title.substring(0, 20)}...`] =
      (fixit(obj.impact) * 100) / 5;
    radardata[3][`${obj.title.substring(0, 20)}...`] =
      (fixit(obj.intensity) * 100) / 100;

    return `${obj.title.substring(0, 20)}...`;
  });
  //   console.log("func", radardata, key);

  return { radardata, key };
};

export const processCalender = (data, prop) => {
  let arr2 = [];

  data.forEach((x) => {
    const inputDate = new Date(x[prop]);
    const year = inputDate.getFullYear();
    // if (year === y) {
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");
    const key = `${year}-${month}-${day}`;

    if (
      arr2.some((val) => {
        return val["day"] === key;
      })
    ) {
      arr2.forEach((k) => {
        if (k["day"] === key) {
          k["value"]++;
        }
      });
    } else {
      let a = {};
      a["day"] = key;
      a["value"] = 1;
      arr2.push(a);
    }
  });

  return arr2;
};
export const processGeo = (data) => {
  const stateObject = data.reduce((acc, S) => {
    const formattedState = S.State.toLowerCase()
      .split(" ")
      .map((word) =>
        word === "and" ? "&" : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
    acc[formattedState] = acc[formattedState] ? acc[formattedState] + 1 : 1;

    return acc;
  }, {});
  const formattedData = Object.entries(stateObject).reduce(
    (acc, [state, value]) => {
      acc[state] = { value };
      return acc;
    },
    {}
  );
  // console.log(formattedData);
  return formattedData;
};
export const processPie = (data) => {
  let arr2 = [];

  data.forEach((x) => {
    if (x["Sector Type"] != "") {
      const key = x["Sector Type"];

      if (
        arr2.some((val) => {
          return val["id"] === key;
        })
      ) {
        arr2.forEach((k) => {
          if (k["id"] === key) {
            k["value"]++;
          }
        });
      } else {
        let a = {};
        a["id"] = key;
        a["value"] = 1;
        arr2.push(a);
      }
    }
  });
  //console.log("pie", arr2);
  return arr2;
};
export const processBub = (data) => {
  let arr2 = [];

  data.forEach((y) => {
    y["Area of Operation"].split(", ").forEach((x) => {
      if (x != "") {
        const key = x;

        if (
          arr2.some((val) => {
            return val["name"] === key;
          })
        ) {
          arr2.forEach((k) => {
            if (k["name"] === key) {
              k["value"]++;
            }
          });
        } else {
          let a = {};
          a["name"] = key;
          a["value"] = 1;
          arr2.push(a);
        }
      }
    });
  });
  let arr3 = {
    name: "root",
    children: arr2,
  };
  //console.log("bub", arr3, arr3.children.length);
  return arr3;
};
export const processTree = (data) => {
  let arr2 = [];

  data.forEach((x) => {
    if (x["topic"] != "") {
      const key = x["topic"];

      if (
        arr2.some((val) => {
          return val["name"] === key;
        })
      ) {
        arr2.forEach((k) => {
          if (k["name"] === key) {
            k["value"]++;
          }
        });
      } else {
        let a = {};
        a["name"] = key;
        a["value"] = 1;
        arr2.push(a);
      }
    }
  });
  let arr3 = {
    name: "Topic",
    children: arr2,
  };
  //console.log("Tree", arr3, arr3.children.length);
  return arr3;
};
export const processBar = (data) => {
  let arr2 = [];

  data.forEach((obj) => {
    let a = {};
    a["title"] = obj.title;
    a["relevance"] = (fixit(obj.relevance) * 100) / 10;
    a["impact"] = (fixit(obj.impact) * 100) / 5;
    a["intensity"] = (fixit(obj.intensity) * 100) / 100;
    a["likelihood"] = (fixit(obj.likelihood) * 100) / 5;

    arr2.push(a);
  });
  return arr2;
};
export const sortYearByOccurrence = (array) => {
  const Occurrences = {};

  // Count the occurrences of each name
  for (let i = 0; i < array.length; i++) {
    // console.log(array[i]);
    const year = array[i].day.toString().slice(0, 4);
    // console.log("year", year);
    if (year !== "NaN-")
      if (Occurrences[year]) {
        Occurrences[year] += 1;
      } else {
        Occurrences[year] = 1;
      }
  }

  // Convert Occurrences object to an array of objects
  const arr32 = Object.entries(Occurrences).map(([year, occurrence]) => ({
    year,
    occurrence,
  }));

  // Sort the arr32 in descending order based on occurrence counts
  arr32.sort((a, b) => b.occurrence - a.occurrence);
  //console.log(arr32);

  return arr32;
};
