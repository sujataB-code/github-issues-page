import { useEffect, useState } from "react";
import { Grid, Chip } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./issue.scss";

const GitIssue = ({ issue }) => {
  const [timeAgo, setTimeAgo] = useState("");

  //spliting title to find the type of issue
  const splitItem = issue.title.split(":");

  useEffect(() => {
    //calculating creataion time and day of issue
    const calculateTime = () => {
      const currentTime = new Date();
      const diff = currentTime - new Date(issue.created_at);
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);
      if (months > 0) {
        setTimeAgo(`${months} month${months === 1 ? "" : "s"} ago`);
      } else if (weeks > 0) {
        setTimeAgo(`${weeks} week${weeks === 1 ? "" : "s"} ago`);
      } else if (days > 0) {
        setTimeAgo(`${days} day${days === 1 ? "" : "s"} ago`);
      } else if (hours > 0) {
        setTimeAgo(`${hours} hour${hours === 1 ? "" : "s"} ago`);
      } else if (minutes > 0) {
        setTimeAgo(`${minutes} minute${minutes === 1 ? "" : "s"} ago`);
      } else {
        setTimeAgo("just now");
      }
    };
    calculateTime();
  }, [issue.created_at]);

  return (
    <>
      <Grid container className="issues-container" padding={1}>
        <Grid item xs={1} sm={0.5} md={0.5} lg={0.5}>
          <div className="outer-cirle">
            <div className="inner-cirle"></div>
          </div>
        </Grid>
        <Grid
          item
          xs={10}
          sm={8.5}
          md={8.5}
          lg={8.5}
          className="issue-title-font-size"
        >
          {issue && issue?.title}
          {splitItem.length === 2 && (
            <Chip
              label={splitItem[0]}
              className="type-chip"
              sx={{ marginLeft: "10px" }}
              color={
                splitItem[0] === "Bug"
                  ? "error"
                  : splitItem[0] === "DevTools"
                  ? "primary"
                  : splitItem[0]==='[RFC][ReactIs]' || splitItem[0]==='Reland #28672'
                  ?'warning'
                  : "success"
              }
            />
          )}
        </Grid>
        <Grid item xs={0} sm={1} md={1} lg={1} className="issue-reactions hidden-avtar">
          {issue && issue?.reactions?.total_count > 0 && (
            <>
              <BookmarkBorderIcon />
              {issue.reactions.total_count}
            </>
          )}
        </Grid>
        <Grid item xs={0} sm={1} md={1} lg={1} className="issue-avtar-url">
          <img
            style={{
              height: "100%",
              borderRadius: "50%",
              border: "1px solid black",
            }}
            className="hidden-avtar"
            src={issue.user.avatar_url}
            alt=""
          />
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          className="issue-title-font-size"
        >
          {issue && issue?.comments > 0 ? (
            <>
              <div className="hidden-avtar">
                <Grid item container>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <ChatBubbleOutlineIcon />
                  </Grid>
                  <Grid item xs={6} sm={5} md={6} lg={6}>
                    {issue.comments}
                  </Grid>
                </Grid>
              </div>
            </>
          ) : (
            ""
          )}
        </Grid>
        <Grid container>
          <Grid item xs={1} sm={0.5} md={0.5} lg={0.5}></Grid>
          <Grid
            item
            container
            xs={11}
            sm={11}
            md={11}
            lg={11}
            className="issue-creation-details"
          >
            #{issue?.id} opened {timeAgo} by {issue?.user?.login}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default GitIssue;
