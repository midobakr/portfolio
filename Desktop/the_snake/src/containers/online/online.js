import React from 'react'
import Core from '../../components/the_core/core'

import socketIOClient from "socket.io-client";
let socket ;
export default class Online extends React.PureComponent{
     state={
         mystate : false,
         alive : true,
         room_id:null ,
         restart : false

     }
    componentDidMount(){
        socket = socketIOClient('http://192.168.1.4:3001/');
        socket.on('exit',(m)=>{
            socket.disconnect()
            this.props.die()
        })
        socket.on('gameOver',(m)=>{
            this.setState({alive : false})
        })
        socket.on('joined',(m)=>{
           this.setState({room_id : m})
        })
        socket.on('start',(m)=>{        
            this.setState({mystate : m})
        })
        socket.on('sendScore',(m)=>{
            this.props.setScore(m)
        })
        socket.on('die',(m)=>{
            this.setState({alive : false})
        })
        socket.on('restart',(m)=>{
            this.setState({restart : true})
        })
        socket.on('play_again',(m)=>{
            this.setState({alive : true , restart:false})
        }) 


    }
    restart =()=>{
        if(this.state.restart === true){
            socket.emit('play_again',this.state.room_id)
        }else{
            socket.emit('restart',this.state.room_id)
        }
    }
    die =()=>{
        this.setState({alive : false})
        socket.emit('die','')
    }

    send_score = ()=>{
        socket.emit('sendScore',{room_id : this.state.room_id,score:this.props.onlineScore})
    }
  
  
    render(){
        return (
            this.state.mystate ?
                this.state.alive ?
                    <Core send={this.send_score} options={this.props.options} spee={this.props.spee} alive={this.props.alive} add ={this.props.add} die ={this.die} socket={socket} room_id={this.state.room_id}/>
                    :<h1 onClick = {this.restart}>restart</h1>
                :
                <h1 > waiting for opponenet </h1>
        )
    }
}