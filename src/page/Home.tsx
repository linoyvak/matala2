import IProp from "../interface/IProp";


function Home(props:IProp) {
    return (
        <div className="home_component padding30">
            <h1>דף הבית</h1>
            {
                props.isLogin &&
                <p>ברוך הבא משתמש  </p>
            }
        </div>

    )
}

export default Home
