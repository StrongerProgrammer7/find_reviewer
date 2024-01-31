export interface IUser {
  login: string;
  repo: string;
  blacklist: Array<string>;
  loading?:boolean;
}
export interface IContributor {
  avatarUrl: string;
  login: string;
  generateReviewerImgSrc?: string;
  loading?:boolean;
}
