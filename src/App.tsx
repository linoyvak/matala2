import Menu 					from './components/Menu';
import Home 					from './page/Home';
import Login 					from './page/Login';
import PostsList 				from './page/PostsList';
import IPost 					from './interface/IPost';
import Comment 					from './page/Comment';
import IUserPayload 			from './interface/IUserPayload';
import { getUserPayload, isLoggedIn } from './tools';
import { pageType } 			from './interface/types';
import { IGlobalState } 		from './interface/IProp';
import { useEffect,useState } 	from 'react'
import Profile from './page/Profile';
import Loading from './components/Loading';


function App() {

	const [page		  , setPage		 ] 	= useState<pageType>("Home");
	const [token	  , setToken	 ] 	= useState<string>("");
	const [isLogin	  , setIsLogin	 ]  = useState<boolean>(false);
	const [userPaylod , setUserPaylod] 	= useState<IUserPayload>(getUserPayload());
	const [avticePost , setAvticePost] 	= useState<IPost|null>(null);
	let [isLoading , setIsLoading] 	= useState<boolean>(false);


	const globalState = {userPaylod, setUserPaylod,avticePost, setAvticePost,page, setPage,token,setToken,isLogin,setIsLogin} as IGlobalState;


	useEffect(()=>{
		setIsLogin(isLoggedIn());
		setIsLoading(true)
	},[]);
	


	if(!isLoading)
		return <Loading/>
	return (
		<div className='App_component ltr p-3'>
			<Menu {...globalState} />
			{ page == "Home"     && <Home      {...globalState}/> }
			{ page == "Login"    && <Login     {...globalState}/> }
			{ page == "PostList" && <PostsList {...globalState}/> }
			{ page == "Comment"  && <Comment   {...globalState}/> }
			{ page == "Profile"  && <Profile   {...globalState}/> }
		</div>
	)
}
 
export default App

 
