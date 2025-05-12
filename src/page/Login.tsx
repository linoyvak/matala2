import IProp          from "../interface/IProp";
import IUserPayload   from "../interface/IUserPayload";
import { useForm }    from "react-hook-form";
import { Fetch }      from "../tools";
import { validation } from "../formValidation";

interface IFormInput {
    username    :string;
    email       :string;
    password    :string;

}

export default function Login(props:IProp){
    return (
        <div className="loginAndregister_componnet contianer">
            <div className="row">
                <LoginForm    {...props} />
                <RegisterForm {...props} />
            </div>
        </div>
    )
}


function LoginForm(props:IProp){
    const {register,handleSubmit,formState: { errors }} = useForm<IFormInput>(); 

    const submitHandler = (data:IFormInput)=>{
        Fetch<IUserPayload>("/auth/login","POST",data)
        .then(res=>{
            localStorage.setItem("token",res.accessToken);
            localStorage.setItem("payload",JSON.stringify(res));
            props.setIsLogin(true);
            props.setUserPaylod(res);
            props.setPage("Home");
        })
        .catch(err=>{
            alert("email or password isnt corrent ");
            console.log(err);
        })
    };

    return (
        <div className="row justify-content-center col-6">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <h4 className="card-header bg-primary text-white text-center">login form</h4>

                    <div className="card-body">
                        <form className="login_component" onSubmit={handleSubmit(submitHandler)}>
                            <div className="mb-3">
                                <label className="form-label">email</label>
                                <input className="form-control" type="text" {...register("email" , validation.email)} />
                                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">password</label>
                                <input type="password" className="form-control" {...register("password" , validation.password)}/>
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                            </div>
                            <input type="submit" className="btn btn-primary w-100"/>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

function RegisterForm(props:IProp){
    const {register,reset,handleSubmit,formState: { errors }} = useForm<IFormInput>(); 

    function submitHandler(data:IFormInput){
        Fetch("/auth/register","POST",data)
        .then(res=>{
            alert("register successed");
            reset()
        })
        .catch( err => {
            alert("user alright exist");
        })
    };

    return (
        <div className="row justify-content-center col-6">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <h4 className="card-header bg-primary text-white text-center">register form</h4>

                    <div className="card-body">
                        <form className="login_component" onSubmit={handleSubmit(submitHandler)}>
                            <div className="mb-3">
                                <label className="form-label">username</label>
                                <input type="text" className="form-control" {...register("username" , validation.username)} />
                                {errors.username && <span className="text-danger">{errors.username.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">email</label>
                                <input type="email" className="form-control"  {...register("email" , validation.email)} />
                                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">password</label>
                                <input type="password" className="form-control"  {...register("password" , validation.password)}/>
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                            </div>
                            <input type="submit" className="btn btn-primary w-100"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

