import classes from './core.module.css';
import React,{useEffect } from 'react';
import * as runn  from './run'
import {get_FirstTouch , TouchControl}  from './controllers'



function Core({add,die,spee, options , socket,room_id,send}){
    
    useEffect(()=>{
        if(socket){
            socket.emit('ate',room_id);
             
            socket.on('onPlay' ,(m)=>{
                   runn.setMyOpponent(m)
                })
                socket.on(  'ate',(m)=>{
                    runn.setFruit(m)
                })
            socket.emit('adjust',{height:window.innerHeight ,width:window.innerWidth , room_id})
           
        }
   },[socket , room_id])
    useEffect(() => {
        if(spee === 0){
            runn.setSpeed(0) 
        }else{
            if(options.speed==='fixed'){
               runn.setSpeed(+options.thespeed);
            }else if(options.speed==='increased'){
                runn.setSpeed(spee)
            }
        }
    }, [spee , options])
    useEffect(()=>{ //controllers add and removed
        window.addEventListener('keyup', runn.control)
        window.addEventListener('touchstart',get_FirstTouch)
        window.addEventListener('touchend',TouchControl)
                 
        return ()=>{
            window.removeEventListener('keyup', runn.control)
            window.removeEventListener('touchstart', get_FirstTouch)
            window.removeEventListener('touchend', TouchControl)
            runn.reset()
        }
    },[])
    useEffect(()=>{
        if(socket){
        socket.on('adjust' ,(m)=>{
            let width;
            if(m.width<window.innerWidth){
                width = m.width
            }else{
                width = window.innerWidth
            }
            if(width >700){
                width *=.5
            }
        runn.run(add, die , options, socket,room_id,send , width) 

        })
    }else{
        runn.run(add, die , options, socket,room_id,send ) 
        
    }
    },[add, die , options, socket,room_id,send])

    return(  
        <canvas  width='400px' height='400px' className={classes.canvas}></canvas>

    )
}
   
    export default React.memo(Core)