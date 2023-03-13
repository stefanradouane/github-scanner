// import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

import { Octokit, App } from "https://cdn.skypack.dev/octokit";
// const octokit = new Octokit({
//     auth: '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'
// })

// await octokit.request('GET /user', {
// headers: {
//     'X-GitHub-Api-Version': '2022-11-28',
// }
// })

// import { Octokit, App } from "octokit";
// const octokit = new Octokit({ auth: '' });

// export default function api () {
//     return {"data": { login }} = await octokit.rest.users.getAuthenticated();
//     console.log("Hello, %s", login);
// }

// const octokit = new Octokit({ auth: `personal-access-token123` });
class Api {
    get = async (endpoint) => {
        const response = await fetch(endpoint)

        // const response = await fetch(endpoint, {headers: {
        //     "Content-Type": "application/json",
        //     // "Authorization": "token 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",
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //   },});
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = response.json()
        return data
    };

    post = async (endpoint, body) => {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = response.json()
        return data
    }
}

export const api = new Api