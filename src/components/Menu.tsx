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
    const profileHandler  = ()=> props.setPage("Profile");


    return (
        <div className="menu_component d-flex justify-content-center py-3 cursor-pointer m-4 mb-5 border">
            <ul className="nav nav-pills">
                <li className="nav-item nav-link pointer border" onClick={homeHandler}> home</li>
                {!props.isLogin && <li className="nav-item nav-link pointer border" onClick={loginHandler}> login & register</li>}
                {props.isLogin  && <li className="nav-item nav-link pointer border" onClick={postHandler}> posts </li>}
                {props.isLogin  && <li className="nav-item nav-link pointer border" onClick={profileHandler}> profile </li>}
                {props.isLogin  && <li className="nav-item nav-link pointer border" onClick={logoutHandler}> logout </li>}
            </ul>
        </div>
    )
}

export default Menu;
