import * as runn  from './run'

 let touch_start = 0
    
    function get_FirstTouch(e){
        touch_start = e.changedTouches[0].clientX
    }
    
    function TouchControl(e){
    
       let touch_end = e.changedTouches[0].clientX
         if(touch_start > touch_end){
             e.keyCode = 37
            }
         if(touch_start < touch_end){
             e.keyCode = 39
         }
         runn.control(e)
    }
    

    export {get_FirstTouch , TouchControl}