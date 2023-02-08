import { useState } from "react";
import { MainEdit } from "./style";
import myContext from "../../context/myContext";
import { useContext } from "react";
import "./style.css"
import { api } from "../../utils/api";

const EditWindow = (props)=>{
    const {edit , setEdit} = useContext(myContext)
    const [field , setField] = useState({
        title : props.title , 
        price : props.price
    })

    const handleChange = (e)=>setField({
        ...field,
        [e.currentTarget.name]:e.currentTarget.value
    })

    const editFunc = async()=>{
        try{
            
            await api.put(`/contas/${props.id}` ,{"title":field.title , "price" : field.price , "desFixo":"true"},
                {headers: {"x-access-token" : localStorage.getItem("token")}}).then((response)=>{
                    console.log(response)
                    setEdit(false)
                    //setValorContas(prevState => prevState.concat(response.data))
                    //(prevState)=>prevState.filter(order => order._id !== orderId)
                })
        }catch(err){
            alert("erro atualizando uma nota")
        }
    }
    return(
        <>
            <MainEdit>
                <div className="divbtn">
                    <button className="btn" onClick={()=>{setEdit(false)}}>✖</button>
                </div>
                <div>
                    <h1>{props.title}</h1>
                </div>
                <div className="divinput">
                    <label>Titulo</label>
                    <input type="text" name="title" onChange={(e)=>{handleChange(e)}} value={field.title}></input>
                </div>
                <div className="divinput">
                    <label>Valor</label>
                    <input type="number" name="price" value={field.price} onChange={(e)=>{handleChange(e)}}></input>
                </div>

                <div className="divinput">
                    <button className="btn" onClick={(()=>{editFunc()})}>Enviar</button>
                </div>
            </MainEdit>
        </>
    )
}

export default EditWindow