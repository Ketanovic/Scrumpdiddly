import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        email:"",
        pass:"",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {}
        data.username = name;
        //data.email = email;
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
        if (submitResponse.ok) {
            setFormData({
                name: "",
                //email: "",
                pass: "",
            });
        } else {
            console.error(submitResponse);
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
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Register</h5>
                <div className="card-body"></div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"> Full Name </label>
                            <input value={name} onChange={handleNameChange} className="form-control" aria-describedby="emailHelp"> </input> type="name" id="name" placeholder="full name here" />

                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input value={email} onChange={handleEmailChange} type="email" placeholder="your email" />

                            <label htmlFor="password" className="form-label">Password</label>
                            <input value={pass} onChange={handlePassChange} type="password" placeholder="your password" />
                        </div>
                            <button className= "btn-btn-primary" type="submit">Register</button>
                        <button onClick={() => {props.onFormSwitch('login')}}>Already have an account? Login Here</button>
                    </form>
        </div>
    );
}

export default Register;
