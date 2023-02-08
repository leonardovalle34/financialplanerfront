import { Board, BoardDivContainer, ModalContas} from "./style";
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import "./styles.css"
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { useContext } from "react";
import { api } from "../../utils/api";
import EditWindow from "../editcomponent";


export const BoardDiv = ()=>{
    const navigate = useNavigate()
    const [titleModal , setTitleModal] = useState("")
    const [priceModal , setPriceModal] = useState()
    const [ id, setId] = useState("")
    const [modalVisible , setModalVisible] = useState(false)
    const [total , setTotal] = useState(0)
    const [valorContas , setValorContas] = useState([])
    const [receita , setReceita] = useState(0)
    const [field , setField] = useState({
        title : "",
        valor : "",
        despFixa : true,
    })
    const {location , setLocation} = useContext(myContext)
    const {edit , setEdit} = useContext(myContext)

   

    const handleSubmit = (e) => setField({
        ...field,
        [e.currentTarget.name]: e.currentTarget.value
    })


   const handleDelete = async(id)=>{
        try{
            await api.delete(`/contas/${id}`,{headers:{"x-access-token":localStorage.getItem("token")}}).then((response)=>{
                setValorContas(valorContas.filter(prev=>prev._id !== response.data._id))
                setTotal(total - response.data.price)           
            })
        }catch(err){
            console.log(err)
        }
   } 

   const handleNew = ()=>{
    setModalVisible(true)
   }

   const closeModal = ()=>{
    setModalVisible(false)
   }

   const handleOk = async()=>{
        await api.post(`/contas/contas` ,{"title":`${field.title}`, "price" : `${Number(field.valor)}`,"desFixo":`${field.despFixa}`} ,
        {headers: {"x-access-token" : localStorage.getItem("token")}}).then((response)=>{
            setValorContas(prevState => prevState.concat(response.data))
            //(prevState)=>prevState.filter(order => order._id !== orderId)
        })
        setModalVisible(false)
        field.title = "";
        field.valor = "";
   }

   const handleDeleteAll = async()=>{
        if(window.confirm("tem certeza que deseja Apaguar todas as notas?")){
            try{
                axios.delete("http://localhost:3001/contas/", {headers:{"x-access-token":localStorage.getItem("token")}}).then(
                    (response)=>{
                        console.log(response)
                        setTotal(0)
                    }
                )
            }catch(err){
                alert("Erro ao deletar notas")
            }
        }    
    } 

   /*const handleReceita = (e)=>{
        let sum = e.currentTarget.value
        let sum2 = Number(sum)
        setReceita(sum2.toFixed(2))
   }*/


   /*const handleEdit = async(id)=>{
        let title = prompt("Qual o titulo da nota?")
        let price = prompt("Qual o valor a substituir")
        await api.put(`/contas/${id}` ,{"title":title , "price" : price , "desFixo":"true"},
        {headers: {"x-access-token" : localStorage.getItem("token")}}).then((response)=>{
            setValorContas(prevState => prevState.concat(response.data))
            //(prevState)=>prevState.filter(order => order._id !== orderId)
        })

   }*/
   const handleEdit = (id , title , price)=>{
        edit == false? setEdit(true) : setEdit(false)
        setTitleModal(title)
        setId(id)
        setPriceModal(price)
        
   }
    const logout = ()=>{
        navigate("/")
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

   useEffect(()=>{
    let token = localStorage.getItem("token")
        api.get("/contas/receita",{headers:{"x-access-token" : token}}).then((response)=>{
            setReceita(response)
        })
        api.get("/contas/contas",{headers: {"x-access-token" : token}}).then((response)=>{
            setValorContas(response.data)
            let tot = 0.00
            response.data.forEach((el)=>{
                tot += el.price
                setTotal(tot)
                //handleTotal(el.price)
            })
            
        });
        //let receitaResponse 
        /*api.get("/contas/receita", {headers:{"x-access-token":token}}).then(
            
            (response)=>{
                if(typeof(response.data[0].receita)== Number){
                    receitaResponse = response.data[0].receita
                    setReceita(receitaResponse)
                }
            }

        )*/
    },[valorContas]);

    return(
        <>
        {setLocation(true)}
            {
                edit == true && (
                     <EditWindow title={titleModal} id={id} price={priceModal}/>
                )
            }
            {modalVisible == true ? 
                
                    <>
                        <ModalContas>
                            <div className="btnClose">
                                <button className="btn" onClick={()=>closeModal()}>✖</button>
                            </div>
                            <label>nome da conta</label>
                            <input className="titulo" name="title" value={field.title} onChange={handleSubmit}></input>
                            <label>valor</label>
                            <input type="number" className="valor" name="valor" value={field.valor} onChange={handleSubmit}></input>
                            <button className="btn" onClick={()=>handleOk()}>OK</button>
                        </ModalContas>
                    </>
                
                :
                
                    <>
                        <Board key="teste">
                            {
                                valorContas.map((el)=>{
                                    return (
                                        <>
                                            <BoardDivContainer key={el.id} className={el._id}>
                                                <div className="divInBottom">
                                                    <p   className="title" key={el.id + "1"}>{el.title}</p>
                                                </div>
                                                <div className="divInBottom">
                                                    <p  key={el.id + "2"}>Valor: R$ {el.price.toFixed(2)} 💲</p>
                                                </div>
                                                <div className="divInBottom">
                                                    <p  key={el.id + "2"}>data📆: {el.created_at.substring(8,10)} / {el.created_at.substring(5,7)} / {el.created_at.substring(0,4)} </p>
                                                </div>
                                                <div className="divInTop">
                                                    <button className="btn" key={el.id + "3"} onClick={()=>handleEdit(el._id , el.title, el.price)}>Editar 🛠</button>
                                                </div>
                                                <div className="divInTop">
                                                    <button className="btn" key={el.id + "4"} onClick={()=>handleDelete(el._id)}>Delete ❌</button>
                                                </div>
                                                                           
                                            </BoardDivContainer>                                
                                        </>
                                    )
                                    
                                })
                            }
                            <BoardDivContainer>
                                <p className="title" style={Number(receita) < Number(total) ? {color:"red"}:{color:"green"}}>Total R$ {total.toFixed(2)}</p>
                            </BoardDivContainer>
                            <div>
                                <p>Receita Total: 0</p>
                            </div>
                        </Board>
                        <button className="btn" onClick={()=>handleNew()}>Adicionar conta ➕</button>
                        <button className="btn" onClick={()=>handleDeleteAll()}>Zerar contas ❗</button>
                        <button className="btn" onClick={()=>logout()}>Logout ⚠</button>
                    </>
            }
        </>
    )
}