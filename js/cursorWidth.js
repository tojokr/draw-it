var cursorWidth = {
    parentElement: 'toolbar',
    rootElement: 'cursor_width',
    currentCursorWidth: 1,
    minCursorWidth: 1,
    maxCursorWidth: 100,
    template: '<label for="cursor_width_input">Cursor width: </label>'
        + '<input id="cursor_width_input" type="range" />'
        + '<output id="cursor_width_output"></output>',

    getCursorWidth: function() {
        return this.currentCursorWidth;
    },
    setCursorWidth: function(cursorWidth) {
        this.currentCursorWidth = cursorWidth;
    },
    render: function() {
        var content = '';

        content = document.createElement('div');
        content.setAttribute('id', this.rootElement);

        content.innerHTML = this.template;
        document.getElementById(this.parentElement).appendChild(content);

        var i = document.getElementById(this.rootElement).getElementsByTagName('input')[0];
        i.setAttribute('min', this.minCursorWidth);
        i.setAttribute('max', this.maxCursorWidth);
        i.setAttribute('value', this.minCursorWidth);

        this.initEvents();
    },
    initEvents: function() {
        var i = document.getElementById(this.rootElement).getElementsByTagName('input')[0];
        i.addEventListener('change', function(event) {
            document.dispatchEvent(
                new CustomEvent('change-cursor-width', {detail: {selectedWidth: this.value}})
            );
        });
    }
};
