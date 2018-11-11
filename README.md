# jsTouch
Mini js library function for easily detecting touch gestures. Works on all mobile/desktop browsers, but only tracks single finger/mouse gestures.

# Installation
Download the jsTouch.prod.js file in the Dist folder in this repository and add it as a new script tag to the HTML of your webapp or site.

# Use
Swipes can be detected in a similar way to tap touches/clicks.
In vanilla javascript, a click is detected with DOMNode.addEventListener('click',functionToPerform);

With jsTouch installed, additional touch events can be detected by using addGestureListner.
DOMNode.addGestureListener('swipeLeft',functionToPerform);

--Currently Supported Gestures--
circle : gesture draws a circle shape
swipeLeft or swipeRight : Straight horizontal swipe
curveLeft or curveRight : A curved gesture with a primarily horizontal shape
swipeUp or swipeDown : Straight vertical swipe
curveUp or curveDown : A curved gesture with a primarily vertical shape

Users can generate a gesture on any mobile device a touch, or using a mouse on desktop.

A gesture listener can listen for mutiple touch events. Include the touch events in the same string, seperated by a space. The below example will log 'event' if the user draws any curved shape over the example element.
(Note that the gesture must occur over the element for detection. To watch for gestures over the entire document or window, use the appropraite object, in place of a DOM node)

var x = document.getElementById('example');

x.addGestureListener('circle curveLeft curveRight curveUp curveDown', () => {
  console.log('event occured');
});
