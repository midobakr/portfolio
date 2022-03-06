let id;
let hardy = Math.floor(Math.random() * 400)

const the_snake = {
    grow: 0,
    length1: 100,
    hardx: 50,
    hardy,
    start_x1: 150,
    start_y1: hardy,
    toggle1: 'right',
    ways: [],
    snack: [],
    speed: 2,
    arr: [],
    angle1: 0,
    angle2: 0,


}


let fruit = {
    x: Math.floor(Math.random() * 200),
    y: Math.floor(Math.random() * 200)
};
// let arr = [];

let myOponnent;

function run(add, diee, options, socket, room_id, send , width) {
    let canvas = document.querySelector('canvas');
    if (window.innerWidth < 700) {
        canvas.width = window.innerWidth - 25;
    } else {
        canvas.width = window.innerWidth / 2
    }
    if(width){
        canvas.width = width
    }
    // canvas.width = 400;
    the_snake.width = canvas.width;
    the_snake.height = canvas.height;



    let c = canvas.getContext('2d');
    c.lineWidth = 16;
    let color = options.the_color;
    let color_head = options.the_headColor;

    function animate() {
        if (socket) {
            socket.emit('onPlay', {
                room_id,
                the_snake,
                color: {
                    head: color_head,
                    body: color
                },
                fruit,
            })
        }

        id = requestAnimationFrame(animate)


        draw()
        remove()
        die()
        eat()
        if (myOponnent) {


            done(myOponnent.the_snake.hardx, myOponnent.the_snake.hardy,
                myOponnent.the_snake.start_x1, myOponnent.the_snake.start_y1,
                myOponnent.the_snake.angle1, myOponnent.the_snake.angle2,
                myOponnent.color.body, myOponnent.color.head,
                myOponnent.the_snake.ways, myOponnent.the_snake.arr,
                true)

        }
    }

    function eat() {
        let distance = getDistance(fruit.x, fruit.y, the_snake.start_x1, the_snake.start_y1);
        if (distance < c.lineWidth + c.lineWidth / 2) {
            if (socket) {
                socket.emit('ate', room_id)
                fruit = {}
                add(the_snake.speed)
                send()
            } else {
                fruit.x = Math.floor(Math.random() * canvas.width);
                fruit.y = Math.floor(Math.random() * canvas.height);
                add(the_snake.speed)
            }
            if (options.speed === 'increased') {
                if (the_snake.speed >= options.thespeed) {} else {
                    the_snake.speed += .2
                };
            }
            the_snake.grow = 10

        }
    }

    function getDistance(x1, y1, x2, y2) {

        let distance_x = x1 - x2;
        let distance_y = y1 - y2;
        let distance = Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2));

        return distance
    }


    function draw() {
        c.clearRect(0, 0, canvas.width, canvas.height)
        the_snake.length1 += the_snake.grow;

        switch (the_snake.toggle1) {
            case 'right':
                the_snake.angle1 = 270;
                the_snake.angle2 = 90;
                the_snake.start_x1 += the_snake.speed
                the_snake.start_x1 += the_snake.grow
                if (the_snake.start_x1 >= the_snake.hardx + the_snake.length1) {
                    the_snake.hardx += the_snake.speed
                }
                break;
            case 'left':
                the_snake.angle1 = 90;
                the_snake.angle2 = 270;
                the_snake.start_x1 -= the_snake.speed
                the_snake.start_x1 -= the_snake.grow
                if (the_snake.start_x1 <= the_snake.hardx - the_snake.length1) {
                    the_snake.hardx -= the_snake.speed
                }
                break;
            case 'down':
                the_snake.angle1 = 360;
                the_snake.angle2 = 180;
                the_snake.start_y1 += the_snake.speed
                the_snake.start_y1 += the_snake.grow
                if (the_snake.start_y1 >= the_snake.hardy + the_snake.length1) {
                    the_snake.hardy += the_snake.speed
                }
                break;
            case 'up':
                the_snake.angle1 = 180;
                the_snake.angle2 = 360;
                the_snake.start_y1 -= the_snake.speed
                the_snake.start_y1 -= the_snake.grow
                if (the_snake.start_y1 <= the_snake.hardy - the_snake.length1) {
                    the_snake.hardy -= the_snake.speed
                }
                break;
            default:
                the_snake.toggle1 = 'right';
        }
        c.beginPath()
        c.fillStyle = 'red'
        c.arc(fruit.x, fruit.y, c.lineWidth, 0, 2 * Math.PI, false)
        c.fill()


        done(the_snake.hardx, the_snake.hardy, the_snake.start_x1, the_snake.start_y1, the_snake.angle1, the_snake.angle2, color, color_head, the_snake.ways, the_snake.arr)
        the_snake.grow = 0;

    
    
    
    }
    

    function done(hardx, hardy, start_x1, start_y1, angle1, angle2, color, color_head, ways, arr, is) {
      
        c.beginPath()
        if (is) { 
            c.fillStyle = 'black'
        } else {
            c.fillStyle = color_head
        }
        //tail
        c.beginPath()
        c.fillStyle = color
        c.arc(hardx, hardy, c.lineWidth / 2, 0 * Math.PI / 180, 360 * Math.PI / 180)
        c.fill()
        //body
        c.strokeStyle = color
        c.beginPath()
        c.moveTo(hardx, hardy)
        c.lineTo(start_x1, start_y1)
        c.stroke()

         //head
        c.beginPath()
        c.fillStyle = color_head
        c.arc(start_x1, start_y1, c.lineWidth / 2, angle1 * Math.PI / 180, angle2 * Math.PI / 180)
        c.fill()
        c.closePath();
        if (ways[0]) {
            for (let qw = 0; qw < ways.length - 1; qw++) {
                if (ways.length > 1 && !ways[qw].connect) {
                    c.beginPath()
                    c.fillStyle = color
                    c.arc(ways[qw].x2, ways[qw].y2, c.lineWidth / 2, 0 * Math.PI / 180, 360 * Math.PI / 180)
                    c.fill()
                    c.beginPath()
                    c.moveTo(ways[qw].x2, ways[qw].y2);
                    c.lineTo(ways[qw + 1].x2, ways[qw + 1].y2)
                    c.stroke()
                }
            }
            c.beginPath()
            c.moveTo(ways[0].x1, ways[0].y1);
            c.lineTo(ways[0].x2, ways[0].y2)
            c.stroke()

            c.beginPath()
            c.fillStyle = color
            c.arc(ways[0].x1, ways[0].y1, c.lineWidth / 2, 0 * Math.PI / 180, 360 * Math.PI / 180)
            c.fill()

            let go = ways.find((p) => p.connect)
            if (go && arr[0]) {
                for (let i = 0; i < arr.length; i++) {
                    c.beginPath()
                    c.moveTo(arr[i].x1, arr[i].y1);
                    c.lineTo(arr[i].x2, arr[i].y2)
                    c.stroke()
                }
            }

        }

    }

    function remove() {
        if (the_snake.ways[0]) {

            remove2(the_snake.ways)
        }
        if (the_snake.start_x1 > canvas.width || the_snake.start_y1 > canvas.height || the_snake.start_x1 < 0 || the_snake.start_y1 < 0) {
            the_snake.ways.push({
                x1: the_snake.hardx,
                y1: the_snake.hardy,
                x2: the_snake.start_x1,
                y2: the_snake.start_y1,
                connect: true
            })
            if (the_snake.start_x1 > canvas.width) {
                the_snake.start_x1 = 0;
                the_snake.hardx = 0
            }
            if (the_snake.start_y1 > canvas.height) {
                the_snake.start_y1 = 0;
                the_snake.hardy = 0
            }
            if (the_snake.start_x1 < 0) {
                the_snake.start_x1 = canvas.width;
                the_snake.hardx = canvas.width
            }
            if (the_snake.start_y1 < 0) {
                the_snake.start_y1 = canvas.height;
                the_snake.hardy = canvas.height
            }
        }
    }

    function remove2(ways) {
        if (ways[0]) {


            if (ways[0].y1 === ways[0].y2) {
                if (ways[0].x1 < ways[0].x2) {
                    ways[0].x1 += the_snake.speed;
                    if (ways[0].x1 > ways[0].x2) {
                        ways[0].x1 = ways[0].x2;
                    }
                }
                if (ways[0].x1 > ways[0].x2) {
                    ways[0].x1 -= the_snake.speed;
                    if (ways[0].x1 < ways[0].x2) {
                        ways[0].x1 = ways[0].x2;
                    }

                }

                if (ways[0].x1 === ways[0].x2) {
                    if (ways[0].connect) {
                        the_snake.arr.splice(0, 1)
                    }
                    ways.splice(0, 1)
                    the_snake.snack.splice(0, 1)
                }
            } else if (ways[0].x1 === ways[0].x2) {
                if (ways[0].y1 < ways[0].y2) {
                    ways[0].y1 += the_snake.speed;
                    if (ways[0].y1 > ways[0].y2) {
                        ways[0].y1 = ways[0].y2;
                    }
                }
                if (ways[0].y1 > ways[0].y2) {
                    ways[0].y1 -= the_snake.speed;
                    if (ways[0].y1 < ways[0].y2) {
                        ways[0].y1 = ways[0].y2;
                    }
                }
                if (ways[0].y1 === ways[0].y2) {
                    if (ways[0].connect) {
                        the_snake.arr.splice(0, 1)
                    }
                    ways.splice(0, 1)
                    the_snake.snack.splice(0, 1)
                }
            }

        }
    }

    function die() {
        if (options.mode === 'restricted') {
            if (the_snake.start_x1 >= canvas.width || the_snake.start_y1 >= canvas.height || the_snake.start_x1 <= 0 || the_snake.start_y1 <= 0) {
                diee()
                return;
            }
        }

        if (the_snake.ways.length === 1 && (the_snake.length1 >= canvas.width - c.lineWidth || the_snake.length1 >= canvas.height - c.lineWidth) && the_snake.ways[0].connect === true) {
            diee()
        }
        the_snake.ways.forEach((obj) => {
            let distanceX = the_snake.start_x1 - obj.x1;
            let distanceY = the_snake.start_y1 - obj.y1;
            if (Math.abs(distanceY) <= c.lineWidth) {
                if ((the_snake.start_x1 < obj.x2 && the_snake.start_x1 > obj.x1) || (the_snake.start_x1 > obj.x2 && the_snake.start_x1 < obj.x1)) {
                    diee()
                }
            }
            if (Math.abs(distanceX) <= c.lineWidth) {
                if ((the_snake.start_y1 < obj.y2 && the_snake.start_y1 > obj.y1) || (the_snake.start_y1 > obj.y2 && the_snake.start_y1 < obj.y1)) {
                    diee()
                }
            }
        })
    }
    animate()
}

