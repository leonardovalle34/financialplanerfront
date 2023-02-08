import { BrowserRouter , Routes , Route } from "react-router-dom";
import { Login } from "./components/loginscreen";
import { MainDiv } from "./components/main";
import { Register } from "./components/registerscreen";
import { Edit } from "./components/edit";



export const RoutesIn = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/contas" element={<MainDiv/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/config" element={<Edit/>}/>
            </Routes>
        </BrowserRouter>
    )
}