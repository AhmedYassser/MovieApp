import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import style from '../Navbar/Navbar.module.css'
import img from '../one1.png'

export default function Navbar(props) {
    return (
        <>
            <div>
                <div className={`navbar navbar-expand-lg navbar-light w-100 ${style.bglight}`} >
                    <div className="container-fluid mx-5">
                        <a class="navbar-brand" href="#"><img src={img} className={style.img} /></a>
                        <button className={`navbar-toggler ${style.Bur}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className={`navbar-toggler-icon ${style.Bur}`}></span>
                        </button>
                        <div className="px-4 collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">

                                {props.loginUser ? <>
                                    <li className="nav-item">
                                        <NavLink className={`nav-link ${style.LINKS}`} aria-current="page" to='/home'>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={`nav-link ${style.LINKS}`} to='/movies'>Movies</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={`nav-link ${style.LINKS}`} to='/tv'>TV</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={`nav-link ${style.LINKS}`} to='/gallary'>Gallary</NavLink>
                                    </li>

                                </> : ''}


                            </ul>
                        </div>


                        <div className="px-4 collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav ms-auto">
                                <div className="me-5 d-flex justify-content-center align-items-center">
                                    <a href="#"><i className={`${style.Icon} fab fa-facebook`}></i></a>
                                    <a href="#"><i className={`${style.Icon} fab fa-twitter`}></i></a>
                                    <a href="#"><i className={`${style.Icon} fab fa-instagram`}></i></a>
                                    <a href="#"><i className={`${style.Icon} fab fa-node`}></i></a>
                                </div>
                                <div className="me-5 d-flex justify-content-center align-items-center">

                                    {props.loginUser !== null ? <>
                                        <li className={`nav-item ${style.LINKS} p-1`} onClick={props.logOut}>
                                            Logout
                                        </li>

                                    </> : <><li className="nav-item">
                                        <Link className={`nav-link ${style.LINKS}`} aria-current="page" to='/login'>Login</Link>
                                    </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${style.LINKS}`} to='/regester'>Regester</Link>
                                        </li></>}
                                </div>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
