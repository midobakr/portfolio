import React from 'react'

export default function Score (props){
    return(
                
        <div className='score_box'>
            <h1> Score</h1>
            <span style={{fontSize: '2.2rem'}}>{props.num}</span>
          { props.num2 ? <span style={{display:'inline-block',marginLeft:'10px',fontSize: '2.2rem',color:'rgba(255,0,0,.2)'}}>{props.num2}</span>
            :''}
        </div>
    )
}