export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user: User;
};

export type Feed = {
  __typename?: 'Feed';
  count: Scalars['Int'];
  posts: Array<Post>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePost: Scalars['Boolean'];
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
  unVote: Vote;
  updatePost: Post;
  vote: Vote;
};


export type MutationCreatePostArgs = {
  description: Scalars['String'];
  url: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUnVoteArgs = {
  postId: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  description: Scalars['String'];
  id: Scalars['ID'];
  url: Scalars['String'];
};


export type MutationVoteArgs = {
  postId: Scalars['ID'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isVotedByMe: Scalars['Boolean'];
  postedBy: User;
  url: Scalars['String'];
  votes: Array<Vote>;
};

export type Query = {
  __typename?: 'Query';
  authenticate?: Maybe<Scalars['Boolean']>;
  feed: Feed;
  post: Post;
  user: User;
};


export type QueryAuthenticateArgs = {
  token: Scalars['String'];
};


export type QueryFeedArgs = {
  filter?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type Subscription = {
  __typename?: 'Subscription';
  postCreated: Post;
  postVoted: Vote;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<Post>;
  votes: Array<Vote>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  post: Post;
  user: User;
};
