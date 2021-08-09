// Counts the number of lines in a block.
function getRows(selector) {
    var height = $(selector).height();
    var font_size = $(selector).css('font-size');
    var line_height = $(selector).css('line-height');
    var scale = 1.15;
    var line_height = Math.floor(parseInt(font_size) * scale);
    var rows = height / line_height;

    return Math.round(rows);
};

// Cuts text to the width of the block with the addition of three dots at the end
function ellipsizeTextBox(elClass) {
    var el = $(elClass),
        wordArray = el.html().split(' ');

    while (el.prop('scrollHeight') > el.outerHeight()) {
        wordArray.pop();
        el.html(wordArray.join(' ') + '...');
    }
};
