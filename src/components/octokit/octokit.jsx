import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

export const octokit = () => {
  const token = import.meta.env.VITE_GH_TOKEN;
  return new Octokit({ auth: token });
};
