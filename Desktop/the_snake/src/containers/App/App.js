import React from 'react';
import './App.css';
import Game from '../the_game/Game'
import Logo from '../../components/logo/logo'
import Setting from '../../containers/settings/setting'

class  App extends React.Component {
   state ={
     setting : false,
     options :{
      mode : 'free',
      speed : 'increased',
      thespeed : 6,
      the_color : 'blue',
      the_headColor : 'red'
     }
   }

   setOptions = (opt)=>{
      this.setState({options : opt})
    }

  setSetting(){
    this.setState((prev)=>{
      return{
        setting : !prev.setting
      }
    })
  }
  render(){

    return (
        <div className="App"> 
            <Logo home={this.state.setting} click={this.setSetting.bind(this)}/>
            {!this.state.setting ? 
            <Game options={this.state.options}/> :
            <Setting options={this.state.options} Set ={this.setOptions}/>
            }
            </div>
      );
  }
}

export default App;
