/* global colors */
/* global colorPallet */
/* global opacity */
/* global cursorWidth */

draw = {
    init: function(config) {
        this.initConfig(config);
        this.initDraw();
        this.initialized = true;

        this.initDrawEvents();
        this.initDrawActionsEvents();
    },
    initConfig: function(config) {
        this.config = config;

        this.$rootElement = document.getElementById(this.config.rootElement);
        this.canvasId = 'canvas';
    },
    initDraw: function() {
        var canvasWidth = this.$rootElement.offsetWidth,
            canvasHeight = this.$rootElement.offsetHeight;
/*
        if (!this.initialized) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('id', this.canvasId);
            this.$rootElement.appendChild(canvas);
        }
*/
        this.$canvas = document.getElementById(this.canvasId);
        this.$canvas.setAttribute('width', canvasWidth);
        this.$canvas.setAttribute('height', canvasHeight);

        if (!this.initialized) {
            this.context = this.$canvas.getContext('2d');
            this.context.lineJoin = this.config.context.lineJoin;
            this.context.lineCap = this.config.context.lineCap;
        }
    },
    initDrawEvents: function() {
        var self = this;
/*
        window.addEventListener('resize', function(event) {
            self.initDraw();
        });*/
    },
    resetCanvas: function() {
        this.context.clearRect(0,0, this.$canvas.offsetWidth, this.$canvas.offsetWidth);
    },
    initDrawActionsEvents: function() {
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

var a = function() {
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
};
colorPallet.setColors(a);

document.addEventListener("DOMContentLoaded", function(event) {

    colorPallet.render();
    opacity.render();
    cursorWidth.render();

    draw.init({
        rootElement: 'canvas_wrapper',
        drawingMethod: followTheCursorDrawingMethod,
        context: {lineJoin: 'round', lineCap: 'round'}
    });

    document.getElementById('showHideToolbar').addEventListener('click', function(event) {
        var elm = document.getElementById('toolbar');
        if (elm.style.left == "0px") {
            elm.style.left = 0 - parseInt(elm.style.left);
        } else {
            elm.style.left = 0;
        }
    });
});
