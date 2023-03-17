import { Search } from "../../components/search/search";
import githubLogo from "../../assets/github.svg";

export default function Home(props) {
  const defaultValue = props.defaultValue;
  const setDefaultValue = props.setDefaultValue;
  const setQuery = props.setQuery;

  return (
    <dialog className="home">
      <img src={githubLogo} className="logo" alt="Github logo" />
      <h1 className="title title--h1">GitHub</h1>
      <h2 className="title title--h2">Scanner</h2>
      {Search.element(defaultValue, setDefaultValue, setQuery)}
    </dialog>
  );
}
