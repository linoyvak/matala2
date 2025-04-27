import Loading                  from "../components/Loading";
import IProp                    from "../interface/IProp";
import IPost                    from "../interface/IPost";
import { Fetch, isLoggedIn }    from "../tools";
import { useForm }              from "react-hook-form";
import { useEffect, useState }  from "react";
import { validation } from "../formValidation";

interface IFormInput {
    title   :string;
    content :string;
}

function PostsList(props:IProp) {
    const {register,setValue,handleSubmit,formState: { errors }} = useForm<IFormInput>(); 

    const [ isLoad , setIsLoad ] = useState(false);
    const [ posts  , setPosts  ] = useState<IPost[]>([]);

    useEffect(()=>{
        Fetch<IPost[]>("/posts/","GET").then(posts=>{
            setPosts(posts);
            setIsLoad(true);
        }).catch(err=>{
            console.log(err)
        })
    },[]);

    const submitHandler=(data:IFormInput)=>{
        Fetch("/posts/","POST",data).then(data=>{
            alert("הפוסט נשלח בהצלחה");
            setPosts([...posts,data])
            setValue("content","")
            setValue("title","")
        }).catch(err=>{
            alert("הפוסט נכשל ");
            console.log(err)
        })
    };

    const postClickHandler=(post:IPost)=>{
        props.setAvticePost(post);
        props.setPage("Comment")
    };

    const deleteCommentHandler = (post:IPost)=>{
        Fetch("/posts/"+post._id , "DELETE").then(res=>{
            console.log("debug",res)
            setPosts(posts.filter(v=>v._id!=post._id))
        }).catch(err=>{
            console.log("debug",err)
        })
    }
    const updateCommentHandler = (post:IPost)=>{
        let newTitle = prompt("הזן את נושא הפוסט") as string;
        let newContext = prompt("הזן את תוכן הפוסט") as string;

        Fetch("/posts/"+post._id , "PUT",{title:newTitle,content:newContext}).then(res=>{
            post.title = newTitle;
            post.content = newContext;
            alert("הפוסט נערך בהצלחה")
            setPosts([...posts]);
            props.setPage("PostList")
        }).catch(err=>{
            console.log("debug",err)
        })
    }

    if(!isLoad){
        return <Loading/>
    } 
    else{
        return (
            <div className="PostsList_component d-flex flex-column justify-content-center">
                <h1 className="underline mb-4">רשימת פוסטים</h1>
                {
                    posts.map(post=>{
                        return(
                            <div className="post_item w-50 m-auto mb-3 border p-4" key={post._id}>
                                <div className="pointer" onClick={()=>postClickHandler(post)}>
                                    <div className="title text-decoration-underline fs-4 text-center" >{post.title}         </div>
                                    <div className="author text-center">created by: {post.owner.username ||"me"}</div>
                                    <div className="likes text-center" >likes:{post.likes.length}  </div>
                                </div>
                                <div className="text-center">
                                    {(post.owner._id==props.userPaylod._id) && <button onClick={()=>deleteCommentHandler(post)}>מחק</button>}
                                    {(post.owner._id==props.userPaylod._id) && <button onClick={()=>updateCommentHandler(post)}>עדכן</button>}
                                </div>
                            </div>
                        )
                    })
                }
                {
                    isLoggedIn() &&
                    <form className="m-auto d-flex flex-column gap-3 w-50 p-4 border " onSubmit={handleSubmit(submitHandler)}>
                        <h1 className="margin-bottom0 underline">הוספת פוסט</h1>

                        <label>title</label>
                        <input type="text" className="rtl" {...register("title" , validation.title)} />
                        {errors.title && <span className="text-danger">{errors.title.message}</span>}

                        <label>context</label>
                        <textarea className="rtl"  {...register("content" , validation.context)} />
                        {errors.content && <span className="text-danger">{errors.content.message}</span>}

                        <input className="" type="submit"  />
                    </form>
                }


            </div>
        );
    }
}

export default PostsList;