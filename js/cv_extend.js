function cv_extend(cv){
	var sb=4;
	var sx=2;
	var sy=2;
	if (cv == null) return cv;
	if (typeof(cv) != 'object') return cv;
	if (!cv instanceof CanvasRenderingContext2D) return cv;
	
	exShadowVal=function(f,val){
		var x = f.x+sb-sx;
		var y = f.y+sb-sy;
		var w = f.w-2*sb;
		var h = f.h-2*sb;
		var val = val-2*sb;
		return {x,y,w,h,val};
	}

	if (!cv.clearshadow) {
		cv.clearshadow =function(){
			this.shadowColor="#000000";
			this.shadowBlur=0//阴影
			this.shadowOffsetX=0//阴影X
			this.shadowOffsetY=0//阴影Y
		}
	}
	if (!cv.addDefaultShadow){
		cv.addDefaultShadow=function(val){
			this.shadowColor="#999999";
			this.shadowBlur=val//阴影
			this.shadowOffsetX=sx;//阴影X
			this.shadowOffsetY=sy//阴影Y
		}
	}
	if (!cv.writeText){
		cv.writeText=function(f,str,style){
			//cv.strokeRect(f.x,f.y,f.w,f.h);
			cv.font= f.h.toString()+"px 楷体";
			cv.strokeStyle=style;
			cv.strokeText(str,f.x,f.y+f.h);
		}
		
	}
	if (!cv.drawRectBar){
		cv.drawRectBar=function(f,val,style){
			cv.addDefaultShadow(sb);
			f=exShadowVal(f,val);
			cv.strokeStyle="#666666";
			cv.strokeRect(f.x,f.y,f.w,f.h);
			cv.fillStyle=style;
			cv.fillRect(f.x,f.y,f.val,f.h);
			cv.clearshadow();
		}
	}
		
	if (!cv.getTextStyle){
		cv.getTextStyle=function(f){
			var gradient=cv.createLinearGradient(f.x,f.y,f.w,f.h);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			return gradient;
		}
		
	}
	
	if (!cv.getRectStyle){
		cv.getRectStyle=function(f){
			var gradient=cv.createLinearGradient(f.x,f.y,f.w,f.h);
			gradient.addColorStop(0,"#00CC00");
			gradient.addColorStop(0.5,"#CCCC00");
			gradient.addColorStop(1,"#CC0000");
			return gradient;
		}
		
	}
	
	
	
	return cv; 
 } 
