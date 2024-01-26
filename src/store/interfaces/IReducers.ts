import { IUser } from "./IDataUser";
import { IReviewer } from "./IDataUser";
import { ILoadings } from "./ILoadings";
export interface RootState {
    userReducer: IUser;
    reviewerReducer: IReviewer;
    loadingsReducer: ILoadings
} 