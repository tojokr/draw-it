var opacity = {
    parentElement: 'toolbar',
    rootElement: 'opacity',
    steps: 0.005,
    minOpacity: 0.005,
    maxOpacity: 1,
    currentOpacity: 1,
    template:
        '<label for="opacity_input">Opacity: </label>'
        + '<input id="opacity_input" type="range" />'
        + '<output id="opacity_output"></output>',
    getOpacity: function() {
        return this.currentOpacity;
    },
    setOpacity: function(opacity) {
        if (opacity >= 0 && opacity <= 1) {
            this.currentOpacity = opacity;
        }
    },
    render: function() {
        var content = '';

        content = document.createElement('div');
        content.setAttribute('id', this.rootElement);

        content.innerHTML = this.template;
        document.getElementById(this.parentElement).appendChild(content);

        var i = document.getElementById(this.rootElement).getElementsByTagName('input')[0];
        i.setAttribute('step', this.steps);
        i.setAttribute('min', this.minOpacity);
        i.setAttribute('max', this.maxOpacity);
        i.setAttribute('value', this.maxOpacity);

        this.initEvents();
    },
    initEvents: function() {
        var i = document.getElementById(this.rootElement).getElementsByTagName('input')[0];
        i.addEventListener('change', function(event) {
            document.dispatchEvent(
                new CustomEvent('change-opacity', {detail: {selectedOpacity: this.value}})
            );
        });
    }
}