import { expect } from '@jest/globals';
import { validateIssueTitleAndBody } from './validate';

describe('validateIssueTitleAndBody', () => {
  it('returns true if only title_regex is set and title matches', async () => {
    // mock implementation of getIssueTitleAndBody
    const mockGetIssueTitleAndBody = jest.fn().mockReturnValue({
      title: 'sample issue title',
      body: 'sample issue body',
    });

    // mock implementation of getPullRequestTitleAndBody
    const mockGetPullRequestTitleAndBody = jest.fn().mockReturnValue({
      title: 'sample pull request title',
      body: 'sample pull request body',
    });

    const utils = require('./utils');
    utils.getIssueTitleAndBody = mockGetIssueTitleAndBody;
    utils.getPullRequestTitleAndBody = mockGetPullRequestTitleAndBody;

    // run the test
    // 'sample' という文字列が title に含まれているかどうか検証する
    const result = await validateIssueTitleAndBody('issue', 1, /sample/, null);
    expect(result).toBe(true);
    expect(mockGetIssueTitleAndBody).toHaveBeenCalledWith(1);
    expect(mockGetPullRequestTitleAndBody).not.toHaveBeenCalled();
  });

  it('returns true if only body_regex is set and body matches', async () => {
    // mock implementation of getIssueTitleAndBody
    const mockGetIssueTitleAndBody = jest.fn().mockReturnValue({
      title: 'sample issue title',
      body: 'sample issue body',
    });

    // mock implementation of getPullRequestTitleAndBody
    const mockGetPullRequestTitleAndBody = jest.fn().mockReturnValue({
      title: 'sample pull request title',
      body: 'sample pull request body',
    });

    const utils = require('./utils');
    utils.getIssueTitleAndBody = mockGetIssueTitleAndBody;
    utils.getPullRequestTitleAndBody = mockGetPullRequestTitleAndBody;

    // run the test
    // 'sample' という文字列が body に含まれているかどうか検証する
    const result = await validateIssueTitleAndBody('issue', 1, null, /sample/);
    expect(result).toBe(true);
    expect(mockGetIssueTitleAndBody).toHaveBeenCalledWith(1);
    expect(mockGetPullRequestTitleAndBody).not.toHaveBeenCalled();
  });

  it('returns true if both title_regex and body_regex are set and both match', async () => {
    // mock implementation of getIssueTitleAndBody
    const mockGetIssueTitleAndBody = jest.fn().mockReturnValue({
      title: 'sample issue title',
      body: 'sample issue body',
    });

    // mock implementation of getPullRequestTitleAndBody
    const mockGetPullRequestTitleAndBody = jest.fn().mockReturnValue({
      title: 'sample pull request title',
      body: 'sample pull request body',
    });

    const utils = require('./utils');
    utils.getIssueTitleAndBody = mockGetIssueTitleAndBody;
    utils.getPullRequestTitleAndBody = mockGetPullRequestTitleAndBody;

    // run the test
    // 'sample' という文字列が title と body に含まれているかどうか検証する
    const result = await validateIssueTitleAndBody(
      'issue',
      1,
      /sample/,
      /sample/,
    );
    expect(result).toBe(true);
    expect(mockGetIssueTitleAndBody).toHaveBeenCalledWith(1);
    expect(mockGetPullRequestTitleAndBody).not.toHaveBeenCalled();
  });
});
