import React from "react";
import { getAuth, createUserWithEmailAndPassword, signOut} from "firebase/auth";

const Dashboard = ()=>{
    const auth = getAuth();

    const submitHandler = (e) => {
        e.preventDefault();
        const correo = e.target.campoEmail.value;
        const password = e.target.campoPassword.value;
        crearusuario(correo, password);
    }

    const crearusuario = (correo,password) => {
        createUserWithEmailAndPassword(auth,correo, password).then((usuarioFB) => {
        console.log("creado" + usuarioFB);
    });}

    const cerrarsesion = () => {
        signOut(auth);
    }

    return(
        <div>
            <h1>Registro</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="login">Correo Electronico</label>
                <input type="email" id="campoEmail"/>
                <label htmlFor="login">Contraseña</label>
                <input type="password" id="campoPassword"/>
                <button type="submit" > Iniciar sesion </button>
            </form>
            <button onClick={cerrarsesion}>Cerrar sesion</button>
        </div>
    )
}

export default Dashboard;