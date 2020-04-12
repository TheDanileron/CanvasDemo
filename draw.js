$(document).ready(function () {
    let parent = document.getElementById("pickerParent");
    let picker = new Picker({
        parent: document.querySelector('#pickerParent'), onChange: onColorSelected, onOpen: onPickerOpen,
        onClose: onPickerClose
    });
    window.picker = picker;
    let canvas = document.getElementById("canvas");
    let CTX = canvas.getContext("2d");
    let DIMENSION = 25;
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;
    let PIXELSIZE = WIDTH / DIMENSION;
    let RGBA = [0, 0, 0, 0.2];
    let COLOR = "rgba(" + RGBA[0] + ", " + RGBA[1] + ", " + RGBA[2] + ", " + RGBA[3] + ")";
    CTX.strokeStyle = COLOR;
    let ERASE = false;
    let canvasEnabled = true;
    let pictureMap = []

    for (let i = 0; i < DIMENSION; ++i) {
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
        if (e.which != 1) return;

        var offsetX = e.offsetX;
        var offsetY = e.offsetY;
        pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
        fillPixel(pixel);
    }

    function fillPixel(pixel) {
        if (!canvasEnabled) return;
        if (ERASE) {
            pictureMap[pixel[0] + "_" + pixel[1]] = "#FFFFFF";
            CTX.fillStyle = "#FFFFFF";
        }
        else {
            pictureMap[pixel[0] + "_" + pixel[1]] = COLOR;
            CTX.fillStyle = COLOR;
        }
        CTX.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
    }

    function onColorSelected(color) {
        setColor(color.rgba);
        CTX.fillStyle = COLOR;
    }

    function onPickerOpen() {
        canvasEnabled = false;
    }

    function onPickerClose() {
        setTimeout(function () {
            canvasEnabled = true;
        }, 500);
    }

    function setColor(colorRGBA) {
        COLOR_STR = "rgba(" + colorRGBA[0] + ", " + colorRGBA[1] + ", " + colorRGBA[2] + ", " + colorRGBA[3] + ")";
        COLOR = "#" + rgba2hex(COLOR_STR);
        window.COLOR = COLOR;
    }

    let eraser = document.getElementById('eraserBtn');
    $("#eraserBtn").on('mousedown', function (e) {
        ERASE = !ERASE;
    });

    let saveBtn = document.getElementById('saveBtn');
    $("#saveBtn").click(function (e) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams);

        let x = urlParams.get("x");
        let y = urlParams.get("y");
        console.log(x + " " + y);
        save(x, y);
    });

    function save(x, y) {
        console.log(pictureMap);
    }

    function rgba2hex(orig) {
        var a, isPercent,
          rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
          alpha = (rgb && rgb[4] || "").trim(),
          hex = rgb ?
          (rgb[1] | 1 << 8).toString(16).slice(1) +
          (rgb[2] | 1 << 8).toString(16).slice(1) +
          (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
      
        if (alpha !== "") {
          a = alpha;
        } else {
          a = 01;
        }
        // multiply before convert to HEX
        a = ((a * 255) | 1 << 8).toString(16).slice(1)
        hex = hex + a;
      
        return hex;
      }
})