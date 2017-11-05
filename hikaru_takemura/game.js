var wx = 500;0;
var wy = 600;
var area = 32;
var maxbullet = 1000;
var playermovef = 4;
var playermoves = 2;
var canvas = 0;
var ctx = 0;
var keybefore = new Array();
var titleflg = 1;
var count = 0;
var level = 0;
var player = [wx/2, wy/4*3, 0, 4];
var bullet = new Array();
for (i=0 ; i<maxbullet ; i++){
	bullet[i] = new Array();
	for (j=0 ; j<=8 ; j++){
		bullet[i][j] = 0;
	}
}
var enemy = new Array();
for (i=0 ; i<10 ; i++){
	enemy[i] = new Array();
	for (j=0 ; j<=6 ; j++){
		enemy[i][j] = 0;
	}
}
var img = new Array();
img[0] = new Image();
img[0].src = "image/jiki.png";
img[1] = new Image();
img[1].src = "image/jin1.png";
img[2] = new Image();
img[2].src = "image/jin2.png";
img[3] = new Image();
img[3].src = "image/jin3.png";
img[4] = new Image();
img[4].src = "image/jin4.png";
img[5] = new Image();
img[5].src = "image/jin5.png";
img[6] = new Image();
img[6].src = "image/jin6.png";
img[7] = new Image();
img[7].src = "image/jin7.png";
img[8] = new Image();
img[8].src = "image/tama1.png";
img[9] = new Image();
img[9].src = "image/tama2.png";
img[10] = new Image();
img[10].src = "image/tama3.png";
img[11] = new Image();
img[11].src = "image/tama4.png";
img[12] = new Image();
img[12].src = "image/tama5.png";
img[13] = new Image();
img[13].src = "image/tama6.png";
img[14] = new Image();
img[14].src = "image/tama7.png";
var imgsize = [64, 64, 64, 64, 64, 64, 64, 64, 32, 256, 8, 32, 32, 64, 32];
var bgm = new Audio("sound/bgm.wav");
bgm.loop = "true";
bgm.load();

window.onload = function() {
	canvas = document.getElementById("gamecanvas");
	ctx = canvas.getContext("2d");
	canvas.width = wx;
	canvas.height = wy;
	document.getElementById("scoretext").style.display = "none";
};

function startgame() {
	titleflg = 0;
	document.getElementById("scoretext").style.display = "block";
	timermain = setInterval("main()",16);
	bgm.currentTime = 0;
	bgm.play();
	count = 0;
	level = 0;
	player = [wx/2, wy/4*3, 0, 4];
	for (i=0 ; i<maxbullet ; i++){
		bullet[i][0] = 0;
	}
	for (i=0 ; i<10 ;i++){
		enemy[i][0] = -1;
	}
};

function endgame() {
	titleflg = 1;
	bgm.pause();
	alert("あなたのスコアは "+count+" 点です");
	ctx.clearRect(0, 0, wx, wy);
	document.getElementById("scoretext").style.display = "none";
	clearInterval(timermain);
};

function main() {
	//console.log(bullet[0][3]);
	ctx.clearRect(0, 0, wx, wy);
	moveplayer();
	movebullet();
	enemypattern();
	hitcheck();
	count++;
	level = parseInt(count / 1000) + 1;
	if (level > 10) {
		level = 10;
	}
	document.getElementById("scoretext").innerHTML = "SCORE : " + count;
};

function enemypattern() {
	for (i=0 ; i<level ; i++) {
		if (enemy[i][0]==-1) {
			enemy[i][0] = parseInt(Math.random() * 7);
			enemy[i][1] = Math.random() * wx;
			enemy[i][2] = Math.random() * wy;
			enemy[i][3] = Math.random();
			enemy[i][4] = 0;
			enemy[i][5] = 100;
		} else {
			ctx.drawImage(img[enemy[i][0]+1], enemy[i][1]-imgsize[enemy[i][0]+1]/2, enemy[i][2]-imgsize[enemy[i][0]+1]/2, imgsize[enemy[i][0]+1], imgsize[enemy[i][0]+1]);
			enemy[i][4]++;
		}
		if (enemy[i][4]>60){
			if (enemy[i][0]==0) {
				if (enemy[i][4]%50==0) {
					createbullet(enemy[i][1], enemy[i][2], 4, Math.atan2(player[1]-enemy[i][2],player[0]-enemy[i][1]), 0, 0, 8, 8);
				}
				if (enemy[i][4]==300){
						enemy[i][0] = -1;
				}
			}
			if (enemy[i][0]==1) {
				if (enemy[i][4]==300) {
					createbullet(enemy[i][1], enemy[i][2], 3, Math.atan2(player[1]-enemy[i][2],player[0]-enemy[i][1]), 0, 0, 100, 9);
				}
				if (enemy[i][4]==300){
						enemy[i][0] = -1;
				}
			}
			if (enemy[i][0]==2) {
				if (enemy[i][4]%4==0) {
					createbullet(enemy[i][1], enemy[i][2], Math.random()*2+1, Math.random()*2*Math.PI, 0, 0, 3, 10);
				}
				if (enemy[i][4]==250){
						enemy[i][0] = -1;
				}
			}
			if (enemy[i][0]==3) {
				if (enemy[i][4]%4==0) {
					createbullet(enemy[i][1], enemy[i][2], 1, enemy[i][3]*Math.PI+2+Math.PI/12*enemy[i][4]/4, enemy[i][4]*0.0002, 0, 3, 11);
				}
				if (enemy[i][4]==61+24*4*2){
						enemy[i][0] = -1;
				}
			}
			if (enemy[i][0]==4) {
				if (enemy[i][4]%10==0 && enemy[i][4]>=120) {
					if (enemy[i][5]==100) {
						enemy[i][5] = Math.atan2(player[1]-enemy[i][2],player[0]-enemy[i][1]);
					}
					for (j=0 ; j<5 ; j++) {
						createbullet(enemy[i][1], enemy[i][2], 4, enemy[i][5]+Math.PI/12*(j-2), 0, 0, 3, 12);
					}
				}
				if (enemy[i][4]==180){
						enemy[i][0] = -1;
				}
			}
			if (enemy[i][0]==5) {
				if (enemy[i][4]%100==0) {
					for (j=0 ; j<10 ; j++){
						createbullet(enemy[i][1], enemy[i][2], 0, enemy[i][3]*Math.PI+2*Math.PI/10*j, 0.04, 0, 16, 13);
					}
				}
				if (enemy[i][4]==430){
						enemy[i][0] = -1;
				}
			}
			if (enemy[i][0]==6) {
				if (enemy[i][4]%40==0) {
					for (j=0 ; j<8 ; j++){
						createbullet(enemy[i][1], enemy[i][2], 0, 2*Math.PI/8*j, 0.05, Math.PI/144*(enemy[i][3]-0.5), 4, 14);
					}
				}
				if (enemy[i][4]==470){
						enemy[i][0] = -1;
				}
			}
		}
	}
};

