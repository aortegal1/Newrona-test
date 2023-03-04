
import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const Dashboard = () => {
    const auth = getAuth();
    const db = getFirestore();

    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        }
        getUsers();
    }, [db]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const { uid } = userCredentials.user;
        const user = { email };
        const userRef = await addDoc(collection(db, "users"), user);
        setUsers([...users, { id: userRef.id, ...user }]);
    }

    const handleUpdateUser = async (id) => {
        const userRef = doc(db, "users", id);
        await updateDoc(userRef, { email });
        setUsers(users.map(user => user.id === id ? { id, email } : user));
    }

    const handleDeleteUser = async (id) => {
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter(user => user.id !== id));
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password);
    }

    const handleSignOut = async () => {
        await signOut(auth);
    }

    return (
        <div>
            <div className="formulario">
                <h1>Bienvenido de nuevo!</h1>
                <h2 style={{opacity:0.7}}>Ingrese sus datos de login</h2><br />
                <form className="formularioLogin" onSubmit={submitHandler}>
                    <label htmlFor="login">Correo Electrónico</label>
                    <input type="email" id="campoEmail" />
                    <label htmlFor="login" style={{marginTop: 35}}>Contraseña</label>
                    <input type="password" id="campoPassword" />
                    <button type="submit" > Iniciar sesión </button>
                </form>
            </div>
            <div className="imagen">
                <h1>CEO Managment Tool</h1>
            </div>
        </div>
    )
}

export default Login;