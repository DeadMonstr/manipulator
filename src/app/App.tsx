import React from 'react';
import ManipulatorApp from "pages/manipulator/ManipulatorInterface";
import StoreProvider from "app/store/ui/StoreProvider";
import {useSelector} from "react-redux";
import {getAuth} from "entity/user/model/userSelector";
import Login from "pages/login/login";

function App() {

    const auth = useSelector(getAuth)



    return (
        <>


            {
                !auth ?
                    <Login/>
                    :
                    <ManipulatorApp/>
            }







        </>

    );
}



export default App;
