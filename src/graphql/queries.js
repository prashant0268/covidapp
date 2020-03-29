/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPolicy = /* GraphQL */ `
  query GetPolicy($id: ID!) {
    getPolicy(id: $id) {
      id
      title
      country
      state
      tweetId
      effectiveFrom
    }
  }
`;
export const listPolicys = /* GraphQL */ `
  query ListPolicys(
    $filter: ModelPolicyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolicys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        country
        state
        tweetId
        effectiveFrom
      }
      nextToken
    }
  }
`;