function control(e) {
    if ((e.keyCode === 37 || e.keyCode === 39) && the_snake.speed !== 0) {

        if (the_snake.ways[0]) {
            if (the_snake.ways[the_snake.ways.length - 1].connect) {
                the_snake.arr.push({
                    x1: the_snake.hardx,
                    y1: the_snake.hardy,
                    x2: the_snake.start_x1,
                    y2: the_snake.start_y1,
                    draw: true,

                })
            }
        }
        the_snake.ways.push({
            x1: the_snake.hardx,
            y1: the_snake.hardy,
            x2: the_snake.start_x1,
            y2: the_snake.start_y1

        })
        if (e.keyCode === 39) {
            the_snake.hardy = the_snake.start_y1;
            the_snake.hardx = the_snake.start_x1;
            if (the_snake.toggle1 === 'right' || the_snake.toggle1 === '') {
                the_snake.toggle1 = 'down'
            } else if (the_snake.toggle1 === 'down') {
                the_snake.toggle1 = 'left'
            } else if (the_snake.toggle1 === 'left') {
                the_snake.toggle1 = 'up'
            } else if (the_snake.toggle1 === 'up') {
                the_snake.toggle1 = 'right'
            }
        }
        if (e.keyCode === 37) {
            the_snake.hardy = the_snake.start_y1;
            the_snake.hardx = the_snake.start_x1;
            if (the_snake.toggle1 === 'right' || the_snake.toggle1 === '') {
                the_snake.toggle1 = 'up'
            } else if (the_snake.toggle1 === 'up') {
                the_snake.toggle1 = 'left'
            } else if (the_snake.toggle1 === 'left') {
                the_snake.toggle1 = 'down'
            } else if (the_snake.toggle1 === 'down') {
                the_snake.toggle1 = 'right'
            }
        }
    }
}

