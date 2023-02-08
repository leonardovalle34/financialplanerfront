import { useState } from "react"
import { api } from "../../utils/api"

export const EditPassword = ()=>{
    const [field , setField] = useState({
        password : "",
        password1 : ""
    })

    const handleChange = (e)=>setField({
        ...field,
        [e.currentTarget.name]:e.currentTarget.value
    })

    const submit = async()=>{
        if(field.password == field.password1){
            try{
                await api.put("/user/password" , {"password":`${field.password}`},{headers:{"x-access-token": localStorage.getItem("token")}}).then(
                    (response)=>{
                        
                        if(response.status == 200){
                            localStorage.setItem("user",JSON.stringify(response.data.user))
                            localStorage.setItem("token",response.data.token)
                            alert("Senha atualizada com sucesso!")
                            setField({
                                password:"",
                                password1:""
                            })
                        }
                    }
                    
                )
            }catch(err){
                alert ("Operação não foi realizada devido a problemas na requisiçao")
            }
        }
    }
    return(
        <div>
            <label>Senha</label>
            <input type="password" name="password" value={field.password} onChange={(e)=>{handleChange(e)}}></input>
            <label>Confirmar senha</label>
            <input type="password" name="password1" value={field.password1} onChange={(e)=>{handleChange(e)}}></input>
            <button className="btn" onClick={()=>{submit()}}>Enviar ✔</button>
        </div>
    )
}