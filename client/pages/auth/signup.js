import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from 'next/router'

const signUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body : { email, password },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                <br/>
                <div className="form-group">
                    <label>Email Address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
                </div>
                <br/>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"/>
                </div>
                <br/>
                {errors}
                <br/>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

// requireAuth(signUp);

export default signUp;