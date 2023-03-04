import React from "react";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import "./Dash.css";
import { collection, getDocs, getFirestore, addDoc, deleteDoc, doc } from 'firebase/firestore'

const Dashboard = () => {
    const auth = getAuth();
    const db = getFirestore();

    //Manejo de CRUD
    const [lista, setLista] = React.useState([]);
    const [nuevoNombre, setNuevoNombre] = React.useState("");
    const [nuevaCedula, setNuevaCedula] = React.useState("");
    const listaDB = collection(db, "operators");

    /*Creación de Usuario*/
    const submitHandler = (e) => {
        e.preventDefault();
        const correo = e.target.campoEmail.value;
        const password = e.target.campoPassword.value;
        crearusuario(correo, password);
    }


    const crearusuario = (correo, password) => {
        createUserWithEmailAndPassword(auth, correo, password).then((usuarioFB) => {
            console.log("creado" + usuarioFB);
        });
    }
    /*Creación de Usuario*/

    //Cerrar sesión
    const cerrarsesion = () => {
        signOut(auth);
    }

    /*Fucionalidad de pestañas de menú*/
    function toggle1() {
        var x = document.getElementById("register");
        var y = document.getElementById("crud");
        if (x.style.display === "none") {
            x.style.display = "inline-flex";
            y.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "inline-flex";
        }
    }

    function toggle2() {
        var x = document.getElementById("crud");
        var y = document.getElementById("register");
        if (x.style.display === "none") {
            x.style.display = "inline-flex";
            y.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "inline-flex";
        }
    }
    /*Fucionalidad de pestañas de menú*/

    /*Fucionalidades de CRUD*/
    const getLista = async () => {
        try {
            const data = await getDocs(listaDB);
            const filtradaData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setLista(filtradaData);
        } catch (err) {
            console.error(err);
        }
    }

    const onSubmitObrero = async () => {
        await addDoc(listaDB, { Nombre: nuevoNombre, Cedula: nuevaCedula });
    }

    const deleteObrero = async (id) => {
        const obreroDoc = doc(db, "operators", id)
        await deleteDoc(obreroDoc);
    }

    getLista();
    /*Fucionalidades de CRUD*/


    return (
        <div>

            <div className="menu">
                <h3 style={{ marginBottom: 60, color: 'white' }}>CEO MNGMT</h3>
                <button onClick={toggle1} className="tabs">Crear usuario</button>
                <button onClick={toggle2} className="tabs">Admin. de empleados</button>
                <hr style={{ marginTop: 400 }} class="solid" />
                <button className="logout" onClick={cerrarsesion}>Cerrar sesion</button>
            </div>

            <div id="register" className="contenido">
                <h1 style={{ marginLeft: -40, marginBottom: 20 }}>Registro</h1>
                <form onSubmit={submitHandler}>
                    <label htmlFor="login">Correo Electronico</label>
                    <input type="email" id="campoEmail" />
                    <label style={{ marginTop: '35px' }} htmlFor="login">Contraseña</label>
                    <input type="password" id="campoPassword" />
                    <button className="logout" type="submit" > Crear usuario </button>
                </form>
            </div>
            <div id="crud" className="contenido">
                <h1 style={{ marginBottom: "15px" }}>Administrar Empleados</h1>
                <div>
                    <label htmlFor="Nombre Completo">Nombre Completo</label>
                    <input onChange={(e) => setNuevoNombre(e.target.value)} />
                    <label style={{ marginTop: 30 }} htmlFor="Nombre Completo">No. de Cédula</label>
                    <input type="number" onChange={(e) => setNuevaCedula(Number(e.target.value))} />
                    <button className="obrero" onClick={onSubmitObrero}>Agregar obrero</button>
                    <h3 style={{ marginTop: 60 }}>Lista de Obreros</h3>
                </div>
                {lista.map((obrero) => (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h3 style={{ marginRight: 20 }}>{obrero.Nombre}</h3>
                        <h3 style={{ marginRight: 20 }}>{obrero.Cedula}</h3>
                        <button className="editar" onClick={() => deleteObrero(obrero.id)}>Eliminar obrero</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;