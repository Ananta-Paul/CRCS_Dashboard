import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export const MyDataGrid = ({ data }) => {
  const rows = data.map((item) => ({ id: item._id, ...item }));

  const columns = [
    { field: "Name of Society", width: "400", headerName: "Name of Society" },

    { field: "Sector Type", width: "150", headerName: "Sector Type" },
    {
      field: "Area of Operation",
      width: "350",
      headerName: "Area of Operation",
    },
    { field: "State", width: "150", headerName: "State" },
    { field: "District", width: "150", headerName: "District" },
    {
      field: "Date of Registration",
      width: "100",
      headerName: "Date of Registration",
    },
    { field: "Address", width: "350", headerName: "Address" },
  ];

  return (
    <div style={{ height: "calc(100% - 5vw)", width: "100%" }}>
      <div className="chartTitle">Records</div>
      <DataGrid
        rows={rows}
        columns={columns}
        columnBuffer={2}
        columnThreshold={2}
        getRowId={(row) => row.id}
      />
    </div>
  );
};
