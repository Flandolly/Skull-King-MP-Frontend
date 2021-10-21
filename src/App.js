import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import Home from "./Components/Home";
import UserSignUp from "./Components/UserSignUp";
import SignUpSuccess from "./Components/auxiliary/SignUpSuccess";
import UserLogIn from "./Components/UserLogIn";
import RoomLobby from "./Components/RoomLobby";
import {SocketContext, socket} from "./context/socket";
import {UserProvider} from "./context/GlobalStates";
import RoomShow from "./Components/CRUDs/RoomShow";


function App() {

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        });
    }, []);

    return (
        <UserProvider>
            <SocketContext.Provider value={socket}>
                <div className={"app-container"}>
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/signup"} exact component={UserSignUp}/>
                    <Route path={"/login"} exact component={UserLogIn}/>
                    <Route path={"/success"} exact render={(props) => <SignUpSuccess {...props} />}/>
                    <Route path={"/lobby"} exact component={RoomLobby}/>
                    <Route path={"/rooms/:id"} exact component={RoomShow}/>
                </div>
            </SocketContext.Provider>
        </UserProvider>
    );
}

export default App;