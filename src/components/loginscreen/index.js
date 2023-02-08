import { Main , DivMainContainer , Outside} from "./style"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import myContext from "../../context/myContext";
import { useContext } from "react";
import { api } from "../../utils/api";
import "./style.css"


export const Login = ()=>{
    const navigate = useNavigate()
    const {location , setLocation} = useContext(myContext)
    const [field, setField] = useState({
        email : "",
        password : ""
    })

    const handleSubmit = (e)=>setField({
        ...field,
        [e.currentTarget.name] : e.currentTarget.value
    })
    
    const register = ()=>{
       navigate("/register")
    }

    const login = async()=>{
        try{
            await api.post("/user/login",{"email":`${field.email}`,"password":`${field.password}`}).then((response)=>{
                if(response.status == 200){
                    localStorage.setItem("user",JSON.stringify(response.data.user))
                    localStorage.setItem("token",response.data.token)
                    navigate("/contas")
                }
            })
        }catch(err){
            alert("Usúario ou senha incorretos")
        }
        
        
    }
    return(
        <>
        {setLocation(false)}
            <Outside>
                <Main>
                    <DivMainContainer>
                        <div className="in">
                            <label>Username</label>
                            <input type="email" placeholder="email" name="email" onChange={(e)=>{handleSubmit(e)}}></input>
                        </div>
                        <div className="in">
                            <label>Password</label>
                            <input type="password" placeholder="Password" name="password" onChange={(e)=>{handleSubmit(e)}}></input>
                        </div>
                        <div className="in">
                            <button className="btn" onClick={()=>{login()}}>Login ✔</button>
                            <button className="btn" onClick={()=>{register()}}>Register 🔗</button>
                        </div>
                    </DivMainContainer>
                </Main>
            </Outside>
        </>
    )
}