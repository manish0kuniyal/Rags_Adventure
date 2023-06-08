
kaboom({
    width:1280,
    height:720
})
loadSprite('background-0', 'BG-sky.png') 
loadSprite('background-1', 'BG-mountains.png')
loadSprite('background-2', 'BG-ruins.png') 
loadSprite('attack', 'Attack4.png') 
loadSprite('fall', 'Fall.png') 
loadSprite('idle', 'Idle.png') 
loadSprite('platform-1','platforms2.png')
loadSprite('platform-2','platforms4.png')
loadSprite('ground','bridge1.png')
loadSprite('rock','rocks6.png')
loadSprite('gate','tree03.png')
loadSprite('obst','rocks4.png')

let key=false;
add([
    sprite('background-0'),
    fixed(),
    scale(4)
])
add([
    sprite('background-0'),
    fixed(),
    pos(1000,0),
    scale(4)
])
add([
    sprite('background-1'),
    fixed(),
    pos(0,-200),
    scale(4)
])
add([
    sprite('background-1'),
    fixed(),
    pos(800,-160),
    scale(4)
])
add([
    sprite('background-2'),
    fixed(),
      pos(0,-100),
    scale(4)
])
add([
    sprite('background-2'),
    fixed(),
      pos(600,-100),
    scale(4)
])

const map=[
    [
    '0   0000000000000000000000000000000',
    '0     2                           0',
    '0     2  3                         0',
    '0     2  2                     4  0',
    '0     2      22     2   22222222220',
    '0     2                           0',
    '0     2                           0',
    '0     2                           0',
    '0     25                           0',
    '0     222222                      0',
    '0               2                 0',
    '0                       222       0',
    '0                                 0',
    '0                                 0',
    '0                              2  0',
    '0                                 0',
    '0                  555            0',
    '0222222222222222222222222222222222',
    '00000000000000000000000000000000000'
    ]
]

const level1=addLevel(map[0],{
    tileWidth:16,
    tileHeight:16,
    tiles:{
        0:()=>[sprite('ground'),area(),body({isStatic:true})]
        ,1:()=>[sprite('platform-1'),area(),body({isStatic:true})]
        ,2:()=>[sprite('platform-2'),area(),body({isStatic:true})]
        ,3:()=>[sprite('rock'),area(),pos(0,-5),body({isStatic:true}),'rock']
        ,4:()=>[sprite('gate'),area(),pos(10,-30),body({isStatic:true}),'gate']
        ,5:()=>[sprite('obst'),area(),pos(0),body({isStatic:true}),'obst']
       
    }
})

level1.use(scale(2.4))
level1.use(pos(0,0))






loadSprite('idle','Idle.png',{
    sliceX:8, sliceY:1,
    anims:{'idle':{from:0, to:7, loop:true}}
})
loadSprite('eWalk','Flight.png',{
    sliceX:8,sliceY:1,
    anims:{'eWalk':{from:0, to:7,loop:true}}
})
loadSprite('run','Run.png',{
    sliceX:8, sliceY:1,
    anims:{'run':{from:0, to:7, loop:true}}
})
loadSprite('jump','Jump.png',{
    sliceX:2, sliceY:1,
    anims:{'jump':{from:0, to:1, loop:true}}
})
loadSprite('fall','Fall.png',{
    sliceX:2, sliceY:1,
    anims:{'fall':{from:0, to:1, loop:true}}
})

setGravity(1000)

const player=add([
  sprite('idle'),
  scale(1.5),
  area({shape:new Rect(vec2(0),32,32),offset:vec2(0,0)}),
  anchor('center'),
  body(),
  pos(100,10),{
     speed:500,
     previousHeight:null,
     heightDelta:0,
     direction:'right'
  },
  'player'
])

player.play('idle')

const message = add([
    text(''),  
    pos(600, 50), ])


onKeyDown('right',()=>{
    if(player.curAnim() !=='run' && player.isGrounded()){
        player.use(sprite('run'))
        player.play('run')
    }
    if(player.direction !== 'right' )  player.direction='right'
    player.move(player.speed,0)
})

onKeyRelease('right',()=>{
    player.use(sprite('idle'))
    player.play('idle')
})


onKeyDown('left',()=>{
    if(player.curAnim() !=='run' && player.isGrounded()){
        player.use(sprite('run'))
        player.play('run')
    }
    if(player.direction !== 'left' )  player.direction='left'
    player.move(-player.speed,0)
})

onKeyRelease('left',()=>{
    player.use(sprite('idle'))
    player.play('idle')
})

onKeyPress('up',()=>{
      if(player.isGrounded()){
       player.jump()
      }
})

camScale(1) 

onUpdate(()=>{

     if(player.previousHeight){
        player.heightDelta=player.previousHeight-player.pos.y
     }
    player.previousHeight=player.pos.y
     if(player.curAnim() !== 'run' && player.isGrounded()){
        player.use(sprite('idle'))
        player.play('idle')
     }
    
     if(player.curAnim() !== 'jump' && !player.isGrounded() && player.heightDelta>0){
        player.use(sprite('jump'))
        player.play('jump')
     }
      
     if(player.curAnim() !== 'fall' && !player.isGrounded() && player.heightDelta<0){
        player.use(sprite('fall'))
        player.play('fall')
     }
    
     if(player.direction ==='left'){
        player.flipX=true}
        else{
        player.flipX=false
     }
player.onCollide('rock',(rock)=>{
    destroy(rock)
    key=true;
})
player.onCollide('obst',(obst)=>{
    destroy(player)
    window.location.reload()
})
player.onCollide('gate',()=>{
    if(key){
        message.text='YOU WON!!'
}
else{
    message.text="GET THE HOLY ROCK!!"
}
})
    })

    