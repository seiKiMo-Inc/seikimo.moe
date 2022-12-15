/*
The MIT License (MIT)

Copyright (c) 2020-present, hyperstown (github.com/hyperstown/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// I MODIFIED SOME BITS OF THE CODE TO MAKE IT WORK WITH MY PROJECT

let baseCss = `
    .snowflake {
        z-index: 1;
        position: absolute;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        filter: drop-shadow(0 0 10px white);
    }
`;

// Creating snowflakes
export function spawnSnow(snowDensity = 200, snowDiv: HTMLDivElement) {
    snowDensity -= 1;

    for (let x = 0; x < snowDensity; x++) {
        let board = document.createElement('div');
        board.className = "snowflake";

        snowDiv.appendChild(board);
    }
}

// Append style for each snowflake to the head
function addCss(rule: string) {
    let css = document.createElement('style');
    css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css);
}

// Math
function randomInt(value = 100) {
    return Math.floor(Math.random() * value) + 1;
}

function randomIntRange(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

// Create style for snowflake
export function spawnSnowCSS(snowDensity = 200) {
    let bodyHeightPx = document.getElementsByClassName("Header")[0].scrollHeight;
    let pageHeightVH = (100 * bodyHeightPx / window.innerHeight);
    let snowflakeName = "snowflake";
    let rule = ``;
    if (typeof baseCss !== 'undefined') {
        rule = baseCss;
    }

    for (let i = 1; i < snowDensity; i++) {
        let randomX = (Math.random() * 100) - 3; // vw
        let randomOffset = Math.random() // vw;
        let randomXEnd = randomX + randomOffset;
        let randomXEndYoyo = randomX + (randomOffset / 2);
        let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
        let randomYoyoY = randomYoyoTime * pageHeightVH; // vh
        let randomScale = Math.random();
        let fallDuration = randomIntRange(10, pageHeightVH / 10 * 3); // s
        let fallDelay = randomInt(pageHeightVH / 10 * 3) * -1; // s
        let opacity = Math.random();

        rule += `
        .${snowflakeName}:nth-child(${i}) {
            opacity: ${opacity};
            transform: translate(${randomX}vw, -10px) scale(${randomScale});
            animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
        }
        @keyframes fall-${i} {
            ${randomYoyoTime * 100}% {
                transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
            }
            to {
                transform: translate(${randomXEndYoyo}vw, ${pageHeightVH}vh) scale(${randomScale});
            }
            
        }
        `
    }
    addCss(rule);
}
