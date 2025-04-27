import IProp from "../interface/IProp";
import { useEffect, useState } from "react";
import { Fetch } from "../tools";
import Loading from "../components/Loading";
import IUserProfile from "../interface/IUserProfile";

export default function Profile(props:IProp){
        let [isLoading , setIsLoading] = useState(false);
        let [userProfile , setUserProfile] = useState<IUserProfile>({} as IUserProfile);

        useEffect(()=>{
            Fetch("/user/","GET").then(data=>{
                setIsLoading(true)
                setUserProfile(data)
            })

        },[]);



    if(!isLoading)
        return <Loading/>
    return(
        <div className="text-center">
            <div className="card-body">
                <h5 className="card-title m-4">פרטי משתמש</h5>
                <p className="card-text">username : {userProfile.username}</p>
                <p className="card-text">email : {userProfile.email}</p>
            </div>
        </div>
    )
}
