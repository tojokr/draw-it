class Opacity {
    constructor(parameters) {
        this.parentElement = (parameters.parentElement !== undefined) ? parameters.parentElement : 'toolbar';
        this.rootElement = (parameters.rootElement !== undefined) ? parameters.rootElement : 'opacity';
        this.currentOpacity = 1;
        this.steps = 10;
        this.minOpacity = 1;
        this.maxOpacity = 100 / this.steps;
        this.renderHtml = '<label for="opacity_input">Opacity: </label>'
                + '<input id="opacity_input" type="range" />'
                + '<output id="opacity_output"></output>';
    }
    getOpacity() {
        return this.currentOpacity;
    }
    setOpacity(opacity) {
        if (opacity >= 0 && opacity <= 1) {
            this.currentOpacity = opacity;
        }
    }
    render() {
        var content = '';

        content = document.createElement('div');
        content.setAttribute('id', this.rootElement);

        content.innerHTML = this.renderHtml;
        document.getElementById(this.parentElement).appendChild(content);

        var i = document.getElementById(this.rootElement).getElementsByTagName('input')[0];
                i.setAttribute('min', this.minOpacity);
                i.setAttribute('max', this.maxOpacity);
                i.setAttribute('value', this.maxOpacity);

        this.initEvents();
    }
    initEvents() {
        var i = document.getElementById(this.rootElement).getElementsByTagName('input')[0];
        i.addEventListener('change', function(event) {
            document.dispatchEvent(
                new CustomEvent('change-opacity', {detail: {selectedOpacity: this.value / 100}})
            );
        });
    }
}