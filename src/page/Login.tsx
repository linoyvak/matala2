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

function Login(props:IProp){
    return (
        <div className="login_register_componnet grid-col2-center borders">
            <LoginForm    {...props} />
            <RegisterForm {...props} />
        </div>
    )
}

function LoginForm(props:IProp){
    const {register,handleSubmit,formState: { errors }} = useForm<IFormInput>(); 

    const submitHandler = (data:IFormInput)=>{
        Fetch<IUserPayload>("/auth/login","POST",data).then(res=>{
            localStorage.setItem("token",res.accessToken);
            localStorage.setItem("payload",JSON.stringify(res));
            props.setIsLogin(true);
            props.setUserPaylod(res);
            props.setPage("Home");
        }).catch(err=>{
            alert("המייל או הסיסמה אינם נכונים");
            console.log(err);
        })
    };

    return (
        <form className="register flex-column-center gap5" onSubmit={handleSubmit(submitHandler)}>
            <h1>login</h1>

            <label>email</label>
            <input type="text" {...register("email" , validation.email)} />
            {errors.email && <span className="red size10">{errors.email.message}</span>}

            <label>password</label>
            <input type="password"  {...register("password" , validation.password)}/>
            {errors.password && <span className="red size10">{errors.password.message}</span>}

            <input type="submit" />
        </form>
    )
}

function RegisterForm(props:IProp){
    const {register,handleSubmit,formState: { errors }} = useForm<IFormInput>(); 

    function submitHandler(data:IFormInput){
        Fetch("/auth/register","POST",data).then(res=>{
            alert("נרשמת בהצלחה");
        }).catch(err=>{
            alert("המשתמש כבר קיים במערכת");
        })
    };

    return (
        <form className="register flex-column-center gap5" onSubmit={handleSubmit(submitHandler)}>
            <h1>register</h1>

            <label>username</label>
            <input type="text" {...register("username" , validation.username)} />
            {errors.username && <span className="red size10">{errors.username.message}</span>}

            <label>email</label>
            <input type="email" {...register("email" , validation.email)} />
            {errors.email && <span className="red size10">{errors.email.message}</span>}

            <label>password</label>
            <input type="password"  {...register("password" , validation.password)}/>
            {errors.password && <span className="red size10">{errors.password.message}</span>}

            <label>picture url</label>
            <input type="string" />

            <label>bio</label>
            <input type="string" />

            <input type="submit" />
        </form>
    )
}


export default Login;
