import { Main } from "./style";
import { BoardDiv } from "../board";
import { NoUser } from "../nouser";



export const MainDiv = ()=>{
    return(
        <>
            <Main>
                {localStorage.getItem("user") ? 
                    <BoardDiv></BoardDiv> 
                    :
                    <NoUser/>
                }
                
            </Main>
        </>
    ) 
}

