import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./App.css";

const Login = (props) => {
    const auth = getAuth();

    const submitHandler = (e) => {
        e.preventDefault();
        const correo = e.target.campoEmail.value;
        const password = e.target.campoPassword.value;
        iniciarsesion(correo, password);
    }

    const iniciarsesion = (correo, password) => {
        signInWithEmailAndPassword(auth, correo, password).then((usuarioFB) => {
            console.log("logeado", usuarioFB.user);
            props.setUsuario(usuarioFB);
        });
    }

    return (
        <div>
            <div className="formulario">
                <h1>Bienvenido de nuevo!</h1>
                <h2 style={{ opacity: 0.7 }}>Ingrese sus datos de login</h2><br />
                <form className="formularioLogin" onSubmit={submitHandler}>
                    <label htmlFor="login">Correo Electrónico</label>
                    <input type="email" id="campoEmail" />
                    <label htmlFor="login" style={{ marginTop: 35 }}>Contraseña</label>
                    <input type="password" id="campoPassword" />
                    <button className="buttonlog" type="submit" > Iniciar sesión </button>
                </form>
            </div>
            <div className="imagen">
                    <h1 style={{ color: "white" }}>CEO Managment Tool</h1>
                    <h3 style={{ textAlign: "center", color: "white" }}><b>"</b>Soluciones prácticas a <br />problemas comunes para los CEO<b>"</b></h3>
            </div>
        </div>
    )
}

export default Login;