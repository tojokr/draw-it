var followTheCursorDrawingMethod = Object.create(drawingMethod);

followTheCursorDrawingMethod.color = 'rgb(0,0,0)';
followTheCursorDrawingMethod.lineWidth = 5;
followTheCursorDrawingMethod.opacity = 1;

followTheCursorDrawingMethod.run = function() {
    if (!this.started) {
        this.context.beginPath();
        this.context.moveTo(this.cursorX, this.cursorY);
        this.started = true;
    } else {
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

followTheCursorDrawingMethod.setEvents = function() {
    var self = this;

    document.addEventListener('change-color', function (e) { self.color = e.detail.selectedColor; }, false);
    document.addEventListener('change-opacity', function (e) { self.opacity = e.detail.selectedOpacity; }, false);
    document.addEventListener('change-cursor-width', function (e) { self.lineWidth = e.detail.selectedWidth; }, false);

    this.canvas.addEventListener('mousedown', function(event) {
        self.isDrawing = true;

        self.cursorX = (event.pageX - this.offsetLeft);
        self.cursorY = (event.pageY - this.offsetTop);
    });

    this.canvas.addEventListener("mouseup", function(event) {
        self.isDrawing = false;
        self.started = false;
    });

    this.canvas.addEventListener("mousemove", function(event) {
        if (self.isDrawing) {
            self.cursorX = (event.pageX - this.offsetLeft);
            self.cursorY = (event.pageY - this.offsetTop);

            self.run();
        }
    });

    this.canvas.addEventListener('touchstart', function(event) {
        self.isDrawing = true;
    });

    this.canvas.addEventListener('touchend', function(event) {
        self.isDrawing = false;
        self.started = false;
    });

    this.canvas.addEventListener('touchmove', function(event) {
        if (self.isDrawing) {
            self.cursorX = (event.touches[0].pageX - this.offsetLeft);
            self.cursorY = (event.touches[0].pageY - this.offsetTop);

            self.run();
        }
    });
};