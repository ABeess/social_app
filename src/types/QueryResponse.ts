import { Post } from 'src/generated/graphql';
import { Maybe } from '.';
import {
  CommentResponse,
  FriendShipRecommendResponse,
  NotificationQueryResponse,
  QueryResponse,
  FriendShipRequestResponse,
  LikePostResponse,
  HoverCardResponse,
  ProfileUserResponse,
} from './Response';

export type Query = {
  __typename?: 'Query';
  getNotification: NotificationQueryResponse;
  postsQuery: AllPostResponse;
  getComment: CommentResponse;
  friendShipRecommend: FriendShipRecommendResponse;
  getFriendRequest: FriendShipRequestResponse;
  friendWaiting: FriendShipRequestResponse;
  getLikeByPost: LikePostResponse;
  hoverCard: HoverCardResponse;
  getProfileUser: ProfileUserResponse;
};

export type AllPostResponse = QueryResponse & {
  __typename?: 'AllPostResponse';
  page?: number;
  perPage?: number;
  posts: Array<Post>;
  totalCount?: number;
  totalPage?: number;
};

export type GetNotificationsResponse = Pick<Query, 'getNotification'>;
export type PostResponse = Pick<Query, 'postsQuery'>;
export type CommentQueryResponse = Pick<Query, 'getComment'>;
export type FriendRecommendQuery = Pick<Query, 'friendShipRecommend'>;
export type FriendRequestQuery = Pick<Query, 'getFriendRequest'>;
export type FriendWaitingQuery = Pick<Query, 'friendWaiting'>;
export type LikePostQuery = Pick<Query, 'getLikeByPost'>;
export type HoverCardQuery = Pick<Query, 'hoverCard'>;
export type ProfileUserQuery = Pick<Query, 'getProfileUser'>;