function getId() {
    return id
}

function setSpeed(m) {
    the_snake.speed = m;
}

function reset() {
    the_snake.length1 = 100;
    the_snake.hardx = 50;
    the_snake.hardy = Math.floor(Math.random() * 400);
    the_snake.start_x1 = the_snake.hardx + the_snake.length1;
    the_snake.start_y1 = the_snake.hardy;
    the_snake.toggle1 = 'right';
    the_snake.speed = 2
    the_snake.ways = [];
    the_snake.arr = []
    the_snake.snack = []
    window.cancelAnimationFrame(id)

}

function setFruit(m) {
    fruit = m
}

function setMyOpponent(m) {
    myOponnent = m
}

export {
    run,
    control,
    getId,
    setSpeed,
    reset,
    setFruit,
    setMyOpponent
}
// let id ; 
// let grow = 0
// let length1 = 100;
// let hardx = 50;
// let hardy = Math.floor(Math.random()*400)
// let start_x1 = hardx + length1;
// let start_y1 = hardy;
// let toggle1 = 'right';
// let ways = [];
// let snack = [];
// let speed = 2 ; 


// let fruit = {
//     x: Math.floor(Math.random() * 200), 
//     y: Math.floor(Math.random() * 200)
// };
// let arr = [];
// let angle1 = 0;
// let angle2 = 0;

