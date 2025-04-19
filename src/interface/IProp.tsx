import { Dispatch, SetStateAction } from "react";
import { pageType } from "./types"
import IPost from "./IPost";
import IUserPayload from "./IUserPayload";


export interface IGlobalState{
    page            :pageType;
    token           :string;
    isLogin         :boolean;
    avticePost      :IPost|null;
    userPaylod      :IUserPayload;
    setPage         :Dispatch<SetStateAction<pageType>>;
    setToken        :Dispatch<SetStateAction<string>>;
    setIsLogin      :Dispatch<SetStateAction<boolean>>;
    setAvticePost   :Dispatch<SetStateAction<IPost| null>>;
    setUserPaylod   :Dispatch<SetStateAction<IUserPayload>>;
}


export default interface IProp extends IGlobalState {}