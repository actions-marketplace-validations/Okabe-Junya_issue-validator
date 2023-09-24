import * as core from '@actions/core';
import { validateIssueTitleAndBody } from './validate';

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
    const result = await validateIssueTitleAndBody(
      issue_type,
      parseInt(issue_number),
      title_regex,
      body_regex,
    );
    if (result === true) {
      core.setOutput('result', 'true');
    } else {
      core.setOutput('result', 'false');
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
