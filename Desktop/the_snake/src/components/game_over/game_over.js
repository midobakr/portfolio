import React from 'react';
import classes from './game_over.module.css';

export default function Game_over({score , result}){
       
    return(
        <div className={classes.div}>
            <div className={classes.GameOver}>
                <h1 >Game Over</h1>
                <h1 >{result}</h1>
                <h1 style={{marginTop:0}}>Your score is {score}</h1>
            </div>
        </div>
    )
}