// let myOponnent;
// function run(add , diee , options, socket,room_id,send){
//     let canvas = document.querySelector('canvas');
//     if(window.innerWidth< 700){
//         canvas.width = window.innerWidth-5
//     }else{
//         canvas.width = window.innerWidth/2
//     }

//     let c = canvas.getContext('2d');
//     c.lineWidth = 16;
//     let color = options.the_color;
//     let color_head = options.the_headColor;

//     function animate() {
//         if(socket){
//                 socket.emit('onPlay',{
//                     room_id,
//                     snack:{
//                         hardx, 
//                         hardy ,
//                     start_x1,
//                     start_y1,
//                     angle1,
//                     angle2
//                     },
//                     color:{
//                         head : color_head,
//                         body : color
//                     },
//                     // fruit,
//                     ways,
//                     arr
//                 }) 
//         }

//         id =  requestAnimationFrame(animate)


//         draw()
//         remove()
//         die()
//         eat()
//         if(myOponnent){

//             done(myOponnent.snack.hardx,myOponnent.snack.hardy,
//                 myOponnent.snack.start_x1, myOponnent.snack.start_y1,
//                 myOponnent.snack.angle1,myOponnent.snack.angle2,
//                 myOponnent.color.body,myOponnent.color.head,
//                 myOponnent.ways , myOponnent.arr,
//                 true)

//     }
// } 

//     function eat() {
//         let distance = getDistance(fruit.x,fruit.y , start_x1,start_y1);
//         if (distance < c.lineWidth+c.lineWidth/2) {
//             if(socket){
//             socket.emit('ate',room_id)  
//             fruit ={}
//             add(speed)
//             send()
//             }else{
//             fruit.x =Math.floor(Math.random() * canvas.width);
//             fruit.y =Math.floor(Math.random() * canvas.height);
//             add(speed)
//            }
//             if(options.speed === 'increased'){
//                 if(speed >=options.thespeed ){}else{speed += .2};                
//             }   
//            grow = 10

//         }
//     }
//     function getDistance(x1,y1,x2,y2){

//         let distance_x = x1 - x2;
//         let distance_y = y1 - y2;
//         let distance = Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2));

//         return distance
//     }


//     function draw() {
//         c.clearRect(0, 0, canvas.width, canvas.height)
//         length1 += grow;

//         switch (toggle1) {
//             case 'right':
//                 angle1 = 270;
//                 angle2 = 90;
//                 start_x1 += speed
//                 start_x1 += grow
//                 if (start_x1 >= hardx + length1) {
//                     hardx += speed
//                 }
//                 break;
//             case 'left':
//                 angle1 = 90;
//                 angle2 = 270;
//                 start_x1 -= speed
//                 start_x1 -= grow
//                 if (start_x1 <= hardx - length1) {
//                     hardx -= speed
//                 }
//                 break;
//             case 'down':
//                 angle1 = 360;
//                 angle2 = 180;
//                 start_y1 += speed
//                 start_y1 += grow
//                 if (start_y1 >= hardy + length1) {
//                     hardy += speed
//                 }
//                 break;
//             case 'up':
//                 angle1 = 180;
//                 angle2 = 360;
//                 start_y1 -= speed
//                 start_y1 -= grow
//                 if (start_y1 <= hardy - length1) {
//                     hardy -= speed
//                 }
//                 break;
//             default :toggle1='right';    
//         }
//         c.beginPath()
//         c.fillStyle = 'red'
//         c.arc(fruit.x, fruit.y, c.lineWidth , 0, 2 * Math.PI, false)
//         c.fill()


