import IUserPayload from "./interface/IUserPayload";
import { IMethod } from "./interface/types";

const serverUrl = "http://localhost:3004";

function Fetch<T=any>(api:string, method:IMethod, body={}):Promise<T>{
    const token = localStorage.getItem("token");
    let obj :any = {method,headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer " + token
    }}
    if(method!="GET"){obj["body"]= JSON.stringify(body)}
    return new Promise((resolve,reject)=>{
        fetch(serverUrl+api,obj)
        .then(d=>d.json())
        .then(data=> {
            console.log("Fetch-data:",data);
            resolve(data)}
        )
        .catch(err=> reject(err))
    })
}

function isLoggedIn():boolean{
    if(!localStorage.getItem("token")) 
        return false;
    else
        return true;
}

function getUserPayload():IUserPayload{
    let payload =  localStorage.getItem("payload");
    if(payload)
        return JSON.parse(payload) as IUserPayload;
    else
        return {} as IUserPayload;
}



export {Fetch}
export {isLoggedIn}
export {getUserPayload}
