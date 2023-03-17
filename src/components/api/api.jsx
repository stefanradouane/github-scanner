import { octokit } from "../octokit/octokit";
import endpoint from "./endpoint";

class Api {
  get = async (query) => {
    const response = octokit()
      .request(endpoint(query, "user"))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });

    const res = await response;
    let count;

    switch (res.status) {
      case 200:
        count = `Remaining fetches: ${res.headers["x-ratelimit-remaining"]}`;
        console.log(res);
        console.log(count);

        const repositories = octokit()
          .request(endpoint(query, "repos"))
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return err;
          });

        return { user: res.data, repos: [{}, ...(await repositories).data] };
      case 404:
        count = `Remaining fetches: ${res.response.headers["x-ratelimit-remaining"]}`;
        console.log(count);
        return res.response.data;
    }
  };

  post = async (endpoint, body) => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = response.json();
    return data;
  };
}

export const api = new Api();
