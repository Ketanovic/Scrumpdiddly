import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="name" className="form-label"> Full Name </label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="full name here" />

            <label htmlFor="email" className="form-label">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your email" />

            <label htmlFor="password" className="form-label">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="your password" />

            <button type="submit">Register</button>
            </div>
        </form>
        <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login Here</button>
        </div>
    );
}

export default Register;
