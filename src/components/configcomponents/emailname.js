import { useState } from "react"
import axios from "axios"
import { api } from "../../utils/api"
import { useNavigate } from "react-router-dom"


export const ConfigComponentLogin = ()=>{
    const navigate = useNavigate()
    const [email , setEmail] = useState()
    const [name , setName] = useState()

    const handleChangeEmail = (e1)=>{
        setEmail(e1.target.value)
    }

    const handleChangeName = (e2)=>{
        setName(e2.target.value)
    }

    const sendNewEmail = async()=>{
        try{
            await api.put("/user/loginupdate" , {"email":`${email}`},{headers:{"x-access-token": localStorage.getItem("token")}}).then(
                (response)=>{
                    if(response.status == 200){
                        localStorage.setItem("user",JSON.stringify(response.data.user))
                        localStorage.setItem("token",response.data.token)
                        setEmail("")
                        alert("Email alterado com sucesso")
                        console.log(response.data)
                    }
                }
            )
        }catch(err){
            alert("requisição não concluída")
        }
    }
    const sendNewName = async()=>{
        try{
            await api.put("/user/loginupdate" , {"name":`${name}`},{headers:{"x-access-token": localStorage.getItem("token")}}).then(
                (response)=>{
                    if(response.status == 200){
                        localStorage.setItem("user",JSON.stringify(response.data.user))
                        localStorage.setItem("token",response.data.token)
                        setName("")
                        alert("Nome alterado com sucesso")
                        console.log(response.data)
                    }
                }
            )
        }catch(err){
            alert("requisição não concluída")
        }
    }

    const deleteUser = async()=>{
        try{
            if(window.confirm("deseja realmente excluir sua conta? ")){
                await api.delete('/user/loginupdate',{headers:{"x-access-token":localStorage.getItem("token")}}).then(
                    (response)=>{
                        localStorage.removeItem("token")
                        localStorage.removeItem("user")
                        navigate("/")
                    }
                )
            }
        }catch(err){
            alert('nao foi possivel deletar o usuario')
        }
    }


    return(
        <>
        <div>
            <label>Alterar Email</label>
            <input type="email" value={email} onChange={(e1)=>{handleChangeEmail(e1)}}></input>
            <button className="btn" onClick={()=>{sendNewEmail()}}>Enviar✔</button>
        </div>
        <div>
            <label>Alterar Nome</label>
            <input type="text" value={name} onChange={(e2)=>{handleChangeName(e2)}}></input>
            <button className="btn" onClick={()=>{sendNewName()}}>Enviar ✔</button>
        </div>
        <div>
            <button className="btn" onClick={()=>{deleteUser()}}>Deletar usuário ❗</button>
        </div>
        </>
    )
}