var followTheCursorDotDrawingMethod = Object.create(followTheCursorDrawingMethod);

followTheCursorDotDrawingMethod.run = function() {
    this.context.beginPath();
    this.context.moveTo(this.cursorX, this.cursorY);

    this.context.lineTo(this.cursorX, this.cursorY);
    var sp = this.color.indexOf('(')+1;
    var ep = this.color.indexOf(')');
    var curr = this.color.substring(sp, ep);

    var c = curr.split(',');
    this.context.strokeStyle = "rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + this.opacity + ")";
    this.context.lineWidth = this.lineWidth;
    this.context.stroke();
};