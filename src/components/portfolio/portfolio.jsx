import Header from "../header/header";
import Sidebar from "./sidebar";
import Repositories from "./repositories";
import getElement from "../getElement/getElement";
import RepoInfo from "./repoInfo";
import { useState } from "react";

export default function Portfolio(props) {
  const [currentId, setCurrentId] = useState(1);

  const data = props.data;
  const defaultValue = props.defaultValue;
  const setDefaultValue = props.setDefaultValue;
  const setQuery = props.setQuery;

  if (props.data.message == "" || props.data.message) {
    return (
      <>
        <Header
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setQuery={setQuery}
        />
        <main className="portfolio">
          <p>No user</p>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header
          defaultValue={defaultValue}
          setDefaultValue={setDefaultValue}
          setQuery={setQuery}
        />
        <main className="portfolio">
          <Sidebar user={data} />
          <Repositories
            user={data}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
          <RepoInfo repo={data.repos[currentId]} currentId={currentId} />
        </main>
      </>
    );
  }
}
