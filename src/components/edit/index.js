import { MainEdit , MainDiv } from "./style"
import { useState } from "react"
import myContext from "../../context/myContext"
import { useContext } from "react"
import { ConfigComponent } from "../configcomponents/config"
import { ConfigComponentLogin } from "../configcomponents/emailname"
import { EditPassword } from "../configcomponents/editpassword"
import "./style.css"


export const Edit = ()=>{
    const {location , setLocation} = useContext(myContext)
    const [login , setLogin] = useState(false)
    const [password , setPassword] = useState(false)
    const [ config , setConfig] = useState(true) 

    const handleModal = (modal)=>{
        if(modal == 1){ 
            setLogin(false)
            setPassword(false)
            setConfig(true)
        }else if(modal == 2){
            setLogin(false)
            setPassword(true)
            setConfig(false)
        }else if(modal == 3){
            setLogin(true)
            setPassword(false)
            setConfig(false)
        }
    }

    return(
        <>
        {setLocation(true)}
            <MainEdit>
                <MainDiv>
                    <button className = "tableft" onClick={()=>{handleModal(1)}}>Configurações🛠</button>
                    <button className = "tabmiddle" onClick={()=>{handleModal(2)}}>Password🔑</button>
                    <button className = "tabright" onClick={()=>{handleModal(3)}}>Login✅</button>
                    <div className="filloptions">
                        {login == true && (<ConfigComponentLogin key={1}/>)}
                        {password == true && (<EditPassword key={2}/>)}
                        {config == true && (<ConfigComponent key={3}/>)}
                    </div>
                </MainDiv>
            </MainEdit>
        </>
    )
}