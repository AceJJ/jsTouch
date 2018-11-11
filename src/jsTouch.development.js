(function(){
	try{
		Node.prototype.addGestureListener = function(gesture, callback){
			var self = this;
			listen(self, gesture, callback);
		};
	}
	catch(e){
		if(!!console) {
			console.log('Warning: This browser does not support adding .addGestureListener() to DOM node prototypes. As an alternative, global function addGestureListener(targetElement, gesture, callback) has been created. Please use this function within this browser.');
		}
		var addGestureListener = (target, gesture, callback) => listen(target, gesture, callback);
	}

	function listen(target, gesture, callback){
		if(!callback || typeof(callback) != 'function'){
			if(!!console) console.error('Invalid callback function in gesture listener.');
			return
		}
		else if(!gesture || typeof(gesture) != 'string'){
			if(!!console) console.error('Invalid gesture event. Gesture must be specified as a String.');
		}

		const gest = gesture.split(" ");

		let g;
		const fn = target.addEventListener, fr = target.removeEventListener;

		const evalShape = s => {
			const
			minX = s.reduce((a,b) => {
				if(b.x < a)
					return b.x;
				return a;
			}, Infinity),
			maxX = s.reduce((a,b) => {
				if(b.x > a)
					return b.x;
				return a;
			}, -Infinity),
			minY = s.reduce((a,b) => {
				if(b.y < a)
					return b.y;
				return a;
			}, Infinity),
			maxY = s.reduce((a,b) => {
				if(b.y > a)
					return b.y;
				return a;
			}, -Infinity);

			const
			circle = false,
			last = s.length - 1,
			horiz = ( (maxY - minY < 20) && (maxX - minX > 20) ),
			vert = ( (maxX - minX < 20) && (maxY - minY > 20) );

			
			if( (maxY - minY > 20) && (maxX - minX > 20) ){
				if( (Math.abs(s[0].x - s[last].x) < 40) && (Math.abs(s[0].y - s[last].y) < 40) )
					return 'circle';
				else {
					const difX = Math.abs(s[0].x - s[last].x),
						  difY = Math.abs(s[0].y - s[last].y);
					if (difX > difY){
						if(s[0].x - s[last].x > 0)
							return 'curveLeft';
						else
							return 'curveRight';
					}
					else{
						if(s[0].y - s[last].y > 0)
							return 'curveUp';
						else
							return 'curveDown';
					}
				}
			}
			else if( (maxY - minY < 20) && (maxX - minX > 20) ){
				if(s[0].x < s[last].x)
					return 'swipeRight';
				else
					return 'swipeLeft';
			}
			else if( (maxX - minX < 20) && (maxY - minY > 20) ){
				if(s[0].y < s[last].y)
					return 'swipeDown';
				else
					return 'swipeUp';
			}
		};

		const
		gestureEnd = e => {
			if(!!e) e.preventDefault();

			if( gest.indexOf( evalShape(g) ) != -1 ) callback();
			fr("mousemove", gestureMove);
			fr("mouseup", gestureEnd);
		},
		gestureMove = e => {
			e.preventDefault();
			if(g.length > 199){
				gestureEnd();
			}
			else{
				g.push({
					x: e.clientX,
					y: e.clientY
				});
			}
		};

		target.addEventListener("mousedown", e => {
			e.preventDefault();
			g = [{
				x: e.clientX,
				y: e.clientY
			}];
			fr("mousemove", gestureMove);
			fr("mouseup", gestureEnd);
			fn("mousemove", gestureMove);
			fn("mouseup", gestureEnd);
		});
	}
})();
