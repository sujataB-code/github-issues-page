import { Box, Button, Grid } from "@mui/material";
import { pages } from "../constants/header";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

const buttonTransparent = {
  backgroundColor: "transparent",
  color: "black",
  fontWeight: 600,
};

const buttonWhite = {
  backgroundColor: "white",
  color: "black",
  fontWeight: 600,
};

const Header = () => {
  //fetch current path
  const { pathname } = useLocation();

  //nav header
  const navHeader = (
    <Grid container>
      <Grid item xs={12} sm={6} md={8} lg={8} className="landing-page-font">
        facebook/react
      </Grid>
      <Grid item xs={12} sm={6} md={1} lg={1}>
        <Button
          variant="contained"
          className="button-size"
          sx={buttonTransparent}
        >
          Notification
        </Button>
      </Grid>
      <Grid item container paddingLeft={1} xs={12} sm={6} md={1.5} lg={1.5}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Button
            variant="contained"
            className="button-size"
            sx={buttonTransparent}
          >
            star
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Button variant="contained" className="button-size" sx={buttonWhite}>
            157K
          </Button>
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={6} md={1.5} lg={1.5} paddingLeft={1}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Button
            variant="contained"
            className="button-size"
            sx={buttonTransparent}
          >
            Fork
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Button variant="contained" className="button-size" sx={buttonWhite}>
            53.7K
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <>
      <Box className="header-container" padding={2}>
        {navHeader}

        {/* Nav Links*/}
        {pages.map((page) => (
          <Link key={page.id} to={page.target}>
            <Button
              key={page.id}
              className="nav-link-font"
              style={{
                borderBottom: pathname === page.target ? "1px solid red" : "",
                borderRadius: pathname === page.target ? "0px" : "",
              }}
            >
              {page.name}
            </Button>
          </Link>
        ))}
      </Box>
    </>
  );
};

export default Header;
