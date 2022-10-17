import {
  AddFriendResponse,
  BaseResponse,
  CreatePostResponse,
  LikePostResponse,
  UpdateUserProfileResponse,
  UserResponse,
} from './Response';

export type Mutation = {
  login: UserResponse;
  register: UserResponse;
  markAsRead: BaseResponse;
  createComment: BaseResponse;
  replyComment: BaseResponse;
  createPost: CreatePostResponse;
  addFriend: AddFriendResponse;
  likePost: LikePostResponse;
  unLikePost: BaseResponse;
  updateProfile: UpdateUserProfileResponse;
};

export type LoginMutation = Pick<Mutation, 'login'>;
export type RegisterMutation = Pick<Mutation, 'register'>;
export type MaskAsReadMutation = Pick<Mutation, 'markAsRead'>;
export type CreateCommentMutation = Pick<Mutation, 'createComment'>;
export type ReplyCommentMutation = Pick<Mutation, 'replyComment'>;
export type CreatePostMutation = Pick<Mutation, 'createPost'>;
export type AddFriendMutation = Pick<Mutation, 'addFriend'>;
export type LikePostMutation = Pick<Mutation, 'likePost'>;
export type UnLikePostMutation = Pick<Mutation, 'unLikePost'>;
export type UpdateProfileMutation = Pick<Mutation, 'updateProfile'>;