function movebullet() {
	for (var i=0 ; i<maxbullet ; i++) {
		if (bullet[i][0]==1) {
			bullet[i][1] = bullet[i][1] + bullet[i][3] * Math.cos(bullet[i][4]);
			bullet[i][2] = bullet[i][2] + bullet[i][3] * Math.sin(bullet[i][4]);
			bullet[i][3] = bullet[i][3] + bullet[i][5];
			bullet[i][4] = bullet[i][4] + bullet[i][6];
			if (bullet[i][1]<=0-area || bullet[i][1]>=wx+area || bullet[i][2]<=0-area || bullet[i][2]>=wy+area) {
				bullet[i][0]=0;
			}
			ctx.translate(bullet[i][1], bullet[i][2]);
			ctx.rotate(bullet[i][4]-Math.PI/2);
			ctx.drawImage(img[bullet[i][8]], -imgsize[bullet[i][8]]/2, -imgsize[bullet[i][8]]/2, imgsize[bullet[i][8]], imgsize[bullet[i][8]]);
			ctx.rotate(-(bullet[i][4]-Math.PI/2));
			ctx.translate(-(bullet[i][1]), -(bullet[i][2]));
		}
	}
};

function createbullet(numx, numy, numv, numa, numav, numaa, numr, numi) {
	for (var i=0 ; i<maxbullet ; i++) {
		if (bullet[i][0]==0) {
			bullet[i][0] = 1;
			bullet[i][1] = numx;
			bullet[i][2] = numy;
			bullet[i][3] = numv;
			bullet[i][4] = numa;
			bullet[i][5] = numav;
			bullet[i][6] = numaa;
			bullet[i][7] = numr;
			bullet[i][8] = numi;
			break;
		}
	}
};

function hitcheck() {
	for (var i=0 ; i<maxbullet ; i++) {
		if (bullet[i][0]==1){
			if ((player[0]-bullet[i][1])**2+(player[1]-bullet[i][2])**2<=(player[3]+bullet[i][7])**2){
				endgame();
				break;
			}
		}
	}
};

function moveplayer() {
	if (getkey(16)) {
		player[2]=playermoves
	}else{
		player[2]=playermovef
	}
	if (getkey(39)) {
		player[0] = player[0] + player[2];
		if (player[0] > wx - imgsize[0]/2) {
			player[0] = wx - imgsize[0]/2;
		}
	}
	if (getkey(37)) {
		player[0] = player[0] - player[2];
		if (player[0] < 0 + imgsize[0]/2) {
			player[0] = 0 + imgsize[0]/2;
		}
	} 
	if (getkey(38)) {
		player[1] = player[1] - player[2];
		if (player[1] < 0 + imgsize[0]/2) {
			player[1] = 0 + imgsize[0]/2;
		}
	}
	if (getkey(40)) {
		player[1] = player[1] + player[2];
		if (player[1] > wy - imgsize[0]/2) {
			player[1] = wy - imgsize[0]/2;
		}
	}
	ctx.drawImage(img[0],player[0]-imgsize[0]/2,player[1]-imgsize[0]/2,imgsize[0],imgsize[0]);
};

document.onkeydown = function (e) {
	if (!e) {
		e = window.event;
	}
	keybefore[e.keyCode] = true;
	if (titleflg==1) {
		startgame();
	}
};

document.onkeyup = function (e) {
	if (!e) {
		e = window.event;
	}
	keybefore[e.keyCode] = false;
};

window.onblur = function () {
	keybefore.length = 0;
};

function getkey(k){
	if (keybefore[k]) {
		return true;
	}
	return false;
}