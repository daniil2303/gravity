var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = 500;
c.height = 350;
document.body.appendChild(c);	 	 //добавление константы - постоянного значения

var perm = [];
while (perm.length < 250) {				//генерация гор
	while(perm.includes(val = Math.floor(Math.random()*250)));
	perm.push(val);
}

var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t*Math.PI))/2;
var noise = x=> { 				//создание "шумов" на фоне
	x = x * 0.01 % 255;
	return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}

		//PLAYER
var player = new function(){
	this.x = c.width/2;
	this.y = 0;
	this.rot = 0;

	this.img = new Image();
	this.img.src = "img/фигня.png";
	this.draw = function(){
		ctx.drawImage(this.img, this.x, 100);
	}
}

var t = 0;
function loop() {
	t+=	1;
	ctx.fillStyle = "seagreen";
	ctx.fillRect(0,0,c.width, c.height);

	ctx.fillStyle = "olive";
	ctx.beginPath();
	ctx.moveTo(0, c.height);
	for (let i = 0; i < c.width; i++) 
		ctx.lineTo(i, c.height - noise(t + i) * 0.25);

	ctx.lineTo(c.width, c.height);
	ctx.fill();

	player.draw();

	requestAnimationFrame(loop);
}

loop(); 
