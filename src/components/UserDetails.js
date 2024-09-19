// import { useContext, useEffect } from "react";
// import { UserContext } from "./DefaultUSerData";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

const UserDetails = () => {
  var rawDat = localStorage.getItem("Data");
  var Data = JSON.parse(rawDat);
  // const [users] = useContext(UserContext);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "emailAddress",
      width: 300,
      editable: true,
    },
    {
      field: "type",
      headerName: "Status",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div>
            {row.type === "active" ? (
              <Stack direction="row" className="StackChip">
                <Chip
                  avatar={<ToggleOnIcon className="toggleIcon" />}
                  label={row.type}
                  className="active"
                />
              </Stack>
            ) : (
              <Stack direction="row" className="StackChip">
                <Chip
                  avatar={<ToggleOffOutlinedIcon className="toggleIcon" />}
                  label={row.type}
                  className="notactive"
                />
              </Stack>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={Data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        className="reow"
      />
    </Box>
  );
};

export default UserDetails;
