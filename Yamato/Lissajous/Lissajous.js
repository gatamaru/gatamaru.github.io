var canvas = document.getElementById('DrawingArea');
var ctx    = canvas.getContext('2d');
var DrawForTheFirstTime = true;
var PreviousX;
var PreviousY;
function DrawPoint(e){
    if(e.buttons % 2 == 1){   
        if (DrawForTheFirstTime == false){
            ctx.beginPath();
    	    ctx.moveTo(PreviousX - 70, PreviousY - 110);
            ctx.lineTo(e.clientX - 70, e.clientY - 110);
            PreviousX = e.clientX;
            PreviousY = e.clientY;
        }
        else{
            ctx.rect(e.clientX - 70, e.clientY - 110, 1, 1);
            DrawForTheFirstTime = false;
            PreviousX = e.clientX;
            PreviousY = e.clientY;
        }
    }else{
        DrawForTheFirstTime = true;
    }
    ctx.stroke();	
}
// ------------------------------------------------------------
	// スクロール位置を取得する関数
	// ------------------------------------------------------------
	function DocumentGetScrollPosition(document_obj){
		return{
			x:document_obj.body.scrollLeft || document_obj.documentElement.scrollLeft,
			y:document_obj.body.scrollTop  || document_obj.documentElement.scrollTop
		};
	}

	// ------------------------------------------------------------
	// マウスを移動するたびに実行される関数
	// ------------------------------------------------------------
	
	// ------------------------------------------------------------
	// イベントのリッスンを開始する
	// ------------------------------------------------------------
	// イベントリスナーに対応している
	if(document.addEventListener){

		// マウスを移動するたびに実行されるイベント
		document.addEventListener("mousemove" , DrawPoint);

	// アタッチイベントに対応している
	}else if(document.attachEvent){

		// マウスを移動するたびに実行されるイベント
		document.attachEvent("onmousemove" , DrawPoint);
    }
//document.getElementById("Title").onclick = keisan;
function Point(posX, posY){
	ctx.beginPath();
	ctx.moveTo(posX, posY);
	ctx.lineTo(posX + 1, posY + 1);
	ctx.stroke();
}
function drawLissajous(){
	//alert("Enter natural numbers in the Box!");
	ctx.clearRect(0, 0, 500, 500);
	// document.getElementById("DrawingArea").color = "#648354";
	/* Input */
	var A = document.getElementById("pA").value;
	var B = document.getElementById("pB").value;
	if((A < 0) || (B < 0))
	{
		alert("Enter natural numbers in the Box!");
		return true;
	}
	/*for (var X = 1; X < 499; X++){
		var radX = Math.asin((X - 249) / 249);
		for (var i = 0; i < A * B * 3; i++){
			var radY = (radX + i * Math.PI) * A / B;
			Y = (Math.sin(radY) + 1) * 249;
			Point(X, Y);
		}
	}*/
	for(var rad = 0; rad < 2 * Math.PI; rad += 0.005 / Math.sqrt(A * B)){
		var X = (Math.sin(rad * A) + 1) * 249;
		var Y = (Math.sin(rad * B) + 1) * 249;
		Point(X, Y);
	}
}
document.getElementById("doDraw").onclick = drawLissajous;
