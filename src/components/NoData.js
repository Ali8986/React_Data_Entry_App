import { Link } from "react-router-dom";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Button } from "@mui/material";

const NoData = () => {
  return (
    <div>
      <h2>No Data Added Yet....</h2>
      <Link to="/form" className="linkBtn" state={{ from: true }}>
        <Button sx={{ color: "white" }} endIcon={<AddCircleOutlinedIcon />}>
          Add Data
        </Button>
      </Link>
    </div>
  );
};

export default NoData;
