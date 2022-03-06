import React from 'react'
import logo from './settings.svg'
import Home from './home.svg'
import classes from './logo.module.css'


export default function Logo ({click , home}){

    return(
        <div className={classes.div} onClick={click}>
                <img  className={classes.logo} src={home? Home:logo} alt='setting' height='50px' width='50px'></img>
        </div>
    )
}