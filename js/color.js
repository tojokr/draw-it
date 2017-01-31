/**
https://openclassrooms.com/courses/une-palette-de-couleurs
http://htmlcolorcodes.com/fr/selecteur-de-couleur/
 */
var colors = {
    namedColors: {
        aqua: '#00ffff', black: '#000000', blue: '#0000ff', fuchsia: '#ff00ff',
        gray: '#808080', green: '#008000', lime: '#00ff00', maroon: '#800000',
        navy: '#000080', olive: '#808000', purple: '#800080', red: '#ff0000',
        silver: '#c0c0c0', teal: '#008080', white: '#ffffff', yellow: '#ffff00'
    },
    toRgb: function(c) {
        c = '0x' + this.toHex(c).substring(1);
        return [(c>> 16)&255, (c>> 8)&255, c&255];
    },
    toRgbString: function(c) {
        return 'rgb('+this.Rgb(c).join(',')+')';
    },
    toHex: function(c){
        var tem, i= 0, c= c? c.toString().toLowerCase(): '';
        // Already hexadecimal
        if(/^#[a-f0-9]{3,6}$/.test(c)){
            if(c.length< 7){
                var A= c.split('');
                c= A[0]+A[1]+A[1]+A[2]+A[2]+A[3]+A[3];
            }
            return c;
        }
        // named color
        if(/^[a-z]+$/.test(c)){
            return this.namedColors[c] || '';
        }
        c= c.match(/\d+(\.\d+)?%?/g) || [];
        if(c.length<3) return '';
        c= c.slice(0, 3);
        while(i< 3){
            tem= c[i];
            if(tem.indexOf('%') !== -1){
                tem= Math.round(parseFloat(tem)*2.55);
            }
            else tem= parseInt(tem);
            if(tem< 0 || tem> 255) c.length= 0;
            else c[i++]= tem.toString(16).padZero(2);
        }
        if(c.length === 3) return '#'+c.join('').toLowerCase();
        return '';
    },
    toHsv(c) {
        var rr, gg, bb,
            r = arguments[0] / 255,
            g = arguments[1] / 255,
            b = arguments[2] / 255,
            h, s,
            v = Math.max(r, g, b),
            diff = v - Math.min(r, g, b),
            diffc = function(c){
                return (v - c) / 6 / diff + 1 / 2;
            };

        if (diff == 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(r);
            gg = diffc(g);
            bb = diffc(b);

            if (r === v) {
                h = bb - gg;
            }else if (g === v) {
                h = (1 / 3) + rr - bb;
            }else if (b === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            }else if (h > 1) {
                h -= 1;
            }
        }
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            v: Math.round(v * 100)
        };
    },
    toHsvString(c) {

    },
    getNegative(c) {
        var c = this.toRgb(c);
        c.forEach(function(e) {
            e = 255 - e;
        });
        return this.toHex(c);
    },
    getTriadics(c) {
        var c = this.toRgb(c);
        c.forEach(function(e) {

        });
    },
    gradientFromTo(from, to, step) {
        var fromRgb = this.toRgb(from),
            toRgb = this.toRgb(to),
            c = [],
            d = [];
        fromRgb.forEach(function(e) {
            
        });
    }
};

var colorPallet = {
    parentElement: 'toolbar',
    rootElement: 'color_pallet',
    template: '<span><a href="#" style="background-color:%s" data-color="%s"></a></span>',
    colors: [],

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
        this.currentColors[idx] = colorValue;
    },
    setColor: function(colorValue) {
        return this.setColor(0, colorValue);
    },
    render: function() {
        var render = '',
            content = '';

        this.colors.forEach(function(element) {
            render += this.template.replace(/%s/g, element);
        }, this);
        content = document.createElement('div');
        content.setAttribute('id', this.rootElement);

        content.innerHTML = render;
        document.getElementById(this.parentElement).appendChild(content);

        this.initEvents();
    },
    initEvents: function() {
        document.getElementById(this.rootElement).addEventListener('click', function(event) {
            if (event.target !== undefined && event.target.getAttribute('data-color') !== undefined) {
                event.preventDefault();
                //this.config.colorPallet.setColor(event.target.getAttribute('data-color'));
                document.dispatchEvent(
                    new CustomEvent(
                        'change-color', {
                            detail: {selectedColor: event.target.getAttribute('data-color')}
                        }
                    )
                );
            }
        });
    }
};