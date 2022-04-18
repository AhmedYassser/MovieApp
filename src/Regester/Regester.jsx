import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import style from '../Regester/Register.module.css'

export default function Regester(props) {
    const [errorList, seterrorList] = useState([]);
    const [error, seterror] = useState("");
    const [user, setUser] = useState({ first_name: '', last_name: '', age: 0, email: '', password: '' });
    const [loading, setLoading] = useState(false);
    
    function getUser(e) {

        let myuser = { ...user };
        myuser[e.target.name] = e.target.value;
        setUser(myuser);
        console.log(myuser)
    }

    function validateInputs() {
        let scheme = Joi.object({

            first_name: Joi.string().min(3).max(10).required(),
            last_name: Joi.string().min(3).max(10).required(),
            age: Joi.number().min(16).max(80).required(),
            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[A-Z][a-z]$')),
        });

        return scheme.validate(user, { abortEarly: false });
    }

    async function FormSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let validationResponse = validateInputs();

        if (validationResponse.error) {
            setLoading(false);
            seterrorList(validationResponse.error.details);
            console.log('hi');
        } else {
            let { data } = await axios.post(`http://route-egypt-api.herokuapp.com/signup`, user);
            if (data.message === 'success') {
                setLoading(false);
                props.history.push('/login')
            } else {
                setLoading(false);
                seterror(data.message);

            }
        }
    }

    return (
        <>
            <div className={`w-50 mx-auto  ${style.orange}  p-4 my-4`}>
                <h1 className="text-center">Register now</h1>
                <form onSubmit={FormSubmit}>
                    {error && <div className="alert alert-danger ">{error}</div>}

                    {errorList.map((error, index) => index === 4 ? <div className="alert alert-danger p-1">password invalid</div> :

                        <div className="alert alert-danger p-1">{error.message}</div>
                    )}

                    <div>
                        <label htmlFor="first-name" className="fs-4">First Name</label>
                        <input onChange={getUser} type="text" className={`${style.orange} form-control bg-transparent `} placeholder="entr your name" name="first_name" />
                    </div>
                    <div>
                        <label htmlFor="last Name" className="fs-4">Last Name</label>
                        <input onChange={getUser} type="text" className={`${style.orange} form-control bg-transparent `} placeholder="entr your LastName" name="last_name" />
                    </div>
                    <div>
                        <label htmlFor="Age" className="fs-4">Age</label>
                        <input onChange={getUser} type="text" className={`${style.orange} form-control bg-transparent `} placeholder="entr your age" name="age" />
                    </div>
                    <div>
                        <label htmlFor="Email" className="fs-4">Email</label>
                        <input onChange={getUser} type="text" className={`${style.orange} form-control bg-transparent `} placeholder="entr your email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="Password" className="fs-4">Password</label>
                        <input onChange={getUser} type="text" className={`${style.orange} form-control bg-transparent `} type="password" placeholder="entr your Password" name="password" />
                    </div>

                    <button type="submit" className={`btn ${style.btn_grad} text-white mx-auto my-3`}>

                        {loading ? <i className={`${style.color} fas fa-spinner fa-spin `}></i> : "Submit"}
                    </button>

                </form>
            </div>
        </>
    )
}
