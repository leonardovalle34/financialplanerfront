import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import myContext from "../../context/myContext";
import { useContext } from "react";
import { api } from "../../utils/api";
import { Main } from "./style";
import "./style.css"


export const Register = ()=>{
    const {location , setLocation} = useContext(myContext)
    const navigate = useNavigate();

    const [field , setField] = useState({
        name:'',
        email : '',
        password : '',
        confirmpassword : ''
    })


    const register = async()=>{
        try{
            if(field.confirmpassword == field.password){
                const response = await api.post("/user/register",{"name":`${field.name}`,"email":`${field.email}`,"password":`${field.password}`})                
                navigate("/")
            }else{
                alert("os passwords estão diferentes")
            }
            
        }catch(err){
            alert("erro ao criar usuário")
            console.log(err)
        }
    }

   

    const handleSubmit = (e)=>setField({
        ...field,
        [e.currentTarget.name]:e.currentTarget.value
    })

    return(
        <>
            {setLocation(false)}
            <Main>
                <div>
                    <div className="in">
                        <label>Name</label>
                        <input type="text" name="name" value={field.name} placeholder="Type your name" onChange={(e)=>{handleSubmit(e)}}></input>
                    </div>
                    <div className="in">
                        <label>Email</label>
                        <input type="email" name="email" value={field.email} placeholder="Type your email" onChange={(e)=>{handleSubmit(e)}}></input>
                    </div>
                    <div className="in">
                        <label>Password</label>
                        <input type="password" name="password" value={field.password} placeholder="type your password" onChange={(e)=>{handleSubmit(e)}}></input>
                    </div>
                    <div className="in">
                        <label>Confirm password</label>
                        <input type="password" name="confirmpassword" value={field.confirmpassword} placeholder="type your password" onChange={(e)=>{handleSubmit(e)}}></input>
                    </div>
                    <div className="in">
                        <button className = "btn" onClick={()=>{register()}}>Register🚀</button>
                    </div>
                </div>
            </Main>
        </>
    )
}