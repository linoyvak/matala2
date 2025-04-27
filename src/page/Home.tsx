import IProp from "../interface/IProp";


function Home(props:IProp) {
    return (
        <div className="home_component padding30">
            <h1>דף הבית</h1>
            <p></p>
            {
                props.isLogin &&
                <div>
                    <p>ברוך הבא משתמש  </p>

                </div>
            }
            {
                !props.isLogin &&
                <div>
                    <p>ברוך הבא אורח  </p>
                    <p>אתה מוזמן להירשם או להתחבר למערכת</p>
                </div>
            }
            
        </div>

    )
}

export default Home
