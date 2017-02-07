var colorPallet = {
    rootElement: 'color_pallet',
    colors: [],
    currentColors: [],

    getColors: function() {
        return this.colors;
    },
    setColors: function(colors) {
        if (typeof colors === 'function') {
            /* http://krazydad.com/tutorials/makecolors.php*/
            this.colors = colors();
        } else if (colors instanceof Object) {
            this.colors = this.objectToArray(colors);
        } else if (colors instanceof Array) {
            this.colors = colors;
        }
    },
    objectToArray: function(obj) {
        var arr = [];

        if (typeof obj !== 'object') {
            throw new Exception('Not an object');
        }

        for (var i in obj) {
            arr[i] = obj[i];
        }
        return arr;
    },
    getColor: function(idx) {
        if (idx !== undefined || this.currentColors.indexOf(idx) === -1) {
            idx = 0;
        }
        return this.currentColors.indexOf(idx);
    },
    setColor: function(idx, colorValue) {
        var self = this;
        this.currentColors[idx] = colorValue;

        document.dispatchEvent(
            new CustomEvent(
                'change-color', {
                    detail: {selectedColor: self.currentColors[idx]}
                }
            )
        );
    },
    render: function() {
        var render = '',
            content = '';

        var template = document.getElementById(this.rootElement).innerHTML;

        this.colors.forEach(function(element) {
            render += template.replace(/%s/g, element);
        }, this);

        document.getElementById(this.rootElement).innerHTML = render;
        var elts = document.getElementById(this.rootElement).getElementsByTagName('a');

        for(var i = 0; i < elts.length; i++) {
            elts[i].style.backgroundColor = elts[i].getAttribute('data-color');
        }

        this.initEvents();
    },
    initEvents: function() {
        var self = this;

        document.getElementById(this.rootElement).addEventListener('click', function(event) {
            if (event.target !== undefined && event.target.getAttribute('data-color') !== undefined) {
                event.preventDefault();
                self.setColor(0, event.target.getAttribute('data-color'));
            }
        });
    }
};