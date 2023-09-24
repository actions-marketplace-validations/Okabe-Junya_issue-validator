import { getInput } from '@actions/core';
import { getOctokit, context } from '@actions/github';

export async function getIssueTitleAndBody(issueNumber: number): Promise<{ title: string; body: string }> {
  const token = getInput('token', { required: true });
  const octokit = getOctokit(token);
  const { data: issue } = await octokit.rest.issues.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issueNumber,
  });
  issue.body = issue.body || '';
  return {
    title: issue.title,
    body: issue.body,
  };
}

export async function getPullRequestTitleAndBody(pullNumber: number): Promise<{ title: string; body: string }> {
  const token = getInput('token', { required: true });
  const octokit = getOctokit(token);
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullNumber,
  });
  pullRequest.body = pullRequest.body || '';
  return {
    title: pullRequest.title,
    body: pullRequest.body,
  };
}
