import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import socketIOClient from "socket.io-client";
import Home from "./Components/Home";
import UserSignUp from "./Components/UserSignUp";
import SignUpSuccess from "./Components/auxiliary/SignUpSuccess";


const ENDPOINT = "http://127.0.0.1:8080";
const socket = socketIOClient(ENDPOINT);

function App() {

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id)
        })
        // socket.on("buttonClicked", (data) => {
        //   moveButton(data.offsetLeft, data.offsetTop)
        // })
        //
        // socket.on("buttonPosition", (data) => {
        //   if(data) {
        //     moveButton(data.offsetLeft, data.offsetTop)
        //   }
        // })
    }, []);

    // function moveButton(offLeft, offTop) {
    //   const btn = document.getElementById("btn")
    //   let top = offTop
    //   let left = offLeft
    //
    //   btn.style.top = top + "px"
    //   btn.style.left = left + "px"
    //   btn.style.animation = "none"
    // }
    //
    // function buttonClicked(event) {
    //   console.log("Button clicked")
    //   event.currentTarget.style.position = "absolute"
    //   socket.emit("buttonClicked", {
    //     offsetLeft: Math.random() * ((window.innerWidth - event.currentTarget.clientWidth) - 100),
    //     offsetTop: Math.random() * ((window.innerHeight - event.currentTarget.clientHeight) - 50)
    //   })
    // }

    return (
        <div className={"app-container"}>
            <Route path={"/"} exact component={Home}/>
            <Route path={"/signup"} exact component={UserSignUp}/>
            <Route path={"/success"} exact render={(props) => <SignUpSuccess {...props} />}/>
        </div>
    );
}

export default App;