//         done(hardx,hardy,start_x1,start_y1,angle1,angle2,color,color_head,ways,arr)
//         grow = 0;

//     }
//     function done(hardx , hardy,start_x1,start_y1,angle1,angle2,color,color_head,ways,arr,is){

//         c.beginPath()
//         if(is){
//             c.fillStyle = 'black'
//        }else{
//            c.fillStyle = color_head
//        }

//         c.beginPath()
//         c.fillStyle = color
//         c.arc(hardx, hardy, c.lineWidth / 2, 0 * Math.PI / 180, 360 * Math.PI / 180)
//         c.fill()

//         c.strokeStyle = color
//         c.beginPath()
//         c.moveTo(hardx, hardy)
//         c.lineTo(start_x1, start_y1)
//         c.stroke()
//         c.beginPath() //head

//             c.fillStyle = color_head

//         c.arc(start_x1, start_y1, c.lineWidth / 2, angle1 * Math.PI / 180, angle2 * Math.PI / 180)
//         c.fill()
//         c.closePath();
//         if (ways[0]) {
//             for (let qw = 0; qw < ways.length - 1; qw++) {
//                 if (ways.length > 1 && !ways[qw].connect) {
//                     c.beginPath()
//                     c.fillStyle = color
//                     c.arc(ways[qw].x2, ways[qw].y2, c.lineWidth / 2, 0 * Math.PI / 180, 360 * Math.PI / 180)
//                     c.fill()
//                     c.beginPath()
//                     c.moveTo(ways[qw].x2, ways[qw].y2);
//                     c.lineTo(ways[qw + 1].x2, ways[qw + 1].y2)
//                     c.stroke()
//                 }
//             }
//             c.beginPath()
//             c.moveTo(ways[0].x1, ways[0].y1);
//             c.lineTo(ways[0].x2, ways[0].y2)
//             c.stroke()

//             c.beginPath()
//             c.fillStyle = color
//             c.arc(ways[0].x1, ways[0].y1, c.lineWidth / 2, 0 * Math.PI / 180, 360 * Math.PI / 180)
//             c.fill()

//             let go = ways.find((p) => p.connect)
//             if (go && arr[0]) {
//                 for (let i = 0; i < arr.length; i++) {
//                     c.beginPath()
//                     c.moveTo(arr[i].x1, arr[i].y1);
//                     c.lineTo(arr[i].x2, arr[i].y2)
//                     c.stroke()
//                 }
//             }

//         }    

//     }
//     function remove() {
//         if (ways[0]) {

//             remove2(ways)
//         }
//         if (start_x1 > canvas.width || start_y1 > canvas.height || start_x1 < 0 || start_y1 < 0) {
//             ways.push({
//                 x1: hardx,
//                 y1: hardy,
//                 x2: start_x1,
//                 y2: start_y1,
//                 connect: true
//             })
//             if (start_x1 > canvas.width) {
//                 start_x1 = 0;
//                 hardx = 0
//             }
//             if (start_y1 > canvas.height) {
//                 start_y1 = 0;
//                 hardy = 0
//             }
//             if (start_x1 < 0) {
//                 start_x1 = canvas.width;
//                 hardx = canvas.width
//             }
//             if (start_y1 < 0) {
//                 start_y1 = canvas.height;
//                 hardy = canvas.height
//             }
//         }
//     }

//     function remove2(ways) {
//         if (ways[0]) {


//             if (ways[0].y1 === ways[0].y2) {
//                 if (ways[0].x1 < ways[0].x2) {
//                     ways[0].x1 += speed;
//                     if (ways[0].x1 > ways[0].x2) {
//                         ways[0].x1 = ways[0].x2;
//                     }
//                 }
//                 if (ways[0].x1 > ways[0].x2) {
//                     ways[0].x1 -= speed;
//                     if (ways[0].x1 < ways[0].x2) {
//                         ways[0].x1 = ways[0].x2;
//                     }

//                 }

