import githubLogo_purple from "../../assets/github-purple.svg";
import linkIcon from "../../assets/link.svg";

export default function Sidebar(props) {
  let user = props.user;
  if (user.message == "" || user.message) {
    return <p>No user</p>;
  } else {
    user = props.user.user;
    return (
      <aside className="portfolio__sidebar">
        <img src={user.avatar_url} alt="User Avatar" />
        {user.name && <h2>{user.name}</h2>}
        <h3>{user.login}</h3>

        <a href={user.html_url}>
          <img src={githubLogo_purple} alt="logo gitHub" />
          Mijn GitHub
        </a>
        {user.blog && (
          <a href={user.blog}>
            <img src={linkIcon} alt="icon link" />
            Mijn site
          </a>
        )}
        {user.bio && <p>{user.bio}</p>}
        {user.company && <p>{user.company}</p>}
      </aside>
    );
  }
}
