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
