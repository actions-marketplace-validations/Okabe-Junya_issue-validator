import { getIssueTitleAndBody, getPullRequestTitleAndBody } from './utils';

export async function validateIssueTitleAndBody(
  issue_type: string,
  issue_number: number,
  title_regex: RegExp,
  body_regex: RegExp,
): Promise<boolean | { result: boolean }> {
  if (issue_type === 'issue') {
    const { title, body } = await getIssueTitleAndBody(issue_number);
    if (title_regex && !title_regex.test(title)) {
      return false;
    }
    if (body_regex && !body_regex.test(body)) {
      return false;
    }
    return true;
  }
  if (issue_type === 'pull_request') {
    const { title, body } = await getPullRequestTitleAndBody(issue_number);
    if (title_regex && !title_regex.test(title)) {
      return false;
    }
    if (body_regex && !body_regex.test(body)) {
      return false;
    }
    return true;
  }
  throw new Error(`Invalid issue type: ${issue_type}`);
}
