import Menu 					from './components/Menu';
import Home 					from './page/Home';
import Login 					from './page/Login';
import PostsList 				from './page/PostsList';
import IPost 					from './interface/IPost';
import Comment 					from './page/Comment';
import IUserPayload 			from './interface/IUserPayload';
import { getUserPayload, isLoggedIn } 			from './tools';
import { pageType } 			from './interface/types';
import { IGlobalState } 		from './interface/IProp';
import { useEffect,useState } 	from 'react'


function App() {

	const [page		  , setPage		 ] 	= useState<pageType>("Home");
	const [token	  , setToken	 ] 	= useState<string>("");
	const [isLogin	  , setIsLogin	 ]  = useState<boolean>(false);
	const [userPaylod , setUserPaylod] 	= useState<IUserPayload>(getUserPayload());
	const [avticePost , setAvticePost] 	= useState<IPost|null>(null);
	
	const globalState = {userPaylod, setUserPaylod,avticePost, setAvticePost,page, setPage,token,setToken,isLogin,setIsLogin} as IGlobalState;

	useEffect(()=>{
		setIsLogin(isLoggedIn());
		console.log("global-state",globalState);
	},[]);

	return (
		<div className='App_component rtl'>
			<Menu {...globalState} />
			{ page == "Home"     && <Home      {...globalState}/> }
			{ page == "Login"    && <Login     {...globalState}/> }
			{ page == "PostList" && <PostsList {...globalState}/> }
			{ page == "Comment"  && <Comment   {...globalState}/> }
		</div>
	)
}

export default App
