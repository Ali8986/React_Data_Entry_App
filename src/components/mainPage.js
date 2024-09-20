import UserDetails from "./UserDetails";
import { Link } from "react-router-dom";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import NoData from "./NoData";
import { Button } from "@mui/material";
const MainPage = () => {
  let data = JSON.parse(localStorage.getItem("Data"));

  return (
    <>
      {data && data.length > 0 ? (
        <div>
          <div className="btn_group">
            <div className="main-btn_group">
              <Link to="/form" className="linkBtn" state={{ from: true }}>
                <Button
                  sx={{ color: "white" }}
                  endIcon={<AddCircleOutlinedIcon />}
                >
                  Add Data
                </Button>
              </Link>
              <Link to="/FormEditingPage" className="linkBtn">
                <Button sx={{ color: "white" }} endIcon={<EditIcon />}>
                  Edit Data
                </Button>
              </Link>
            </div>
          </div>
          <div className="main-table">
            <div className="table-body">
              <UserDetails />
            </div>
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default MainPage;
