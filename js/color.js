/**
https://openclassrooms.com/courses/une-palette-de-couleurs
http://htmlcolorcodes.com/fr/selecteur-de-couleur/
 */


class Color {
    constructor(parameters) {
        // Init attributes
        this.colors = this.currentColors = [];
        this.parentElement = (parameters.parentElement !== undefined) ? parameters.parentElement : 'toolbar';
        this.rootElement = (parameters.rootElement !== undefined) ? parameters.rootElement : 'color';
        this.wrapperHtml = (parameters.wrapperHtml !== undefined) ? parameters.wrapperHtml : 'Colors: <ul>%s</ul>';
        this.childHtml = (parameters.childHtml !== undefined) ? parameters.childHtml : '<li><a href="#" style="background-color:%s" data-color="%s"></a></li>';

        this.setColors(parameters.colors);
    }
    getColors() {
        return this.colors;
    }
    setColors(colors) {
        if (typeof colors === 'function') {
            /* http://krazydad.com/tutorials/makecolors.php*/
            this.colors = colors();
        } else if (colors instanceof Object) {
            this.colors = Utils.objectToArray(colors);
        } else if (colors instanceof Array) {
            this.colors = colors;
        }
    }
    objectToArray(obj) {
        var arr = [];

        if (typeof obj !== 'object') {
            throw new Exception('Not an object');
        }

        for (var i in obj) {
            arr[i] = obj[i];
        }
        return arr;
    }
    getColor(idx) {
        if (idx !== undefined || this.currentColors.indexOf(idx) === -1) {
            idx = 0;
        }
        return this.currentColors.indexOf(idx);
    }
    setColor(idx, colorValue) {
        this.currentColors[idx] = colorValue;
    }
    setColor(colorValue) {
        return this.setColor(0, colorValue);
    }
    render() {
        var render = '',
            content = '';

        this.colors.forEach(function(element) {
            render += this.childHtml.replace(/%s/g, element);
        }, this);
        render = this.wrapperHtml.replace(/%s/g, render);

        content = document.createElement('div');
        content.setAttribute('id', this.rootElement);

        content.innerHTML = render;
        document.getElementById(this.parentElement).appendChild(content);

        this.initEvents();
    }
    initEvents() {
        document.getElementById(this.rootElement).addEventListener('click', function(event) {
            if (event.target !== undefined && event.target.getAttribute('data-color') !== undefined) {
                event.preventDefault();
                //this.config.colorPallet.setColor(event.target.getAttribute('data-color'));
                document.dispatchEvent(
                    new CustomEvent('change-color', {detail: {selectedColor: event.target.getAttribute('data-color')}})
                );
            }
        });
    }
    static convertColor(colorCode, to) {

    }
    static convertColorToRgb(colorCode) {

    }
}
