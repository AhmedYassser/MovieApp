import React from 'react'
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute(props) {
   
        if(localStorage.getItem('token')){
            if(props.loginUser){
                return ( <Route path={props.path}> <props.componant loginUser={props.loginUser} /> </Route> )

            }
            return ( <Route path={props.path}> <props.componant /> </Route> )

        }else {
            return  <Redirect to='/login' />
        }
    
}
