export default function endpoint(query, type) {
  if (type == "user") {
    return query == "stefanradouane" ? `GET /user` : `GET /users/${query}`;
  } else if (type == "repos") {
    return query == "stefanradouane"
      ? `GET /user/repos`
      : `GET /users/${query}/repos`;
  }
}