//                 if (ways[0].x1 === ways[0].x2) {
//                     if (ways[0].connect) {
//                         arr.splice(0, 1)
//                     }
//                     ways.splice(0, 1)
//                     snack.splice(0, 1)
//                 }
//             } else if (ways[0].x1 === ways[0].x2) {
//                 if (ways[0].y1 < ways[0].y2) {
//                     ways[0].y1 += speed;
//                     if (ways[0].y1 > ways[0].y2) {
//                         ways[0].y1 = ways[0].y2;
//                     }
//                 }
//                 if (ways[0].y1 > ways[0].y2) {
//                     ways[0].y1 -= speed;
//                     if (ways[0].y1 < ways[0].y2) {
//                         ways[0].y1 = ways[0].y2;
//                     }
//                 }
//                 if (ways[0].y1 === ways[0].y2) {
//                     if (ways[0].connect) {
//                         arr.splice(0, 1)
//                     }
//                     ways.splice(0, 1)
//                     snack.splice(0, 1)
//                 }
//             }

//         }
//     }

//     function die() {
//      if(options.mode ==='restricted'){
//         if (start_x1 >= canvas.width || start_y1 >= canvas.height || start_x1 <=0 || start_y1 <= 0) {
//             diee()
//             return;       
//         }
//     }

//         if(ways.length ===1 && (length1 >= canvas.width-c.lineWidth ||length1 >= canvas.height-c.lineWidth) &&ways[0].connect===true){
//             diee()
//         }
//         ways.forEach((obj) => {
//                 let distanceX = start_x1 - obj.x1;
//                 let distanceY = start_y1 - obj.y1;
//                 if(Math.abs(distanceY) <=c.lineWidth){
//                     if ((start_x1 < obj.x2 && start_x1> obj.x1) ||(start_x1> obj.x2 && start_x1< obj.x1 )){
//                         diee()
//                     }
//                 }
//                 if(Math.abs(distanceX) <=c.lineWidth){
//                     if ((start_y1 < obj.y2 && start_y1> obj.y1)||(start_y1> obj.y2 && start_y1< obj.y1)){
//                         diee()
//                     } 
//                 }
//         })
//     }
//     animate()
//     }
// function control(e){
//           if ((e.keyCode === 37 ||e.keyCode === 39 )&& speed !==0 ) {

//             if (ways[0]) {
//                 if (ways[ways.length - 1].connect) {
//                     arr.push({
//                         x1: hardx,
//                         y1: hardy,
//                         x2: start_x1,
//                         y2: start_y1,
//                         draw: true,

//                     })
//                 }
//             }
//             ways.push({
//                 x1: hardx,
//                 y1: hardy,
//                 x2: start_x1,
//                 y2: start_y1

//             })
//             if (e.keyCode === 39) {
//                 hardy = start_y1;
//                 hardx = start_x1;
//                 if (toggle1 === 'right' || toggle1 === '') {
//                     toggle1 = 'down'
//                 } else if (toggle1 === 'down') {
//                     toggle1 = 'left'
//                 } else if (toggle1 === 'left') {
//                     toggle1 = 'up'
//                 } else if (toggle1 === 'up') {
//                     toggle1 = 'right'
//                 }
//             }
//             if (e.keyCode === 37) {
//                 hardy = start_y1;
//                 hardx = start_x1;
//                 if (toggle1 === 'right' || toggle1 === '') {
//                     toggle1 = 'up'
//                 } else if (toggle1 === 'up') {
//                     toggle1 = 'left'
//                 } else if (toggle1 === 'left') {
//                     toggle1 = 'down'
//                 } else if (toggle1 === 'down') {
//                     toggle1 = 'right'
//                 }
//             }
//           }
//     }

// function getId(){
//         return id
//     }
// function setSpeed(m){
//     speed = m ;
// }
// function reset(){
//             length1 = 100;
//             hardx = 50;
//             hardy = 50
//             start_x1 = hardx + length1;
//             start_y1 = hardy;
//             toggle1 = 'right';
//             speed = 2
//             ways = [];
//             arr = []
//             snack = []
//             window.cancelAnimationFrame(id)

// }
// function setFruit(m){
//   fruit = m
// }    
// function setMyOpponent(m){
//   myOponnent = m
// }    

// export  {run , control , getId , setSpeed , reset , setFruit , setMyOpponent}   