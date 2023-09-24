import * as core from '@actions/core';
import { validateIssueTitleAndBody } from './validate';
import * as github from '@actions/github';

export async function run() {
  try {
    const title = core.getInput('title') || '';
    const title_regex_flags = core.getInput('title-regex-flags') || '';
    const title_regex = new RegExp(title, title_regex_flags);
    const body = core.getInput('body') || '';
    const body_regex_flags = core.getInput('body-regex-flags') || '';
    const body_regex = new RegExp(body, body_regex_flags);
    const issue_type = core.getInput('issue-type') || '';
    const issue_number = core.getInput('issue-number') || '';
    const is_auto_close = core.getInput('is-auto-close') || '';

    const octokit = github.getOctokit(core.getInput('github-token'));
    const result = await validateIssueTitleAndBody(issue_type, parseInt(issue_number), title_regex, body_regex);
    if (result === true) {
      core.setOutput('result', 'true');
    } else {
      if (is_auto_close === 'true') {
        core.warning(`Issue #${issue_number} is not valid. Auto closing issue...`);
        // Add comment
        await octokit.rest.issues.createComment({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          issue_number: parseInt(issue_number),
          body: `Issue #${issue_number} is not valid: Reason: ${result}: auto closing issue...`,
        });

        // Close issue
        await octokit.rest.issues.update({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          issue_number: parseInt(issue_number),
          state: 'closed',
        });
      }
      core.setOutput('result', 'false');
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
