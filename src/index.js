import { SVG } from "@svgdotjs/svg.js";
import colors from "nice-color-palettes/200";
import tinycolor from "tinycolor2";
import './style.css';

const squareSize = 100;

const getRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const generateGrid = () => {
    const rows = getRandom(8, 4);
    const columns = getRandom(8, 4);
    drawGrid(rows, columns);
}

const drawGrid = (rows, columns) => {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    const palette = colors[getRandom(colors.length, 0)];

    const bg = tinycolor
        .mix(palette[0], palette[1], 50)
        .desaturate(10)
        .toString();

    const bgTop = tinycolor(bg).lighten(10).toString();
    const bgBottom = tinycolor(bg).darken(10).toString();

    container.style.setProperty('--first-color', bgTop);
    container.style.setProperty('--second-color', bgBottom);

    let draw = SVG()
        .addTo('.container')
        .size("100%", "100%")
        .viewbox(`0 0 ${rows * squareSize} ${columns * squareSize}`);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const xPos = i * squareSize;
            const yPos = j * squareSize;
            const mainColor = palette[getRandom(palette.length, 0)];
            const background = getBackgroundColor(palette,mainColor);

            drawBlock(xPos, yPos, background, mainColor, bgBottom, draw);
        }
    }
}


const drawBlock = (x, y, background, mainColor, borderColor, container) => {
    const group = container.group().addClass('block');
    group.rect(squareSize, squareSize).stroke({color:borderColor, width:4}).fill(background).move(x, y);
    drawCircle(group,x,y,mainColor)
}

const drawCircle = (group, x, y, color) => {
    const circleSize = getRandom(squareSize,50);
    const xPos = x+(squareSize/2) - (circleSize/2);
    const yPos = y+(squareSize/2) - (circleSize/2);
    group.circle(circleSize).fill(color).move(xPos, yPos)
}

const getBackgroundColor = (palette,mainColor) => {
    const tempColors = [...palette];
    tempColors.splice(tempColors.indexOf(mainColor),1)
    return tempColors[getRandom(tempColors.length, 0)];
}

const init = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);

    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Create';
    button.addEventListener('click', generateGrid);
    document.body.appendChild(button);

   generateGrid();
}

init();
