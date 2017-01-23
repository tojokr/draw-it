

class BrushWidth {
    constructor(parameters) {
        this.parentElement = (parameters.parentElement !== undefined) ? parameters.parentElement : 'toolbar';
        this.rootElement = (parameters.rootElement !== undefined) ? parameters.rootElement : 'brush_width';
        this.currentBrushWidth = 1;
        this.steps = 10;
        this.minBrushWidth = 1;
        this.maxBrushWidth = 100 / this.steps;
        this.renderHtml = '<label for="brush_width_input">Brush width: </label>'
                + '<input id="brush_width_input" type="range" />'
                + '<output id="brush_width_output"></output>';
    }
    getBrushWidth() {
        return this.currentBrushWidth;
    }
    setBrushWidth(brushWidth) {
        this.currentBrushWidth = brushWidth;
    }
    render() {
        var content = '';

        content = document.createElement('div');
        content.setAttribute('id', this.rootElement);

        content.innerHTML = this.renderHtml;
        document.getElementById(this.parentElement).appendChild(content);

        var i = document.getElementById(this.rootElement).getElementsByTagName('input')[0];
        i.setAttribute('min', this.minBrushWidth);
        i.setAttribute('max', this.maxBrushWidth);
        i.setAttribute('value', this.minBrushWidth);

        this.initEvents();
    }
    initEvents() {
        var i = document.getElementById(this.rootElement).getElementsByTagName('input')[0];
        i.addEventListener('change', function(event) {
            document.dispatchEvent(
                new CustomEvent('change-cursor-width', {detail: {selectedWidth: this.value}})
            );
        });
    }
}

class DrawingMethod {
    setCanvas(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }
    start() {
        this.isDrawing = true;
    }
    end() {
        this.isDrawing = false;
    }
    run() {}
    setEvents() {}
}

class FollowTheCursorDrawingMethod extends DrawingMethod {

    constructor(config) {
        super(config);
        this.color = 'rgb(0,0,0)';
        this.lineWidth = 5;
        this.opacity = 1;
    }

    run() {
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
    }

    setEvents() {
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

        this.canvas.addEventListener('touchstart', function(e) {
            self.isDrawing = true;

            self.cursorX = (event.pageX - this.offsetLeft);
            self.cursorY = (event.pageY - this.offsetTop);
        });

        this.canvas.addEventListener('touchend', function() {
            self.isDrawing = false;
            self.started = false;
        });

        this.canvas.addEventListener('touchmove', function(e) {
            if (self.isDrawing) {
                self.cursorX = (event.pageX - this.offsetLeft);
                self.cursorY = (event.pageY - this.offsetTop);

                self.run();
            }
        });
    }
}

class FollowTheCursorDotDrawingMethod extends FollowTheCursorDrawingMethod {
    run() {
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
    }
}

class Draw {

    constructor(config) {
        this.initConfig(config);
        this.initDraw();
        this.initialized = true;

        this.initDrawEvents();
        this.initDrawActionsEvents();
    }

    initConfig(config) {
        this.config = config;

        this.$rootElement = document.getElementById(this.config.rootElement);
        this.canvasId = 'canvas';
    }

    initDraw() {
        var canvasWidth = this.$rootElement.offsetWidth,
            canvasHeight = this.$rootElement.offsetHeight;

        if (!this.initialized) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('id', this.canvasId);
            this.$rootElement.appendChild(canvas);
        }

        this.$canvas = document.getElementById(this.canvasId);
        this.$canvas.setAttribute('width', canvasWidth);
        this.$canvas.setAttribute('height', canvasHeight);

        if (!this.initialized) {
            this.context = this.$canvas.getContext('2d');
            this.context.lineJoin = this.config.context.lineJoin;
            this.context.lineCap = this.config.context.lineCap;
        }
    }

    initDrawEvents() {
        var self = this;

        window.addEventListener('resize', function(event) {
            self.initDraw();
        });
    }

    resetCanvas() {
        this.context.clearRect(0,0, this.$canvas.offsetWidth, this.$canvas.offsetWidth);
    }

    initDrawActionsEvents() {
        var self = this;

        this.config.drawingMethod.setCanvas(this.$canvas);
        this.config.drawingMethod.setEvents();

        document.getElementById('reset').addEventListener("click", function() {
            resetCanvas();
        });

        document.getElementById('save').addEventListener("click", function() {
            window.location = self.$canvas.toDataURL("image/png");
        });
    }
}

var color = new Color({
    //colors: ['#0ad', 'rgba(0,1,1,0.1)','blue','red'],
    colors: function() {
        var c = [],
            v = null,
            r = g = b = 0;

        for (var i = 0; i < Math.pow(2,3); i++) {
            v = i.toString(2);
            v = "0".repeat(3 - v.length) + v;
            r = parseInt(v[0])*255, 255;
            g = parseInt(v[1])*255, 255;
            b = parseInt(v[2])*255, 255;
            c.push('rgb(' + r + ',' + g + ',' + b + ')');
        }
        return c;
    }
});
var opacity = new Opacity({});
var brushWidth = new BrushWidth({});

document.addEventListener("DOMContentLoaded", function(event) {

    color.render();
    opacity.render();
    brushWidth.render();

    document.getElementById('showHideToolbar').addEventListener('click', function(event) {
        var elm = event.target;
        if ((' ' + elm.className + ' ').indexOf(' hidden ') != -1) {
            elm.className = elm.className.replace('hidden', '');
        } else {
            elm.className = elm.className.replace('hidden', '');
        }
    });

    new Draw({
        rootElement: 'canvas_wrapper',
        drawingMethod: new FollowTheCursorDrawingMethod(),
        context: {lineJoin: 'round', lineCap: 'round'}
    });
});
