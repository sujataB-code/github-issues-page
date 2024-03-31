import { BrowserRouter, Routes, Route } from "react-router-dom";
import IssuesPage from "./page/issues/issuesPage";
import Actions from "./page/actions";
import Code from "./page/code";
import Insight from "./page/insight";
import Project from "./page/project";
import PullRequest from "./page/pullRequests";
import Security from "./page/security";
import Wiki from "./page/wiki";
import Header from "./header/header";

const RoutesPage = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<IssuesPage />} />
          <Route path="actions" element={<Actions />} />
          <Route path="code" element={<Code />} />
          <Route path="insight" element={<Insight />} />
          <Route path="project" element={<Project />} />
          <Route path="pullrequest" element={<PullRequest />} />
          <Route path="security" element={<Security />} />
          <Route path="wiki" element={<Wiki />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default RoutesPage;
