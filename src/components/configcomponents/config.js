import { useState } from "react"
import axios from "axios"
import { api } from "../../utils/api"


export const ConfigComponent = ()=>{

    const [receita , setReceita] = useState(0)

    const handleChange = (e)=>{
        setReceita(e.target.value)
    }

    const sendIncome = async()=>{
        await api.put("/contas/receita" , {"receita":`${receita}`},{headers:{"x-access-token": localStorage.getItem("token")}}).then(
            alert("receita Atualizada")
        )
    }


    return(
        <>
            <div>
                <label>Valor receita:</label>
                <input type="number" value={receita} onChange={(e)=>{handleChange(e)}}></input>
                <button className="btn" onClick={()=>{sendIncome()}}>Enviar ✔</button>
            </div>
        </>
    )
}