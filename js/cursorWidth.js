var cursorWidth = {
    inputElement: 'cursor_width_input',

    getCursorWidth: function() {
        return this.currentCursorWidth;
    },
    setCursorWidth: function(cursorWidth) {
        this.currentCursorWidth = cursorWidth;

        document.dispatchEvent(
            new CustomEvent('change-cursor-width', {detail: {selectedWidth: this.currentCursorWidth}})
        );
    },
    render: function() {
        this.currentCursorWidth = document.getElementById(this.inputElement).value;
        this.initEvents();
    },
    initEvents: function() {
        var self = this,
            i = document.getElementById(this.inputElement);
        i.addEventListener('change', function(event) {
            self.setCursorWidth(this.value);
        });
    }
};
