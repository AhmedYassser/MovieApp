import React from 'react'
import style from '../Movies/Movies.module.css'

export default function Movies() {
    return (
        <div className={`my-5`}>
            <h1 className={`${style.color} text-center`}>Movies</h1>
            <p className={`text-white text-center`}>Used To Show The Most Ranked Movies </p>
        </div>
    )
}
