import IProp from "../interface/IProp";
import { useEffect, useState } from "react";
import { Fetch } from "../tools";
import Loading from "../components/Loading";
import IUserProfile from "../interface/IUserProfile";
import { useForm } from "react-hook-form";
import { validation } from "../formValidation";

interface IFormInput {
    username    :string;
    password    :string;
}

export default function Profile(props:IProp){
        let [isLoading , setIsLoading] = useState(false);
        let [userProfile , setUserProfile] = useState<IUserProfile>({} as IUserProfile);

        const {register,handleSubmit,formState: { errors }} = useForm<IFormInput>(); 


        useEffect(()=>{
            Fetch<IUserProfile>("/user/","GET").then(data=>{
                setIsLoading(true)
                setUserProfile(data)
            })

        },[]);


        const submitHandler = (data:IFormInput)=>{
            Fetch("/user/update/" ,"PUT" , {id: props.userPaylod._id ,username:data.username , newPassword:data.password})
            .then(upd=>{
                alert("profile update")
            })
            .catch(err=> alert("update failed"))
        }


    if(!isLoading)
        return <Loading/>
    return(
        <form className="text-center" onSubmit={handleSubmit(submitHandler)}>
            <div className="card-body">
                <h5 className="card-title m-4">Profile</h5>
                <br/>
                <p className="card-text">email : {userProfile.email}</p>
                <br/>
                
                <label>username:</label>
                 <br/>
                <input className="text-center" defaultValue={userProfile.username}  {...register("username" , validation.username)} />
                <br/>
                {errors.username && <span className="text-danger">{errors.username.message}</span>}

                 <br/>
                 <br/>
               
                <label>password:</label>
                 <br/>
                <input className="text-center" type="password"  {...register("password" , validation.passwordNoRequire)} />
                <br/>
                {errors.password && <span className="text-danger">{errors.password.message}</span>}

                
            </div>
             <br/>
            <br/>
            <input type="submit"/>
        </form>
    )
}
