$(document).ready(function() {
    let parent = document.getElementById("pickerParent");
    let picker = new Picker({
        parent: document.querySelector('#pickerParent')
    });
    let canvas = document.getElementById("canvas");
    let CTX = canvas.getContext("2d");
    let DIMENSION = 25;
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;
    let PIXELSIZE = WIDTH / DIMENSION;
    CTX.strokeStyle = 'rgba(0, 0, 0, 0.4)'
    CTX.fillStyle = 'rgba(0, 0, 0, 0.1)'
    
    for(let i = 0; i< DIMENSION; ++i) {
        x = Math.floor((i * WIDTH / DIMENSION));
        CTX.beginPath();
        CTX.moveTo(x, 0);
        CTX.lineTo(x, HEIGHT);
        CTX.stroke();

        y = Math.floor((i * HEIGHT / DIMENSION));
        CTX.beginPath();
        CTX.moveTo(0, y);
        CTX.lineTo(WIDTH, y);
        CTX.stroke();
    }
    
    $("#canvas").on('mousedown touchstart touchmove mousemove', mouseFill);
    function mouseFill(e) {
        if(e.which != 1) return;

        var offsetX = e.offsetX;
        var offsetY = e.offsetY;
        pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
        fillPixel(pixel);
    }

    function fillPixel(pixel) {
        CTX.fillStyle = 'rgb(0, 0, 0)'
        CTX.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
    }
})