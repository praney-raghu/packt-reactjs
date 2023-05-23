import React, { useState } from 'react';

const apiBaseUrl = process.env.REACT_APP_API_BASEURL

async function loginUser(credentials) {
    return fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        setToken(token);
    }

    return (
        // <div className="login-wrapper">
        //     <h1>Please Log In</h1>
        //     <form onSubmit={handleSubmit}>
        //         <label>
        //             <p>Email</p>
        //             <input type="email" onChange={e => setEmail(e.target.value)} />
        //         </label>
        //         <label>
        //             <p>Password</p>
        //             <input type="password" onChange={e => setPassword(e.target.value)} />
        //         </label>
        //         <div>
        //             <button type="submit">Submit</button>
        //         </div>
        //     </form>
        // </div>
        <div className="container">
            <form className="d-flex" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
