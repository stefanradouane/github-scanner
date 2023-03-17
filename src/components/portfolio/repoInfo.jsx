import githubLogo_purple from "../../assets/github-purple.svg";
import license from "../../assets/license.svg";
import link from "../../assets/link.svg";
import star from "../../assets/star.svg";
import eye from "../../assets/eye.svg";

export default function RepoInfo(props) {
  const repo = props.repo;
  const id = props.currentId;
  console.log(repo);

  return (
    <section className="portfolio__repos-repo">
      {/* <a href={} target="_blank"> */}
      <h2>{repo.full_name.split("/")[1]}</h2>
      <p>{repo.description}</p>
      <ul>
        {repo.topics.map((topic, i) => (
          <li key={i}>{topic}</li>
        ))}
      </ul>
      <a target="_blank" href={repo.html_url}>
        <img src={githubLogo_purple} alt="logo gitHub" />
        Link naar repository
      </a>
      {repo.homepage && (
        <a target="_blank" href={repo.homepage}>
          <img src={link} alt="icon link" />
          Homepage
        </a>
      )}
      <p>
        <img src={star} alt="icon link" />
        {repo.stargazers_count}
      </p>
      <p>
        <img src={eye} alt="icon link" />
        {repo.watchers_count}
      </p>

      {repo.license && (
        <p>
          <img src={license} alt="icon link" />
          {repo.license.name}
        </p>
      )}

      {/* </a> */}
    </section>
  );
}
