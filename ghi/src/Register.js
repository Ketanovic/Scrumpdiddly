import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {}
        data.username = name;
        data.email = email;
        data.password = pass;

        const json = JSON.stringify(data)
        console.log(json)
        const url = "http://localhost:8000/api/accounts/"
        const fetchConfig ={
            method: "post",
            body: json,
            headers: {
                "Content-Type": "application/json",

        }
    }
        const submitResponse = await fetch(url, fetchConfig);
        const responseData = await submitResponse.json();
        if (submitResponse.ok) {
            navigate('/login');
        } else {
            setErrorMessage(responseData.message || 'Oops! Username or email has already been taken')
        }
    }

const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
}

const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
}

const handlePassChange = (event) => {
    const value = event.target.value;
    setPass(value);
}

    return (
        <div className="page-wrap">
        <div className="mb-3 form-bg offset-3 col-6 py-3">
            <h3 className="card-header">Register</h3>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                <div className="card-body"></div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className="mx-3">
                                <label htmlFor="name"className="form-label">Username:</label>
                                <input
                                value={name}
                                onChange={handleNameChange}
                                className="form-control"
                                type="name"
                                placeholder="Full Name" />
                            </div>
                            <div className="m-3">
                                <label className="form-label"> Email:</label>
                                <input
                                value={email}
                                onChange={handleEmailChange}
                                className="form-control"
                                aria-describedby="emailHelp"
                                type="email"
                                placeholder="Email Address" />
                            </div>
                            <div className="m-3">
                                <label className="form-label">Password:</label>
                                <input
                                value={pass}
                                onChange={handlePassChange}
                                className="form-control"
                                type="password"
                                placeholder="Password" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center py-1">
                            <button
                            type="submit"
                            className= "button"
                            >Register
                            </button>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center pt-2">
                        <button
                        className="button"
                        onClick={() => navigate("/login")}>
                            Already have an account? <i>Login Here.</i>
                        </button>
                    </div>
        </div>
        </div>
    );
}

export default Register;
