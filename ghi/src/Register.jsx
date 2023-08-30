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
                            <input value={name} onChange={handleNameChange} className="form-control" aria-describedby="emailHelp" type="name" placeholder="Full Name" />
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input value={email} onChange={handleEmailChange} className="form-control" aria-describedby="emailHelp" type="email" placeholder="Email Address" />

                            <label htmlFor="password" className="form-label">Password</label>
                            <input value={pass} onChange={handlePassChange} className="form-control" aria-describedby="emailHelp" type="password" placeholder="Your Password" />
                        </div>
                            <button className= "btn-btn-primary" type="submit">Register</button>
                    </form>
                    <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login Here</button>
        </div>
    );
}

export default Register;
