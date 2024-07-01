import { useEffect, useState } from "react";
import UserDetailsForm from "../components/UserDetailsForm"
import Header from "../components/Header";
import Footer from "../components/Footer";

const LoginPage = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (email !== "" || password !== "") {
            props.setUser({
                email: email,
                password: password
            })
        }
    }, [email, password])


    return (
        <div className="container">
            <h1>Login</h1>
            <br/>
            <UserDetailsForm setEmail={setEmail} setPassword={setPassword} />
        </div>
    )
}

export default LoginPage