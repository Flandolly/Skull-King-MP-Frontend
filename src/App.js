import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";
const socket = socketIOClient(ENDPOINT);

function App() {

  const [cookie, setCookie] = useState(null)

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id)
    })
    socket.on("buttonClicked", (data) => {
      moveButton(data.offsetLeft, data.offsetTop)
    })

    socket.on("buttonPosition", (data) => {
      if(data) {
        moveButton(data.offsetLeft, data.offsetTop)
      }
    })
  }, [cookie]);

  function moveButton(offLeft, offTop) {
    const btn = document.getElementById("btn")
    let top = offTop
    let left = offLeft

    btn.style.top = top + "px"
    btn.style.left = left + "px"
    btn.style.animation = "none"
  }

  function buttonClicked(event) {
    console.log("Button clicked")
    event.currentTarget.style.position = "absolute"
    socket.emit("buttonClicked", {
      offsetLeft: Math.random() * ((window.innerWidth - event.currentTarget.clientWidth) - 100),
      offsetTop: Math.random() * ((window.innerHeight - event.currentTarget.clientHeight) - 50)
    })
  }

  return (
      <div>
        <button style={{position: "absolute"}} id={"btn"} onClick={(event) => buttonClicked(event)}>Click Me!</button>
      </div>
  );
}

export default App;