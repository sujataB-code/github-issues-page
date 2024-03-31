import { useState } from "react";
import { Modal, Box, Grid, TextField, Button, InputLabel, Select, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import gitIssuesData from "../../../data.json";
import './createNewIssue.scss';

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  borderRadius: "8px",
  boxShadow: 24,
};
const CreateNewIssueModal = ({ open, close }) => {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee]=useState('none')
  const getIssueData = JSON.parse(localStorage.getItem("issuesData"));
  const [issueData, setIssueData] = useState(
    getIssueData ? getIssueData : gitIssuesData
  );

  const handleAddIssue = () => {
    //object to create data
    const newIssue = {
      url: "https://api.github.com/repos/facebook/react/issues/28684",
      repository_url: "https://api.github.com/repos/facebook/react",
      labels_url:
        "https://api.github.com/repos/facebook/react/issues/28684/labels{/name}",
      comments_url:
        "https://api.github.com/repos/facebook/react/issues/28684/comments",
      events_url:
        "https://api.github.com/repos/facebook/react/issues/28684/events",
      html_url: "https://github.com/facebook/react/pull/28684",
      id: 2838278,
      node_id: "PR_kwDOAJy2Ks5rNI62",
      number: 28684,
      title: title,
      user: {
        login: "sebmarkbage",
        id: 63648,
        node_id: "MDQ6VXNlcjYzNjQ4",
        avatar_url: "https://avatars.githubusercontent.com/u/63648?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/sebmarkbage",
        html_url: "https://github.com/sebmarkbage",
        followers_url: "https://api.github.com/users/sebmarkbage/followers",
        following_url:
          "https://api.github.com/users/sebmarkbage/following{/other_user}",
        gists_url: "https://api.github.com/users/sebmarkbage/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/sebmarkbage/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/sebmarkbage/subscriptions",
        organizations_url: "https://api.github.com/users/sebmarkbage/orgs",
        repos_url: "https://api.github.com/users/sebmarkbage/repos",
        events_url: "https://api.github.com/users/sebmarkbage/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/sebmarkbage/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 196858374,
          node_i: "MDU6TGFiZWwxOTY4NTgzNzQ=",
          ur: "https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
          name: "CLA Signed",
          color: "e7e7e7",
          default: false,
          description: null,
        },
        {
          id: 1775958285,
          node_id: "MDU6TGFiZWwxNzc1OTU4Mjg1",
          url: "https://api.github.com/repos/facebook/react/labels/React%20Core%20Team",
          name: "React Core Team",
          color: "9149d1",
          default: false,
          description: "Opened by a member of the React Core Team",
        },
      ],
      state: "open",
      locked: false,
      assignee: assignee,
      assignees: [],
      milestone: null,
      comments: 1,
      created_at: new Date(),
      updated_at: "2024-03-29T23:01:46Z",
      closed_at: null,
      author_association: "COLLABORATOR",
      active_lock_reason: null,
      draft: false,
      pull_request: {
        url: "https://api.github.com/repos/facebook/react/pulls/28684",
        html_url: "https://github.com/facebook/react/pull/28684",
        diff_url: "https://github.com/facebook/react/pull/28684.diff",
        patch_url: "https://github.com/facebook/react/pull/28684.patch",
        merged_at: null,
      },
      body: "We previously only included the component stack.\r\n    \r\nCleaned up the fields in Fizz server that wasn't using consistent hidden classes in dev vs prod.\r\n\r\nAdded a prefix to errors serialized from server rendering. It can be a bit confusing to see where this error came from otherwise since it didn't come from elsewhere on the client. It's really kind of confusing with other recoverable errors that happen on the client too.\r\n",
      reactions: {
        url: "https://api.github.com/repos/facebook/react/issues/28684/reactions",
        total_count: 0,
        "+1": 0,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
      timeline_url:
        "https://api.github.com/repos/facebook/react/issues/28684/timeline",
      performed_via_github_app: null,
      state_reaso: null,
    };

    //adding data in local storage
    setIssueData((prevData) => [...prevData, newIssue]);
    const newIssueData = JSON.stringify([...issueData, newIssue]);
    localStorage.setItem("issuesData", newIssueData);

    //empty textbox
    setTitle("");

    //close modal
    close();

    //refresh the page as soon as data is submitted
    window.location.reload();
  };

  return (
    <>
      <Modal open={open} onClose={close}>
        <Box sx={ModalStyle} className="modal-width">
          <Grid container>
            <Grid item xs={10} sm={11} md={10} lg={10} className="create-new-issue-title">
              Create New Issue
            </Grid>
            <Grid item xs={2} sm={1} md={2} lg={2}>
              <CloseIcon onClick={close} sx={{ cursor: "pointer" }} />
            </Grid>
          </Grid>
          <Grid container paddingTop={2}>
            <InputLabel className="create-issue-labels">Title</InputLabel>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ width: "100%" }}
              inputProps={{
                style:{
                  height:'5px'
                }
              }}
              required
            />
          </Grid>
          <Grid container paddingBottom={2} paddingTop={1}>
            <InputLabel className="create-issue-labels">Assignee</InputLabel>
            <Select 
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            sx={{ width: "100%", height:'35px' }}
            >
              <MenuItem value="none">None</MenuItem>
          {
          ["Sujata", "Deepak", "Pankaj"].map(assignee=>(
            <MenuItem value={assignee}>{assignee}</MenuItem>
          ))
          }
            </Select>
          </Grid>
          <Button variant="contained" onClick={handleAddIssue} disabled={title==='' || assignee==='none'}>
            CREATE ISSUE
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateNewIssueModal;
