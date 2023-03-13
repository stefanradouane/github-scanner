import { octokit } from "../octokit/octokit";

class Api {
  get = async (endpoint) => {
    const response = await octokit().request("GET /users");

    // If response is not 200
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log(response);

    console.log(
      `Remaining fetches: ${response.headers["x-ratelimit-remaining"]}`
    );

    return response.data;
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
