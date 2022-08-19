var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
var size = 30;
var field_width = 12;
var field_height = 22;

class Block {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    draw(shape) {
        switch(shape){
            case 1: ctx.fillStyle = "red";
            case 2: ctx.fillStyle = "red";
            case 3: ctx.fillStyle = "red";
            case 4: ctx.fillStyle = "red";
            case 5: ctx.fillStyle = "red";
        }
        ctx.fillRect(this.x*size, this.y*size, size, size); 
    }
}

class Mino {
    constructor(x, y, rot, shape){
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.shape = shape;
    }
    calcBlocks() {
        let blocks;
        switch(this.shape){
            case 1: blocks = [
                new Block(-1,0),
                new Block(0,0),
                new Block(0,-1),
                new Block(1,0),
            ]; break;
            case 2: blocks = [
                new Block(-1,0),
                new Block(0,0),
                new Block(0,-1),
                new Block(1,0),
            ]; break;
            case 3: blocks = [
                new Block(-1,0),
                new Block(0,0),
                new Block(0,-1),
                new Block(1,0),
            ]; break;
            case 4: blocks = [
                new Block(-1,0),
                new Block(0,0),
                new Block(0,-1),
                new Block(1,0),
            ]; break; 
        }
        
        this.rot = (4+this.rot)%4;
        for(let r=0; r<this.rot; r++){
            blocks = blocks.map(b => new Block(-b.y, b.x));
        }
        return blocks;
    }
    draw() {
        let blocks = this.calcBlocks();
        blocks.forEach(b => (b.x += this.x, b.y += this.y));
        blocks.forEach(b => b.draw(this.shape));
    }
}

class Field { 
    constructor(){
        //22*12
        this.tiles = [
            [1,1,1,0,0,0,0,0,0,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1],
        ];
    }
    tileAt(x, y) {
        return this.tiles[y][x];
    }
    setTile(x, y) {
        this.tiles[y][x] = 1;
    }
    draw() {
        ctx.fillStyle = "black";
        for(let row=0; row<field_height; row++){
            for(let col=0; col<field_width; col++){
                if(this.tileAt(col, row) == 1) ctx.fillRect(col*size, row*size, size, size);
            }
        }
    }
}

class Game {
    constructor() {
        this.field = new Field();
        this.mino = new Mino(5, 10, 0, 1);
        this.minoVx = 0;
        this.minoVy = 0;
        this.minoVr = 0;
    }
    newMino(mino, field){
        let blocks = mino.calcBlocks();
        // console.log(mino);
        // blocks.forEach(b => console.log(b.x+mino.x, b.y+mino.y));
        if(blocks.some(b => field.tileAt(b.x+mino.x,b.y+mino.y) == 1)){
            blocks.forEach(b => field.setTile(b.x+mino.x, b.y+mino.y-1));
            this.mino = new Mino(5, 10, 0, 1);
        }
    }
    isMinoMovable(mino, field) {
        let blocks = mino.calcBlocks();
        // blocks.forEach(b => console.log(b.y+mino.y));
        return blocks.every(b => field.tileAt(b.x+mino.x,b.y+mino.y) == 0);
    }
    proc(){
        if(this.isNew){
            this.newMino(this.mino, this.field);
            this.isNew = false;
        }
        if(this.minoVx != 0){
            let futureMino = new Mino(this.mino.x, this.mino.y, this.mino.rot, this.mino.shape);
            futureMino.x += this.minoVx;
            if (this.isMinoMovable(futureMino, this.field)){
                this.mino.x += this.minoVx;
            }
            this.minoVx = 0;
        }
        if(this.minoVy != 0){
            let futureMino = new Mino(this.mino.x, this.mino.y, this.mino.rot, this.mino.shape);
            futureMino.y += this.minoVy;
            this.newMino(futureMino, this.field);
            if (this.isMinoMovable(futureMino, this.field)){
                this.mino.y += this.minoVy;
            }
            this.minoVy = 0;
        }
        if(this.minoVr != 0){
            let futureMino = new Mino(this.mino.x, this.mino.y, this.mino.rot, this.mino.shape);
            futureMino.rot += this.minoVr;
            if (this.isMinoMovable(futureMino, this.field)){
                this.mino.rot += this.minoVr;
            }
            this.minoVr = 0;
        }
        this.mino.draw();
        this.field.draw();
    }
}

let game = new Game();
let keyName;
document.addEventListener("keypress", event => {
    keyName = event.key;
    console.log(keyName);
    if(keyName == "a") {
        ctx.clearRect(size, size, canvas.width-2*size, canvas.height-2*size);
        game.minoVx = -1;
        game.proc();
    }
    if (keyName == "d") {
        ctx.clearRect(size, size, canvas.width-2*size, canvas.height-2*size);
        game.minoVx = +1;
        game.proc();
    }
    if (keyName == "q") {
        ctx.clearRect(size, size, canvas.width-2*size, canvas.height-2*size);
        game.minoVr = -1;
        game.proc();
    }
    if (keyName == "e") {
        ctx.clearRect(size, size, canvas.width-2*size, canvas.height-2*size);
        game.minoVr = +1;
        game.proc();
    } 
})

let counter = 0;
const timerId = setInterval(function(){
    if(++counter == 50){
        ctx.clearRect(size, size, canvas.width-2*size, canvas.height-2*size);
        game.minoVy = +1;
        counter = 0;
    }
    game.proc();
    if(keyName == "s"){ 
        clearInterval(timerId)
    }
}, 20)



