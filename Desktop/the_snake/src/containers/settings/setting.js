import React,{Component} from 'react';
import classes from './setting.module.css'

let colors = ['red','blue','green','black','orange','white']
export default class setting extends Component{
    state ={
        options : {}
    }
    componentWillUnmount(){
        this.props.Set(this.state.options)   
    }
    componentDidMount(){
        this.setState({options : this.props.options})   
    }
    set_mode(a){
        let obj = Object.assign(this.state.options,{mode :a})
        this.setState({options : obj})
    }
    set_speed(a){
        let obj = Object.assign(this.state.options,{speed :a})
        this.setState({options : obj})
    }
    set_thespeed = (a)=>{
        let obj = Object.assign(this.state.options,{thespeed :a.target.value})
        this.setState({options : obj})
    }
    
    set_color = (e)=>{
        document.querySelector('#body').style.backgroundColor = e.target.value;
        let obj = Object.assign(this.state.options,{the_color :e.target.value})
        this.setState({options : obj})
        
    }
    
    set_headColor = (e)=>{
        document.querySelector('#head').style.backgroundColor = e.target.value;
        let obj = Object.assign(this.state.options,{the_headColor :e.target.value})
        this.setState({options : obj})
        
    }
    render(){
        
        return(
            <div className={classes.container}>
            <h1>setting</h1>
            <div className={classes.div}>
                <h2>mode of game</h2>
                <button  className={`${classes.button} 
                ${this.state.options.mode==='free'? classes.active:''}`}  onClick={this.set_mode.bind(this,'free')}>Free</button>
                <button className={`${classes.button} 
                ${this.state.options.mode==='restricted'? classes.active:''}`}  onClick={this.set_mode.bind(this,'restricted')}>Resticted</button>
               
               {/* <div style={{marginTop : 64}}> */}
                    {/* <h2>Body color</h2>
                        <select  onChange={this.set_color}>
                        <option >pick color---</option>
                            {colors.map((col,i)=><option key={i} value={col}>{col}</option>)}
                        </select> */}
                {/* </div> */}
                
            </div >
            <div className={classes.div}> 
                <h2>speed</h2>
                <button className={`${classes.button} 
                ${this.state.options.speed==='fixed'? classes.active:''}`}  onClick={this.set_speed.bind(this,'fixed')}>Fixed</button>
                <button  className={`${classes.button} 
                ${this.state.options.speed==='increased'? classes.active:''}`} onClick={this.set_speed.bind(this,'increased')}>Increased</button>
                {this.state.options.speed==='fixed'?
                       <div>
                        <label>fixed speed :</label>
                        <input onChange={this.set_thespeed} className={classes.input} maxLength='1' autoFocus max='10' defaultValue='2'  type='range'/> 
                        </div> 
                        : this.state.options.speed==='increased'? 
                        <div>
                        <label>Max-speed :</label>
                        <input className={classes.input} onChange={this.set_thespeed}  autoFocus max='10' defaultValue='5'  type='range'/> 
                        </div> :''
                       
                }
                {/* <div style={{marginTop : 42}}>
                    <h2>Head color</h2>
                        <select  onChange={this.set_headColor}>
                        <option >pick color---</option>
                            {colors.map((col,i)=><option key={i} value={col}>{col}</option>)}
                        </select>
                </div>
                 */}
            </div>
            <div style={{display:'flex' , justifyContent:'space-around'}}>
            <div>
                    <h2>Head color</h2>
                        <select  onChange={this.set_headColor}>
                        <option >pick color---</option>
                            {colors.map((col,i)=><option key={i} value={col}>{col}</option>)}
                        </select>
            </div>
            <div>
                
            <h2>Body color</h2>
                        <select  onChange={this.set_color}>
                        <option >pick color---</option>
                            {colors.map((col,i)=><option key={i} value={col}>{col}</option>)}
                        </select>
            </div>
            </div>
            <div style={{marginTop : 40}}>
                <span id='body' style={{display:'inline-block', borderRadius:'10px 0 0 10px' , width:'90px' , height:'20px'}}></span>
                <span id='head' style={{display:'inline-block', borderRadius:'0 10px 10px 0' , width:'10px' , height:'20px'}}></span>
            </div>
            </div>
            
        )
    }

}