import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from 'next/router'

const signUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body : { email, password },
        onSuccess: () => {
            if(window.location.search !== ""){
                const pathname = decodeURIComponent(window.location.search.split('?redirectTo=')[1]);
                Router.push(pathname);
            }else{
                Router.push('/');
            }
        }
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h1>Sign In</h1>
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
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>
    )
}

export default signUp;