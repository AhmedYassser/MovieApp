import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import style from '../Login/Login.module.css'

export default function Login(props) {

    const [errorList, seterrorList] = useState([]);
    const [error, seterror] = useState("");
    const [user, setUser] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);


    function getUser(e) {

        let myuser = { ...user };
        myuser[e.target.name] = e.target.value;
        setUser(myuser);

    }

    async function FormSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let validationResponse = validateInputs();

        if (validationResponse.error) {
            setLoading(false);
            seterrorList(validationResponse.error.details);

        } else {
            let { data } = await axios.post(`http://route-egypt-api.herokuapp.com/signin`, user);
            if (data.message === 'success') {
                setLoading(false);
                localStorage.setItem("token", data.token);
                props.getUserInfo();
                props.history.push('/home');
            } else {
                setLoading(false);
                seterror(data.message);

            }
        }
    }

    function validateInputs() {
        let scheme = Joi.object({
            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[A-Z][a-z]$')),
        });

        return scheme.validate(user, { abortEarly: false });
    }


    return (
        <>
            <div className={`w-50 mx-auto ${style.orange} p-4 my-4`}>
                <h1 className='text-center'>Login</h1>
                <form onSubmit={FormSubmit}>
                    {error && <div className="alert alert-danger p-2">{error}</div>}

                    {errorList.map((error, index) => index == 1 ? <div className="alert alert-danger p-1">password invalid</div> :

                        <div className="alert alert-danger p-1">{error.message}</div>
                    )}
                    <div>
                        <label htmlFor="Email" className="fs-3 text-start">E-mail</label>
                        <input onChange={getUser} type="text" className={`${style.orange} form-control bg-transparent`} placeholder="enter your email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="Password" className="fs-3">Password</label>
                        <input onChange={getUser} type="text" className={`${style.orange} form-control bg-transparent`} placeholder="entr your Password" name="password" type="password" />
                    </div>
                    <div className="m-auto">
                        <button type="submit" className={` btn ${style.btn_grad} my-3 text-white`}>
                            {loading ? <i className={`${style.color} fas fa-spinner fa-spin`}></i> : "LogIn"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
