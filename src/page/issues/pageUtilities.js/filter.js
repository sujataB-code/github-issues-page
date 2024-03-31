import { MenuItem, Grid, TextField } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import "./filter.scss";

const Filter = ({ data, name }) => {
  const [boxIsVisible, setIsBoxVisible] = useState(false);

  const toggleBoxVisibility = () => {
    setIsBoxVisible(!boxIsVisible);
  };

  return (
    <>
      <div className="filter-position-relation" >
        <Grid container onClick={toggleBoxVisibility}>
          <Grid item>{name}</Grid>
          <Grid item>
            <ArrowDropDownIcon />
          </Grid>
        </Grid>
        {boxIsVisible && (
          <div className="filter-position-absolute" >
            <Grid container padding={1} borderBottom={1}>
              {name === "sort" ? "sort by" : `filter by ${name}`}
            </Grid>
            <Grid padding={0.5}>
            <TextField InputProps={{style:{height:'30px'}}}/>
            </Grid>
            {data.every((el) => el == null) ? (
              <MenuItem onClick={toggleBoxVisibility}>Issues with no {name}</MenuItem>
            ) : (
              [...new Set(data)].map((ass) => <MenuItem onClick={toggleBoxVisibility}>{ass}</MenuItem>)
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
