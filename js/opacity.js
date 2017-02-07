var opacity = {
    inputElement: 'opacity_input',

    getOpacity: function() {
        return this.currentOpacity;
    },
    setOpacity: function(opacity) {
        if (opacity >= 0 && opacity <= 1) {
            this.currentOpacity = opacity;

            document.dispatchEvent(
                new CustomEvent('change-opacity', {detail: {selectedOpacity: this.currentOpacity}})
            );
        }
    },
    render: function() {
        this.currentOpacity = document.getElementById(this.inputElement).value;
        this.initEvents();
    },
    initEvents: function() {
        var self = this,
            i = document.getElementById(this.inputElement);

        i.addEventListener('change', function(event) {
            self.setOpacity(this.value);
        });
    }
}