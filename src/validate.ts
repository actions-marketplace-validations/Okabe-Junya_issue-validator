import { getIssueTitleAndBody, getPullRequestTitleAndBody } from './utils';

export async function validateIssueTitleAndBody(
  issueType: string,
  issueNumber: number,
  titleRegex: RegExp | null,
  bodyRegex: RegExp | null,
): Promise<boolean> {
  if (!titleRegex && !bodyRegex) {
    return true;
  }
  if (issueType === 'issue') {
    const { title, body } = await getIssueTitleAndBody(issueNumber);
    if (titleRegex && !titleRegex.test(title)) {
      return false;
    }
    if (bodyRegex && !bodyRegex.test(body)) {
      return false;
    }
    return true;
  }
  if (issueType === 'pull_request') {
    const { title, body } = await getPullRequestTitleAndBody(issueNumber);
    if (titleRegex && !titleRegex.test(title)) {
      return false;
    }
    if (bodyRegex && !bodyRegex.test(body)) {
      return false;
    }
    return true;
  }
  throw new Error(`Invalid issue type: ${issueType}`);
}
