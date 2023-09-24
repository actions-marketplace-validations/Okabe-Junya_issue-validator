import * as core from '@actions/core';
import * as github from '@actions/github';

export async function getIssueTitleAndBody(
  issue_number: number,
): Promise<{ title: string; body: string }> {
  const token = core.getInput('token', { required: true });
  const octokit = github.getOctokit(token);
  const { data: issue } = await octokit.rest.issues.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number,
  });
  issue.body = issue.body || '';
  return {
    title: issue.title,
    body: issue.body,
  };
}

export async function getPullRequestTitleAndBody(
  pull_number: number,
): Promise<{ title: string; body: string }> {
  const token = core.getInput('token', { required: true });
  const octokit = github.getOctokit(token);
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number,
  });
  pullRequest.body = pullRequest.body || '';
  return {
    title: pullRequest.title,
    body: pullRequest.body,
  };
}
