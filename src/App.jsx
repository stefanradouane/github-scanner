import { useState } from "react";
import githubLogo from "./assets/github.svg";
import loopIcon from "./assets/loop.svg";
import { api } from "./components/api/api";
import { form } from "./components/form/form";
import { useEffect } from "react";
import { Search } from "./components/search/search";
// import './App.scss'

function App() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState(githubLogo);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const searchQuery = (e) => {};

  // console.log(api.get("https://api.github.com/users/stefanradouane"))
  return (
    <section>
      <img src={image} className="logo" alt="Github logo" />
      <h1 className="title title--h1">GitHub</h1>
      <h2 className="title title--h2">Scanner</h2>
      {Search.node(setData)}
      {/* <form className="search">
      <input className="search__input" type="text" name="query" />
      <button className="control" onClick={searchQuery}>
        <img src={loopIcon} className="icon icon--loop" alt="Loop logo" />
      </button>
    </form> */}
    </section>
  );
}

export default App;
