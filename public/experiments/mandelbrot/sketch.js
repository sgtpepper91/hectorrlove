let mandelbrotCanvas;
let juliaCanvas;
let limitX;
let limitY;
let maxX;
let maxY;
const maxIterations = 100;

// Punto constante c para el conjunto de Julia
let c = { re: 0.285, im: -0.01 };
let deltaIm = 0.005;
const animationJulia = false;
const animationMandelbrot = false;
// Variables para el zoom
const centers = [
    { re: 0, im: 0 }, // Centro del conjunto de Mandelbrot.
    { re: -0.75, im: 0 }, //El corazón principal del conjunto (forma de cardioide).
    { re: -0.75, im: 0.186 }, // El punto de la "isla" en el conjunto de Mandelbrot.
    { re: -0.1015, im: 0.633}, // Seahorse Valley (Valle de los caballitos de mar).
    { re: -0.74364388703, im: 0.13182590421}, // Elephand Valley (Valle de los elefantes).
    { re: -1.749766, im: 0}, // Región cercana a la bifurcación extrema izquierda.
    { re: 0.001643721971153, im: 0.822467633298876}, //Detalle fino cerca del borde superior derecho.
    { re: -0.8, im: 0 }, // Otro punto interesante.
    { re: -0.4, im: 0.6 }, // Otro punto interesante.
    { re: -0.1, im: 0.7 }, // Otro punto interesante.
    { re: -0.5, im: 0.5 }, // Otro punto interesante.
    { re: -0.2, im: 0.6 }, // Otro punto interesante.
    { re: -0.6, im: 0.4 }, // Otro punto interesante.
    { re: -0.3, im: 0.5 }, // Otro punto interesante.
    { re: -0.7, im: 0.2 }, // Otro punto interesante.
];
const zoomCenter = centers[0]; // Cambia el índice para elegir otro centro de zoom
let zoomFactor = 1.0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    mandelbrotCanvas = createGraphics(width / 2, height);
    juliaCanvas = createGraphics(width / 2, height);
    limitX = floor(mandelbrotCanvas.width / 2);
    limitY = floor(mandelbrotCanvas.height / 2);
    maxX = 2;
    maxY = 2;
    drawMandelbrot();

    let saveMandelbrotButton = createButton('Save Mandelbrot');
    saveMandelbrotButton.position(10, height + 10);
    saveMandelbrotButton.mousePressed(() => {
        saveCanvas(mandelbrotCanvas, 'mandelbrot', 'png');
    });

    let saveJuliaButton = createButton('Save Julia');
    saveJuliaButton.position(200,height + 10);
    saveJuliaButton.mousePressed(() => {
        saveCanvas(juliaCanvas, `julia_c_${c.re}+${c.im}i`, 'png');
    });
}

function draw() {
    background(0);
    image(mandelbrotCanvas, 0, 0);
    image(juliaCanvas, width / 2, 0);
    if(animationMandelbrot) {
        zoomFactor *= 0.95;
        maxX *= zoomFactor;
        maxY *= zoomFactor;
        const scaleX = 2.0 * maxX / mandelbrotCanvas.width;
        const scaleY = -2.0 * maxY / mandelbrotCanvas.height;
        zoomCenter.re += scaleX * (zoomCenter.re - 0);
        zoomCenter.im += scaleY * (zoomCenter.im - 0);
        drawMandelbrot();

        if(zoomFactor < 0.1 || maxX < 0.1) {
            zoomFactor /=  0.95; // Reiniciar el zoom
        }

    }
    // Actualizar el canvas de Julia solo si no está en modo animación
    //drawJulia();
    if (animationJulia) {
        c.im += deltaIm;
        c.im = Math.round(c.im * 1000) / 1000;
        if (c.im > 0.5 || c.im < -0.5) {
            deltaIm *= -1; // Cambiar la dirección del incremento
        }
    }
}

function drawMandelbrot() {
    mandelbrotCanvas.background(0);
    const scaleX = 2.0 * maxX / mandelbrotCanvas.width;
    const scaleY = -2.0 * maxY / mandelbrotCanvas.height;
    for (let i = -limitX; i < limitX; i++) {
        for (let j = -limitY; j < limitY; j++) {
            let x = zoomCenter.re + scaleX * i;
            let y = zoomCenter.im + scaleY * j;
            let count = mandelbrot(x, y);
            let hue = map(count, 0, maxIterations, 0, 360);
            let saturation = 100;
            let brightness = count < maxIterations ? 100 : 0;
            mandelbrotCanvas.colorMode(HSB, 360, 100, 100);
            mandelbrotCanvas.stroke(hue, saturation, brightness);
            mandelbrotCanvas.point(i + mandelbrotCanvas.width/2, j + mandelbrotCanvas.height/2);
        }
    }
}

function drawJulia() {
    console.log("Drawing Julia set with c:", c);
    juliaCanvas.clear();
    juliaCanvas.background(0);
    juliaCanvas.colorMode(HSB, 360, 100, 100);
    const scaleX = 2.0 * maxX / juliaCanvas.width;
    const scaleY = -2.0 * maxY / juliaCanvas.height;
    for (let i = -limitX; i < limitX; i++) {
        for (let j = -limitY; j < limitY; j++) {
            let x = scaleX * i;
            let y = scaleY * j;
            let count = julia(x, y);
            let hue = map(count, 0, maxIterations, 0, 360);
            let saturation = 100;
            let brightness = count < maxIterations ? 100 : 0;
            juliaCanvas.stroke(hue, saturation, brightness);
            juliaCanvas.point(i + juliaCanvas.width / 2, j + juliaCanvas.height / 2);
        }
    }
    juliaCanvas.textSize(24);
    juliaCanvas.fill(0, 0, 100);
    juliaCanvas.text(`c = ${c.re} + ${c.im}i`, 0, 20);
}

function mandelbrot(x, y) {
    let z = { re: 0, im: 0 };
    let count = 0;

    while (count < maxIterations) {
        let zSquare = squareC(z);
        z = sumComplex(zSquare, { re: x, im: y });
        if (magC(z) >= 2) {
            break;
        }
        count++;
    }
    return count;
}

function julia(x, y) {
    let z = { re: x, im: y };
    let count = 0;

    while (count < maxIterations) {
        let zSquare = squareC(z);
        z = sumComplex(zSquare, c);
        if (magC(z) >= 2) {
            break;
        }
        count++;
    }
    return count;
}

function squareC(z) {
    let x = z.re * z.re - z.im * z.im;
    let y = 2 * z.re * z.im;
    return { re: x, im: y };
}

function sumComplex(a, b) {
    return { re: a.re + b.re, im: a.im + b.im };
}

function magC(z) {
    return sqrt(z.re * z.re + z.im * z.im);
}

function mousePressed() {
    if (mouseX < width / 2 && mouseY < height) {
        // Click en el canvas de Mandelbrot
        const scaleX = 2.0 * maxX / mandelbrotCanvas.width;
        const scaleY = -2.0 * maxY / mandelbrotCanvas.height;
        let re = scaleX * (mouseX - mandelbrotCanvas.width / 2);
        let im = scaleY * (mouseY - mandelbrotCanvas.height / 2);
        // Truncar a 3 decimales
        re = Math.round(re * 1000) / 1000;
        im = Math.round(im * 1000) / 1000;
        c = { re, im };
        drawJulia();
    }
}