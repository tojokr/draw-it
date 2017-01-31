var followTheCursorDotDrawingMethodLine = Object.create(followTheCursorDrawingMethod);

followTheCursorDotDrawingMethodLine.run = function() {
    if (!this.started) {
        this.context.beginPath();

        this.initCursorX = this.cursorX;
        this.initCursorY = this.cursorY;

        this.started = true;
    } else {

        var mult = (this.cursorY - this.initCursorY) / (this.cursorX - this.initCursorX);
        var dist = Math.sqrt(Math.pow(this.cursorX - this.initCursorX, 2) + Math.pow(this.cursorY - this.initCursorY, 2));
/*
    point1(x1,y1)
    point2(x2,y2)
    point_in_the_middle(x3=(x1+x2)/2,y3=(y1+y2)/2)

        2x3 = x1 + x2;
        2x3 - x2 = x1;
        2x3 - x2 = x1;
 */

/*
d = sqrt((x2-x1)^2 + (y2 - y1)^2) #distance
r = n / d #segment ratio

x3 = r * x2 + (1 - r) * x1 #find point that divides the segment
y3 = r * y2 + (1 - r) * y1 #into the ratio (1-r):r
 */

        this.context.moveTo(this.cursorX, this.cursorY);

        this.context.lineTo(this.cursorX, this.cursorY);
        var sp = this.color.indexOf('(')+1;
        var ep = this.color.indexOf(')');
        var curr = this.color.substring(sp, ep);

        var c = curr.split(',');
        this.context.strokeStyle = "rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + this.opacity + ")";
        this.context.lineWidth = this.lineWidth;
        this.context.stroke();
    }
};