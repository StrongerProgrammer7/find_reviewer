import { IContributor, IUser } from "./IDataUser";
import { ILoadings } from "./ILoadings";
export interface RootState {
    userReducer: IUser;
    reviewerReducer: IContributor;
    loadingsReducer: ILoadings
} 