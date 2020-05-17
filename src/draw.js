import './styles/draw.css'
import Picker from '../color_picker/dist/vanilla-picker'
import API, { graphqlOperation } from '@aws-amplify/api'
import { createMultiplayerCanvasModel } from './graphql/mutations';
import configure from './configure-api'

$(document).ready(function () {
    configure();

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
    let COLOR_GRID = "#969696"
    let COLOR = "#00ccffff"
    CTX.strokeStyle = COLOR_GRID;
    let ERASE = false;
    let canvasEnabled = true;
    let pictureMap = {}
    $('#colorPreview').css('background-color', COLOR);

    //
    // for (let i = 0; i < DIMENSION; ++i) {
    //     let x = Math.floor((i * WIDTH / DIMENSION));
    //     CTX.beginPath();
    //     CTX.moveTo(x, 0);
    //     CTX.lineTo(x, HEIGHT);
    //     CTX.stroke();

    //     let y = Math.floor((i * HEIGHT / DIMENSION));
    //     CTX.beginPath();
    //     CTX.moveTo(0, y);
    //     CTX.lineTo(WIDTH, y);
    //     CTX.stroke();
    // }

    $("#canvas").on('mousedown touchstart touchmove mousemove', mouseFill);
    function mouseFill(e) {
        if (e.which != 1) return;

        var offsetX = e.offsetX;
        var offsetY = e.offsetY;
        let pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
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
        let COLOR_STR = "rgba(" + colorRGBA[0] + ", " + colorRGBA[1] + ", " + colorRGBA[2] + ", " + colorRGBA[3] + ")";
        COLOR = "#" + rgba2hex(COLOR_STR);
        window.COLOR = COLOR;
        $('#colorPreview').css('background-color', COLOR);
    }

    $("#eraserBtn").on('mousedown', function (e) {
        ERASE = !ERASE;
        let eraserBtn = $("#eraserBtn");
        let pickerBtn = $("#pickerParent");
        if(ERASE){
            eraserBtn.css('border', '2px wheat solid');
            eraserBtn.css('text-decoration', 'underline');
            pickerBtn.css('border', '0');
            pickerBtn.css('text-decoration', 'none');
        } else {
            pickerBtn.css('border', '2px wheat solid');
            pickerBtn.css('text-decoration', 'underline');
            eraserBtn.css('border', '0');
            eraserBtn.css('text-decoration', 'none');
        }
    });

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
        savePicture(x, y);
    }

    async function savePicture(x, y) {
        console.log(JSON.stringify(pictureMap));
        const data = { 
            title: "Test Picture", 
            grid_dimension: DIMENSION,
            picture: JSON.stringify(pictureMap),
            grid_coordinates: JSON.stringify({x: x, y: y})
         }
         await API.graphql(graphqlOperation(createMultiplayerCanvasModel, {input: data}));
         window.location = "index.html";
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
          a = 1;
        }
        // multiply before convert to HEX
        a = ((a * 255) | 1 << 8).toString(16).slice(1)
        hex = hex + a;
      
        return hex;
      }
})