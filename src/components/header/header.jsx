import { Search } from "../search/search";
import githubLogo from "../../assets/github.svg";

export default function Header(props) {
  const defaultValue = props.defaultValue;
  const setDefaultValue = props.setDefaultValue;
  const setQuery = props.setQuery;

  return (
    <header>
      {Search.element(defaultValue, setDefaultValue, setQuery)}
      <section>
        <span>
          <h3>GitHub</h3>
          <h4>Scanner</h4>
        </span>
        <img src={githubLogo} />
      </section>
    </header>
  );
}
