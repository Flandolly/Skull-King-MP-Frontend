import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import Home from "./Components/Home";
import UserSignUp from "./Components/UserSignUp";
import SignUpSuccess from "./Components/auxiliary/SignUpSuccess";
import UserLogIn from "./Components/UserLogIn";
import RoomLobby from "./Components/RoomLobby";
import {SocketContext, socket} from "./context/socket"


function App() {

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id)
        })
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <div className={"app-container"}>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/signup"} exact component={UserSignUp}/>
                <Route path={"/login"} exact component={UserLogIn}/>
                <Route path={"/success"} exact render={(props) => <SignUpSuccess {...props} />}/>
                <Route path={"/lobby"} exact component={RoomLobby}/>
            </div>
        </SocketContext.Provider>
    );
}

export default App;