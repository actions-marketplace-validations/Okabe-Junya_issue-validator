import { getInput, setOutput, warning, setFailed } from '@actions/core';
import { validateIssueTitleAndBody } from './validate';
import { getOctokit, context } from '@actions/github';

export async function run() {
  try {
    const title = getInput('title') || '';
    const titleRegexFlags = getInput('title-regex-flags') || '';
    const titleRegex = new RegExp(title, titleRegexFlags);
    const body = getInput('body') || '';
    const bodyRegexFlags = getInput('body-regex-flags') || '';
    const bodyRegex = new RegExp(body, bodyRegexFlags);
    const issueType = getInput('issue-type') || '';
    const issueNumber = getInput('issue-number') || '';
    const isAutoClose = getInput('is-auto-close') || '';

    const octokit = getOctokit(getInput('github-token', { required: true }));
    const result = await validateIssueTitleAndBody(issueType, parseInt(issueNumber), titleRegex, bodyRegex);
    if (result === true) {
      setOutput('result', 'true');
    } else {
      if (isAutoClose === 'true') {
        warning(`Issue #${issueNumber} is not valid. Auto closing issue...`);
        // Add comment
        await octokit.rest.issues.createComment({
          owner: context.repo.owner,
          repo: context.repo.repo,
          issue_number: parseInt(issueNumber),
          body: `Issue #${issueNumber} is not valid: Reason: ${result}: auto closing issue...`,
        });

        // Close issue
        await octokit.rest.issues.update({
          owner: context.repo.owner,
          repo: context.repo.repo,
          issue_number: parseInt(issueNumber),
          state: 'closed',
        });
      }
      setOutput('result', 'false');
    }
    /* eslint @typescript-eslint/no-explicit-any: 0,  @typescript-eslint/no-unsafe-argument: 0, @typescript-eslint/no-unsafe-member-access: 0, @typescript-eslint/no-floating-promises: 0 */
  } catch (error: any) {
    setFailed(error.message);
  }
}

run();
