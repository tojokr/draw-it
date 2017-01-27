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