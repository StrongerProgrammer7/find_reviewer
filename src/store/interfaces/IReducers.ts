import { IUser } from "./IDataUser";
import { IReviewer } from "./IDataUser";
export interface RootState {
    userReducer: IUser;
    reviewerReducer: IReviewer;
  }
  