import gitIssuesData from "../../data.json";
import GitIssue from "./issues";
import { Button, Grid } from "@mui/material";
import "./issuespage.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import CreateNewIssueModal from "./createNewIssue/createNewIssue";
import { PAGE_SIZE } from "../../config";
import Filter from "./pageUtilities.js/filter";

//Menu Item for filters
const sorting = [
  "Newest",
  "Oldest",
  "Most Commented",
  "Least Commented",
  "Recently Updated",
  "Least Recently Updated",
  "Best Match",
];

const projects = [];

const label = ["bug", "documentation", "duplicate", "enhacement"];

const IssuesPage = () => {
  const [issuesData, setIssueData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  //exisitng author option
  const authorAssociation = issuesData.map((el) => el.author_association);
  const Authors = [...new Set(authorAssociation)];

  //exisitng milestone option
  const milestones = issuesData.map((el) => el.milestone);
  const milestone = milestones.filter((el) => el !== null);

  //exisitng assignee option
  const assignees = issuesData.map((el) => el.assignee);
  const assignee = assignees.filter((el) => el !== null);

  //state of issue
  const openIssues = issuesData.filter((el) =>
    el.state === "open" ? el.state : ""
  );
  const closedIssues = issuesData.filter((el) =>
    el.state === "closed" ? el.state : ""
  );

  useEffect(() => {
    //fetching data form local storage

    const storedIssue = JSON.parse(localStorage.getItem("issuesData"));
    if (storedIssue) {
      //if data stored in local storage
      console.log(storedIssue);
      setIssueData(storedIssue.slice(0, PAGE_SIZE));
    } else {
      //if data not stored in local storage
      setIssueData(gitIssuesData.slice(0, PAGE_SIZE));
    }
  }, []);
  console.log(issuesData);

  useEffect(() => {
    //implementing infinte scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (scrollPosition >= documentHeight * 0.8) {
        fetchMoreData();
      }
    };

    //add event listener to scroll
    window.addEventListener("scroll", handleScroll);

    //remove event listener after fetching all data
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const fetchMoreData = () => {
    //implementing pagination to fetch the data from next page
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * PAGE_SIZE;
    const endIndex = nextPage * PAGE_SIZE;
    if (endIndex <= gitIssuesData.length) {
      setIssueData((prevData) => [
        ...prevData,
        ...gitIssuesData.slice(startIndex, endIndex),
      ]);
      setPage(nextPage);
    }
    if (endIndex <= issuesData.length) {
      setIssueData((prevData) => [
        ...prevData,
        ...issuesData.slice(startIndex, endIndex),
      ]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  //handlers to create new issue
  const handleCreateNewIssue = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Grid container justifyContent="end" padding={1}>
        <Button
          variant="contained"
          color="success"
          onClick={handleCreateNewIssue}
        >
          New Issue
        </Button>
      </Grid>
      <CreateNewIssueModal open={openModal} close={() => setOpenModal(false)} />
      <Grid container className="issues-header-container">
        <Grid item xs={3.5} sm={1.5} md={1} lg={1} className="status-font">
          {openIssues.length} open
        </Grid>
        <Grid item xs={3.5} sm={1.5} md={5} lg={4} className="status-font">
          {closedIssues.length} closed
        </Grid>

        {/* Filter start */}
        <Grid
          item
          container
          paddingLeft={2}
          paddingRight={2}
          xs={6}
          sm={1.5}
          md={1}
          lg={1.1}
        >
          <Filter data={Authors} name="Author" />
        </Grid>

        <Grid
          item
          container
          paddingLeft={2}
          paddingRight={2}
          xs={6}
          sm={1.5}
          md={1}
          lg={1.1}
        >
          <Filter data={label} name="Label" />
        </Grid>

        <Grid
          item
          container
          paddingLeft={2}
          paddingRight={2}
          xs={6}
          sm={1.5}
          md={1}
          lg={1.1}
        >
          <Filter data={projects} name="Project" />
        </Grid>
        <Grid
          item
          container
          paddingLeft={2}
          paddingRight={2}
          xs={6}
          sm={1.5}
          md={1}
          lg={1.3}
        >
          <Filter data={milestone} name="Milestrone" />
        </Grid>
        <Grid
          item
          container
          paddingLeft={2}
          paddingRight={2}
          xs={6}
          sm={1.5}
          md={1}
          lg={1.3}
        >
          <Filter data={assignee} name="Assignee" />
        </Grid>
        <Grid
          item
          container
          paddingLeft={2}
          paddingRight={2}
          xs={6}
          sm={1.5}
          md={1}
          lg={1.1}
        >
          <Filter data={sorting} name="Sort" />
        </Grid>
      </Grid>
      {/* Filter end */}

      <InfiniteScroll
        dataLength={issuesData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Grid container className="outlet-pattern">
          {issuesData && issuesData?.length && issuesData?.length > 0
            ? issuesData.map((issue) => (
                <GitIssue key={issue.id} issue={issue} />
              ))
            : `No issue Exists`}
        </Grid>
      </InfiniteScroll>
    </>
  );
};
export default IssuesPage;
