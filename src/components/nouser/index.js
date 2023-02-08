import myContext from "../../context/myContext";
import { useContext } from "react";

export const NoUser = ()=>{

    const {localtion , setLocation} = useContext(myContext)

    return(
        <>
        {setLocation(false)}
            <p>Nao autorizado</p>
        </>
    )
}