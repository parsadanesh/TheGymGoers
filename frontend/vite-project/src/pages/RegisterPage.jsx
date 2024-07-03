import { useEffect, useState } from "react";
import UserDetailsForm from "../components/UserDetailsForm"
import Footer from "../components/Footer";
import Header from "../components/Header";


const RegisterPage = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (email !== "" || password !== "") {
            props.setNewUser({
                email: email,
                password: password
            })
        }
    }, [email, password])


    return (
        <div className="container">
            <h1>Register</h1>
            <br/>
            <UserDetailsForm setEmail={setEmail} setPassword={setPassword} />
        </div>
    )

}

export default RegisterPage