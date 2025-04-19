import IProp from "../interface/IProp";



function Menu(props:IProp) {

    const logoutHandler = ()=>{
        props.setIsLogin(false);
        props.setPage("Home");
        props.setUserPaylod({} as any);
        localStorage.removeItem("token");
        localStorage.removeItem("payload");
    }
    const loginHandler = ()=> props.setPage("Login");
    const homeHandler  = ()=> props.setPage("Home");
    const postHandler  = ()=> props.setPage("PostList");

    return (
        <div className="menu_component">
            <div className="menuStyle border padding20 flex-center gap10">
                <button onClick={homeHandler}>דף הבית</button>
                {!props.isLogin && <button onClick={loginHandler} >    התחברות והרשמה  </button> }
                {props.isLogin  && <button onClick={logoutHandler}>    התנתקות         </button> }
                {props.isLogin  && <button onClick={postHandler}  >    פוסטים          </button>}
            </div>
        </div>
    )
}

export default Menu;
