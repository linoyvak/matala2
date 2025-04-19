import Loading                  from "../components/Loading";
import IProp                    from "../interface/IProp";
import IPost                    from "../interface/IPost";
import { Fetch, isLoggedIn }    from "../tools";
import { useForm }              from "react-hook-form";
import { useEffect, useState }  from "react";
import { validation } from "../formValidation";

interface IFormInput {
    title   :string;
    context :string;
}

function PostsList(props:IProp) {
    const {register,handleSubmit,formState: { errors }} = useForm<IFormInput>(); 

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
        }).catch(err=>{
            alert("הפוסט נכשל ");
            console.log(err)
        })
    };

    const postClickHandler=(post:IPost)=>{
        props.setAvticePost(post);
        props.setPage("Comment")
    };

    if(!isLoad){
        return <Loading/>
    }
    else{
        return (
            <div className="PostsList_component flex-column padding20">
                {
                    isLoggedIn() &&
                    <form className="flex-column gap10 margin-bottom10" onSubmit={handleSubmit(submitHandler)}>
                        <h1 className="margin-bottom0 underline">הוספת פוסט</h1>

                        <label>title</label>
                        <input type="text" {...register("title" , validation.title)} />
                        {errors.title && <span className="red size10">{errors.title.message}</span>}

                        <label>context</label>
                        <textarea  {...register("context" , validation.context)} />
                        {errors.context && <span className="red size10">{errors.context.message}</span>}

                        <input className="" type="submit"  />
                    </form>
                }

                <h1 className="underline">רשימת פוסטים</h1>
                {
                    posts.map(post=>{
                        return(
                            <div className="post_item border margin10 flex-column gap10 pointer padding10" onClick={()=>postClickHandler(post)} key={post._id}>
                                <div className="title center bold underline size25" >{post.title}         </div>
                                <div className="author center">created by: {post.owner.username}</div>
                                <div className="likes left" >likes:{post.likes.length}  </div>

                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default PostsList;