import "./Home.css"
import { Link} from "react-router-dom"
import { useState } from "react";
const img = "https://image.flaticon.com/icons/png/512/2885/2885434.png"

let User ;
const Home = () => {
const [inputs , setinputs] =   useState("")
console.log(inputs);

const send = ()=>{
    User = document.getElementById("cname").value;

}
    return (
        <>
          <div className="main">
              <div className="card">
                 
                  <img src={img} alt="" />
                  <h1>SECRET CHAT !!</h1>
                  <input type="text" placeholder="enter your name"  id = "cname" onChange= {(e)=>{ setinputs(e.target.value) }} />
               <Link onClick = {(e)=> !inputs ? e.preventDefault() : null  } to = "/chat">  <button onClick={send}> Login in </button>  </Link>
              </div>
          </div>
        </>
    )
}

export default Home
export { User}
