import IProp                   from "../interface/IProp";
import IComment                from "../interface/IComment";
import { useForm }             from "react-hook-form";
import { useEffect, useState } from "react";
import { Fetch, isLoggedIn }   from "../tools";


interface IFormInput {
    context: string;
}


function Comment(props:IProp) {
    const {register,handleSubmit,setValue,formState:{errors}} = useForm<IFormInput>(); 
    
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
            setValue("context","");
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
        let newComment = prompt("הזן את התגובתך") as string;
        Fetch("/comments/"+comment._id , "PUT",{comment:newComment}).then(res=>{
            comment.comment = newComment;
            alert("התגובה נערכה בהצלחה")
            setComments([...comments]);
        }).catch(err=>{
            console.log("debug",err)
        })
    }

    const likeHandler = ()=>{
        Fetch(`/posts/${props.avticePost?._id}/like` ,"POST",{userId:props.userPaylod._id}).then(res=>{
            console.log(res)
            alert("עשית ליק לפוסט")
        }).catch(err=>{
            console.log(err)
        })
    }

  
    return (
        <div className="comment_component d-flex flex-column justify-content-center ">
            <h1 className="m-2">
                נושא: {props.avticePost?.title}
                <button className="btn "  onClick={likeHandler}> 👍 </button>
            </h1>
            <span className="mb-5 text-center fs-4">{props.avticePost?.content}</span>
            
                        
            <h1 className="margin-top50 underline">רשימת תגובות</h1>
            {
                comments.map(comment=>{
                    return(
                        <div className="comment_item w-50 m-auto mb-3 border p-4" key={comment._id}>
                            <div className="author text-decoration-underline fs-4 text-center">{comment.owner.username || "me"}</div>
                            <div className="comment ">{comment.comment}</div>
                            <div className="text-center">
                                {comment.owner._id==props.userPaylod._id && <button onClick={()=>deleteCommentHandler(comment)}>מחק</button>}
                                {comment.owner._id==props.userPaylod._id && <button onClick={()=>updateCommentHandler(comment)}>עדכן</button>}
                            </div>
                        </div>
                    )
                })
            }{
                isLoggedIn() &&
                <form className="m-auto d-flex flex-column gap-3 w-50 p-4 border" onSubmit={handleSubmit(submitHandler)}>
                    <h1>הוסף הערה</h1>
                    <textarea  {...register("context",{required:"שדה זה חובה"})} />
                    {errors.context && <span className="text-danger">{errors.context.message}</span>}
                    <input type="submit" />
                </form>
            }
        </div>
    )
}

export default Comment;
