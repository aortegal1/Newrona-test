import './App.css';
import React, {useEffect} from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import {getAuth , onAuthStateChanged } from 'firebase/auth';
import {collection,getDocs,getFirestore} from 'firebase/firestore'

function App() {
  const auth = getAuth();
  const [usuario, setUsuario] = React.useState(null);


  useEffect(()=>{

    onAuthStateChanged(auth,(usuarioFB)=>{
      console.log("sesion ya iniciada con", usuarioFB);
      setUsuario(usuarioFB);
    })
    
  },[]);
  console.log("hola",usuario);

  return (
    <div className="App">
      <>       
        {usuario ? <Dashboard/> : <Login setUsuario={setUsuario}/>}
      </>
    </div>
  );
}

export default App;
