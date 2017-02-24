var followTheCursorDrawingMethod = Object.create(drawingMethod);

followTheCursorDrawingMethod.color = 'rgba(0,0,0,1)';
followTheCursorDrawingMethod.lineWidth = 3;
followTheCursorDrawingMethod.opacity = 1;

followTheCursorDrawingMethod.run = function() {
    if (!this.started) {
        this.context.beginPath();
        this.context.moveTo(this.cursorX, this.cursorY);
        this.started = true;
    } else {
        this.context.lineTo(this.cursorX, this.cursorY);
        this.context.stroke();
    }
};

followTheCursorDrawingMethod.setEvents = function() {
    var self = this;

    document.addEventListener('change-color',
        function (e) {
            self.color = e.detail.selectedColor;

            var sp = this.color.indexOf('(')+1;
            var ep = this.color.indexOf(')');
            var curr = self.color.substring(sp, ep);

            var c = curr.split(',');
            self.context.strokeStyle = "rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + self.opacity + ")";
        }, false);
    document.addEventListener('change-opacity',
        function (e) {
            self.opacity = e.detail.selectedOpacity;

            var sp = this.color.indexOf('(')+1;
            var ep = this.color.indexOf(')');
            var curr = self.color.substring(sp, ep);

            var c = curr.split(',');
            self.context.strokeStyle = "rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", " + self.opacity + ")";
        }, false);
    document.addEventListener('change-cursor-width',
        function (e) {
            self.lineWidth = e.detail.selectedWidth;
            self.context.lineWidth = self.lineWidth;
        }, false);

    this.canvas.addEventListener('mousedown', function(e) {
        e.preDefault();

        self.isDrawing = true;

        self.cursorX = (e.pageX - this.offsetLeft);
        self.cursorY = (e.pageY - this.offsetTop);
    });

    this.canvas.addEventListener("mouseup", function(e) {
        e.preDefault();

        self.isDrawing = false;
        self.started = false;
    });

    this.canvas.addEventListener("mousemove", function(e) {
        e.preDefault();

        if (self.isDrawing) {
            self.cursorX = (e.pageX - this.offsetLeft);
            self.cursorY = (e.pageY - this.offsetTop);

            self.run();
        }
    });

    this.canvas.addEventListener('touchstart', function(e) {
        e.preDefault();

        self.isDrawing = true;
    });

    this.canvas.addEventListener('touchend', function(e) {
        e.preDefault();

        self.isDrawing = false;
        self.started = false;
    });

    this.canvas.addEventListener('touchmove', function(e) {
        e.preDefault();

        if (self.isDrawing) {
            self.cursorX = (e.touches[0].pageX - this.offsetLeft);
            self.cursorY = (e.touches[0].pageY - this.offsetTop);

            self.run();
        }
    });
};