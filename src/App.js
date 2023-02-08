import { RoutesIn } from './routes';
import HeaderComponent from './components/header';
import HeaderComponentOff from './components/header/loggedout';
import './App.css';
import { useState , useEffect } from 'react';
import myContext from './context/myContext';
import { useContext } from 'react';

function App() {

  const [location , setLocation] = useState()
  const [edit , setEdit] = useState(false)
 
  return (
    <>
      {location == false? 
        <HeaderComponentOff/>
        :
        <HeaderComponent/>
      }
      <myContext.Provider value={{location , setLocation , edit , setEdit}}>
        <RoutesIn/>
      </myContext.Provider>
    </>
  );
}

export default App;
