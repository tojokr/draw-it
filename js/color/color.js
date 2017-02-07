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
    getFormat(c) {
        if(/^[a-z]+$/.test(c)) {

        }
    },
    toRgbArray: function(c) {
        c = '0x' + this.toHex(c).substring(1);
        return [(c>> 16)&255, (c>> 8)&255, c&255];
    },
    toRgb: function(c) {
        c = this.toRgbArray(c);
        return {r: c[0], g: c[1], b: c[2]};
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
    gradients(from, to, steps) {
        var fromRgb = this.toRgb(from),
            toRgb = this.toRgb(to),
            c = [],
            rr, gg, bb,
            rrr = 1, ggg = 1, bbb = 1;

        rr = Math.abs(toRgb[0] - fromRgb[0]);
        gg = Math.abs(toRgb[1] - fromRgb[1]);
        bb = Math.abs(toRgb[2] - fromRgb[2]);

        if (toRgb[0] - fromRgb[0] < 0) { rrr = -1; }
        if (toRgb[1] - fromRgb[1] < 0) { ggg = -1; }
        if (toRgb[2] - fromRgb[2] < 0) { bbb = -1; }

        if (steps === undefined) {
            steps = Math.min(Math.max(rr, gg, bb), 255);
        } else {
            steps--;
        }

        for(var i = 0; i <= steps; i++) {
            c.push(
                [
                    Math.round(fromRgb[0] + i * (rr / steps) * rrr),
                    Math.round(fromRgb[1] + i * (gg / steps) * ggg),
                    Math.round(fromRgb[2] + i * (bb / steps) * bbb)
                ]
            );
        }
        return c;
    }
};
