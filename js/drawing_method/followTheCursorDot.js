var followTheCursorDotDrawingMethod = Object.create(followTheCursorDrawingMethod);

followTheCursorDotDrawingMethod.run = function() {
    this.context.beginPath();
    this.context.moveTo(this.cursorX, this.cursorY);
    this.context.lineTo(this.cursorX, this.cursorY);
    this.context.stroke();
};