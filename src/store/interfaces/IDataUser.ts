export interface IUser {
  login: string;
  repo: string;
  blacklist: Array<string>;
}
export interface IContributor {
  avatarUrl: string;
  login: string;
  generateReviewerImgSrc?: string
}
