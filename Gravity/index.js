var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = 1365;
c.height = 350;
document.body.appendChild(c);	 	 //добавление константы - постоянного значения

var perm = [];
while (perm.length < 450) {				//генерация гор
	while(perm.includes(val = Math.floor(Math.random()*450)));
	perm.push(val);
}

var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t*Math.PI))/2;
var noise = x=> { 				//создание "шумов" на фоне
	x = x * 0.01 % 255;
	return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}

var base = 60; 
   var clocktimer,dateObj,dh,dm,ds,ms; 
   var readout=''; 
   var h=5,m=5,tm=5,s=0,ts=0,ms=0,init=0; 
   
   //функция для очистки поля
   function ClearСlock() { 
        clearTimeout(clocktimer); 
        h=1;m=1;tm=1;s=0;ts=0;ms=0; 
        init=0;
        readout='00:00:00.00'; 
        document.MyForm.stopwatch.value=readout; 
   } 
   
   //функция для старта секундомера
   function StartTIME() { 
        var cdateObj = new Date(); 
        var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
        if (t>999) { s++; } 
        if (s>=(m*base)) { 
                ts=0; 
                m++; 
        } else { 
                ts=parseInt((ms/100)+s); 
                if(ts>=base) { ts=ts-((m-1)*base); } 
        } 
        if (m>(h*base)) { 
                tm=1; 
                h++; 
        } else { 
                tm=parseInt((ms/100)+m); 
                if(tm>=base) { tm=tm-((h-1)*base); } 
        } 
        ms = Math.round(t/10); 
        if (ms>99) {ms=0;} 
        if (ms==0) {ms='00';} 
        if (ms>0&&ms<=9) { ms = '0'+ms; } 
        if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; } 
        dm=tm-1; 
        if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; } 
        dh=h-1; 
        if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; } 
        readout = dh + ':' + dm + ':' + ds + '.' + ms; 
        document.MyForm.stopwatch.value = readout; 
        clocktimer = setTimeout("StartTIME()",1); 
   } 
   
   //Функция запуска и остановки
   function StartStop() { 
        if (init==0){ 
                ClearСlock();
                dateObj = new Date(); 
                StartTIME(); 
                init=1; 
        } else { 
                clearTimeout(clocktimer);
                init=0;
        } 
   } 
	  //флаг
		  
		  
		




		//PLAYER
var player = new function(){
	this.x = c.width/2;
	this.y = 0;
	this.ySpeed = 0;
	this.rot = 0;
	this.rSpeed = 0;

	this.img = new Image();
	this.img.src = "img/фигня.png";
	this.draw = function(){
		  
		var p1 = c.height - noise(t + this.x) * 0.25;
		var p2 = c.height - noise(t+5  +this.x) * 0.25;

		var grounded = 0;
		   if(p1-15 > this.y) {
			   this.ySpeed += 0.1;
		   }
		   else{
			   this.ySpeed -= this.y - (p1-15);
			   this.y= p1-15;
			   grounded = 1;
		   }
		   
		   if(!playing || grounded && Math.abs(this.rot)> Math.PI * 0.5){
			  playing = false;
			  this.rSpeed = 5;
			  k.ArrowUp =1;
			  this.x -= speed * 5;
		   }

		   var angle = Math.atan2((p2-15) - this.y, (this.x+5) - this.x);
		   this.y +=this.ySpeed;

           if(grounded && playing){
			   this.rot -=(this.rot - angle)*0.5;
			   this.rSpeed = this.rSpeed - (angle - this.rot);
		   }
		   this.rSpeed += (k.ArrowLeft-k.ArrowRight)*0.05;
		   this.rot -= this.rSpeed * 0.1;
		if(this.rot > Math.PI) this.rot = -Math.PI;
		if(this.rot < -Math.PI) this.rot = Math.PI;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rot);
		ctx.drawImage(this.img,  -80, -65, 150, 100);
		ctx.restore();
	}
}

var t = 0;
var speed = 0;
var playing = true;
var k = {
	ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0

};

function loop() {
	speed -=(speed-(k.ArrowUp - k.ArrowDown))*0.01;
	t+=	10 * speed;
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
onkeydown = d=> k[d.key] =1;
onkeyup = d=> k[d.key] =0;

loop(); 
