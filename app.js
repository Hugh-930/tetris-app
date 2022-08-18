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
    draw() {
        ctx.fillRect(this.x*size, this.y*size, size, size);
    }
}

class Mino {
    constructor(x, y, rot, shape){
        this.x = x;
        this.y = y;
        this.rot = (40+rot)%4;
        this.shape = shape;
    }
    calcBlocks() {
        let blocks = [
            new Block(-1,0),
            new Block(0,0),
            new Block(0,-1),
            new Block(1,0),
        ];
        for(let r=0; r<this.rot; r++){
            blocks = blocks.map(b => new Block(-b.y, b.x));
            console.log(this.rot)
        }
        return blocks;
    }
    draw() {
        let blocks = this.calcBlocks();
        blocks.forEach(b => (b.x += this.x, b.y += this.y));
        blocks.forEach(b => b.draw());
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
    tileAt(x, y){
        return this.tiles[x][y];
    }
    draw() {
        for(let row=0; row<field_height; row++){
            for(let col=0; col<field_width; col++){
                if(this.tileAt(row,col) == 1) ctx.fillRect(col*size, row*size, size, size);
            }
        }
    }
}

class Game {
    constructor() {
        this.mino = new Mino(5, 10, 0, 0);
        this.field = new Field();
        this.minoVx = 0;
        this.minoVr = 0;
        this.fc++;
    }
    proc(){
        if(this.minoVx != 0){
            this.mino.x += this.minoVx;
            this.minoVx = 0;
        }
        if(this.minoVr != 0){
            this.mino.rot += this.minoVr;
            this.minoVr = 0;
        }
        this.mino.draw();
        this.field.draw();
        this.fc++;
    }
}

let game = new Game();

document.addEventListener("keypress", event => {
    let keyName = event.key;
    console.log(keyName);
    if(keyName == "a") {
        ctx.clearRect(size, size, canvas.width-2*size, canvas.height-2*size);
        game.minoVx = -1;
        game.proc();
    }
    if (keyName == "d") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.minoVx = +1;
        game.proc();
    }
    if (keyName == "q") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.minoVr = -1;
        game.proc();
    }
    if (keyName == "e") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.minoVr = +1;
        game.proc();
    } 
})

game.proc();


