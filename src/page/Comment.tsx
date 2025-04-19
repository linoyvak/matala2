import IProp                   from "../interface/IProp";
import IComment                from "../interface/IComment";
import { useForm }             from "react-hook-form";
import { useEffect, useState } from "react";
import { Fetch, isLoggedIn }   from "../tools";


interface IFormInput {
    context: string;
}


function Comment(props:IProp) {
    const {register,handleSubmit,formState:{errors}} = useForm<IFormInput>(); 
    
    let [comments,setComments] = useState<IComment[]>([]);

    useEffect(()=>{
        if(!props.avticePost){
            props.setPage("PostList");
        }
        else{
            Fetch(`/posts/${props.avticePost._id}/comments`,"GET").then(comments=>{
                setComments(comments);
            }).catch(err=>{
                console.log(err)
            })
        }
    },[])

    const submitHandler = (data:IFormInput)=>{
        Fetch("/comments/","POST",{comment:data.context,postId:props.avticePost?._id}).then(data=>{
            alert("התגובה נוסף בהצלחה");
            setComments([...comments,{...data,owner:{_id:props.userPaylod._id}}])
        }).catch(err=>{
            alert("התגובה נכשל ");
            console.log(err)
        })
    };

    const deleteCommentHandler = (comment:IComment)=>{
        Fetch("/comments/"+comment._id , "DELETE").then(res=>{
            console.log("debug",res)
            setComments(comments.filter(v=>v._id!=comment._id))
        }).catch(err=>{
            console.log("debug",err)
        })
    }
    const updateCommentHandler = (comment:IComment)=>{
        Fetch("/comments/"+comment._id , "PUT",{comment:"update"}).then(res=>{
            comment.comment = prompt("הזן את התגובתך") as string;
            alert("התגובה נערכה בהצלחה")
            setComments([...comments]);
        }).catch(err=>{
            console.log("debug",err)
        })
    }

    const likeHandler = ()=>{
        Fetch(`/posts/${props.avticePost?._id}/like` ,"POST",{userId:props.userPaylod._id}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

  
    return (
        <div className="comment_component">
            <h1 className="size60 underline">{props.avticePost?.title}</h1>
            {
                <button className="margin-auto" onClick={likeHandler}>LIKE</button>
            }

            
            <h1 className="margin-top50 underline">רשימת תגובות</h1>
            {
                comments.map(comment=>{
                    return(
                        <div className="comment_item border margin10 flex-column gap10 padding10" key={comment._id}>
                            <div className="author center bold">{comment.owner.username || "me"}</div>
                            <div className="comment ">{comment.comment}</div>
                            {comment.owner._id==props.userPaylod._id && <button onClick={()=>deleteCommentHandler(comment)}>מחק</button>}
                            {comment.owner._id==props.userPaylod._id && <button onClick={()=>updateCommentHandler(comment)}>עדכן</button>}
                        </div>
                    )
                })
            }{
                isLoggedIn() &&
                <form className="flex-column gap10" onSubmit={handleSubmit(submitHandler)}>
                    <h1>הוסף הערה</h1>
                    <textarea  {...register("context",{required:"שדה זה חובה"})} />
                    {errors.context && <span className="red size10">{errors.context.message}</span>}
                    <input type="submit" />
                </form>
            }
        </div>
    )
}

export default Comment;
