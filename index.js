$(document).ready(function () {
    let canvas = $("#mainCanvas");
    let CTX = canvas.get(0).getContext("2d");
    let PIXEL_SIZE = 1;

    let DIMENSION = 150;
    let REPEATX = 7;
    let REPEATY = 70;

    let CANVAS_WIDTH = DIMENSION * REPEATX * PIXEL_SIZE;
    let CANVAS_HEIGHT = DIMENSION * REPEATY * PIXEL_SIZE;
    canvas.attr('width', CANVAS_WIDTH);
    canvas.attr('height', CANVAS_HEIGHT);

    CTX.strokeStyle = "#000000";
    for (i = 0; i < REPEATX * PIXEL_SIZE; ++i) {
        CTX.moveTo(i * DIMENSION, 0);
        CTX.lineTo(i * DIMENSION, CANVAS_HEIGHT);
        CTX.stroke();
    }

    for (i = 0; i < REPEATY * PIXEL_SIZE; ++i) {
        CTX.moveTo(0, i * DIMENSION);
        CTX.lineTo(CANVAS_WIDTH, i * DIMENSION);
        CTX.stroke();
    }

    let SELECTED_CELL = undefined;
    canvas.mousemove(function (e) {
        let pixel = [Math.floor(e.offsetX / (DIMENSION * PIXEL_SIZE)), Math.floor(e.offsetY / (DIMENSION * PIXEL_SIZE))];
        console.log(pixel);
        if (!SELECTED_CELL) {
            SELECTED_CELL = $("<div id=selectedCell></div>");
            SELECTED_CELL.css({ width: DIMENSION * PIXEL_SIZE, height: DIMENSION * PIXEL_SIZE});
            $("#canvasWrapper").prepend(SELECTED_CELL);
        }
        // + 10 is because of margin
        SELECTED_CELL.css({left: pixel[0] * DIMENSION * PIXEL_SIZE + 10, top: pixel[1] * DIMENSION * PIXEL_SIZE + 10});
    });
    canvas.click(function(e){
        let pixel = [Math.floor(e.offsetX / (DIMENSION * PIXEL_SIZE)), Math.floor(e.offsetY / (DIMENSION * PIXEL_SIZE))];
        window.location = "draw.html?x=" + pixel[0] + "&y=" + pixel[1];
    });
})