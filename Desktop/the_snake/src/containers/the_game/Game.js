import React ,{Component}from 'react'

import Core from '../../components/the_core/core'
import Score from '../../components/score/score'
import GameOver from '../../components/game_over/game_over'
import classes from './game.module.css'
import Online from '../online/online'


class Game extends Component {

    state ={
        score : 0 ,
        scoreOpponent : 0 ,
        alive : true ,
        start : false,
        online :false,
        speed : 2,
        message : ''
    }
    raw_speed = 0
    
    increase_score = (s)=>{
        this.raw_speed = s
        this.setState((prevstate)=>{
            return {
                score : prevstate.score + 1
            }
        })
    }
    getScoreOpponent = (s)=>{
        this.setState({scoreOpponent : s})
    }
  die = (online , result)=>{
        this.setState({alive : false})
        if(online){
            this.setState({message : result})
        }

    }

    pause = ()=>{
      this.setState({speed : 0})
    }
    resume = ()=>{
      this.setState({speed : this.raw_speed ||2})
    }
    
    start = ()=>{
      this.setState({start : true})
    }
    startOnline = ()=>{
      this.setState({start : true,online : true})
    }
    
    restart = ()=>{
        this.setState({
            score : 0 ,
            alive : true ,
            start : true,
            speed :2
        })
    }

    render(){
        return (
        <div className={classes.game}> 
        {
                this.state.start ?  
                 this.state.alive ? 
                        <React.Fragment>
                                <Score num = {this.state.score} num2={this.state.scoreOpponent}/>
                                {!this.state.online ?
                                <Core options={this.props.options} spee={this.state.speed} alive={this.state.alive} add ={this.increase_score} die ={this.die} />
                                :''
                                // <Online setScore={this.getScoreOpponent} onlineScore ={this.state.score} options={this.props.options} spee={this.state.speed} alive={this.state.alive} add ={this.increase_score} die ={this.die}/>
                                
                                }
                        </React.Fragment>                 
                 
                 :      <GameOver result = {this.state.message} score={this.state.score}/>    
                  
                :''
            }
            

            <div style={{flex:2 , display:'flex' , alignItems:'center'}}>
                 {
                  this.state.start ?
                    this.state.speed > 0 ? 
                        this.state.alive ?
                        <button className={classes.button} onClick={this.pause}> Pause</button>

                        :<button className={classes.button} onClick={this.restart}>ReStart</button>
                        
                        :
                        <button className={classes.button} onClick={this.resume}> resume</button>
                    :  
                    <React.Fragment>
                        <button className={classes.button1}  onClick={this.start}>Start</button>
                        {/* <button className={classes.button1}  onClick={this.startOnline}>play online</button> */}
                    </React.Fragment>
                }           
            </div>
        </div>
        )
    }
}


export default Game 