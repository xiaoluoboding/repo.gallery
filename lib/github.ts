import { Octokit } from "@octokit/rest"

export const octokit = new Octokit({
  auth: process.env.GITHUB_OAUTH_TOKEN,
})

export async function getRepo(url: string) {
  const repo = url.replace("https://github.com/", "")
  const data =
    (await fetch(`https://api.github.com/repos/${repo}`, {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600,
        },
      }),
    }).then((res) => res.json())) || {}

  console.log(data)

  const {
    name: title,
    full_name: slug,
    description,
    homepage,
    language,
    owner,
    stargazers_count: stars,
    open_issues_count: issues,
    forks,
    topics, 
  } = data

  return {
    author: owner.login,
    title,
    slug,
    description,
    homepage,
    language,
    topics,
    owner_name: owner?.login,
    owner_url: owner?.html_url,
    owner_avatar: owner?.avatar_url,
    owner_type: owner?.type,
    stars,
    forks,
    issues,
  }
}
