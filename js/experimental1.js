var experimental1 = Object.create(followTheCursorDrawingMethod);
var e1CursorWidth = Object.create(cursorWidth);

experimental1.run = function() {
    if (this.inc === undefined) {
        this.inc = 1;
    }

    if (this.lineWidth >= 30) {
        this.inc = -1;
    } else if (this.lineWidth <= 1) {
        this.inc = 1;
    }

    this.lineWidth = this.lineWidth + this.inc;
    //if (!this.started) {
        this.context.beginPath();
        this.context.moveTo(this.cursorX, this.cursorY);
        this.started = true;
    //} else {
        this.context.lineTo(this.cursorX, this.cursorY);
        var sp = this.color.indexOf('(')+1;
        var ep = this.color.indexOf(')');
        var curr = this.color.substring(sp, ep);

        var c = curr.split(',');
        this.context.strokeStyle = "rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + this.opacity + ")";
        this.context.lineWidth = this.lineWidth;
        this.context.stroke();
    //}
};

// context: {lineJoin: 'bevel', lineCap: 'square'}

/*
e1CursorWidth.setCursorWidth(1000);
console.log(e1CursorWidth.getCursorWidth());
e1CursorWidth.getCursorWidth = function() {
    var a = getCursorWidth();
    console.log(a);
    this.setCursorWidth(a+1);
}
*/