import IProp from "../interface/IProp";


function Home(props:IProp) {

    return (
        <div className="home_component padding30">
            <h1>Home Page</h1>
            <p></p>
            {
                props.isLogin &&
                <div>
                    <p>Welcome user to my website</p>
                </div>
            }
            {
                !props.isLogin &&
                <div>
                    <p>Welcome geust</p>
                    <p>You can register or login to my website</p>

                </div>
            }
            
        </div>

    )
}

export default Home
