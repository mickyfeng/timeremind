function xywh(x,y,w,h){
	return {x,y,w,h};
}

function m_o(){
	var o={};
	o.cw = 0;
	o.ch = 0;
	o.f1ox = 20;//偏离位置
	o.f1oy = 20;//偏离位置
	o.s = 10;//与上一个的间隔
	o.uy=o.f1oy;//已使用的高度
	o.drawText=function(cxt,str){
		h = 20;//高度
		this.uy+=this.s;
		var f = xywh(this.f1ox,this.uy,this.cw-this.f1ox-this.f1ox,h);
		cxt.writeText(f,str,cxt.getTextStyle(f));
		this.uy+=h;
   };
   o.drawRectBar=function(cxt,val){
	    h = 30;//高度
		this.uy+=this.s;
		var p1w = this.cw-this.f1ox-this.f1ox;//宽度
		var p1ox = this.f1ox;//相对位置
		var f = xywh(p1ox,this.uy,p1w,h);
		cxt.drawRectBar(f,val,cxt.getRectStyle(f));
		this.uy+=h;
		return f;
   };
   o.redrawRectBar=function(cxt,f,val){
	   cxt.clearRect(f.x-this.s,f.y-this.s+1,f.w+2*this.s,f.h+2*this.s-2);
	   cxt.drawRectBar(f,val,cxt.getRectStyle(f));
   };   
   
   o.dwar_img=function(cxt,url){
	   var img=new Image(200,100);
		img.src=url
		var h =300;
		this.uy+=this.s;
		img['_y']=this.uy;
		this.uy+=h;
		img['h']=h;
		img.onload = function(){
			cxt.drawImage(img,100,this._y,600,this.h);
		}
   };
   o.addns=function(){
	   this.uy+=this.s;
   }
   return o;
 }



var w ;
var m;
function startWorker(){
	var c=document.getElementById("myCanvas");
	var cxt=cv_extend(c.getContext("2d"));
		
		
	  if(typeof(m)=="undefined")
	  {
		m=m_o();
		m.cw = c.width;
		m.ch = c.height;
		m.drawText(cxt,"看看这是啥？");
		m.drawRectBar(cxt,750);
		m.addns();
		m.drawText(cxt,"这是会动的");
		var f = m.drawRectBar(cxt,0);
		m.addns();
		m.drawText(cxt,"这是不会动的");
		m.drawRectBar(cxt,300);
		m.addns();
		m.drawText(cxt,"这是图片");
		m.dwar_img(cxt,"./img/eg_flower.png");
		m.drawText(cxt,"下面没有了");
		var startTime = new Date().getTime();
		var interval = setInterval(function(){
			if(new Date().getTime() - startTime > (m.cw-m.f1ox-m.f1ox)*50){
				clearInterval(interval);
				return;
			}
			m.redrawRectBar(cxt,f,(new Date().getTime() - startTime)/50);
		//do whatever here..
		}, 50);
	  }
	  
	  
}

startWorker();