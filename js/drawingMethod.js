var drawingMethod = {
    setCanvas: function(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    },
    start: function() {
        this.isDrawing = true;
    },
    end: function() {
        this.isDrawing = false;
    },
    run: function() {},
    setEvents: function() {}
};