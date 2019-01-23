/*jslint sloppy: true, vars: true, plusplus: true, white: true */

var FlowZone = require('./flowZone');

module.exports = FlowCalculator;

/**
 * The heart of the optical flow detection. Implements Lucas-Kande method:
 * http://en.wikipedia.org/wiki/Lucas%E2%80%93Kanade_method
 * Current implementation is not extremely tolerant to garbage collector.
 * This could be improved...
 */
function FlowCalculator(step) {
    this.step = step || 8;
}

FlowCalculator.prototype.calculate = function (oldImage, newImage, width, height) {
    // var zones = [];
    var step = this.step;
    var winStep = step * 2 + 1;
    
    var A2, A1B2, B1, C1, C2;
    var u, v, uu, vv;
    uu = vv = 0;
    var wMax = width - step - 1;
    var hMax = height - step - 1;
    var globalY, globalX, localY, localX;
    
    this.numX = ceil((wMax - step - 1) / winStep);
    this.numY = ceil((hMax - step - 1) / winStep);
    var numElements = this.numX * this.numY * 2;
    this.uvArray = (this.uvArray && this.uvArray.length === numElements) ? this.uvArray : new Float32Array(numElements);
    var index = 0;

    for (globalY = step + 1; globalY < hMax; globalY += winStep) {
        for (globalX = step + 1; globalX < wMax; globalX += winStep) {
            A2 = A1B2 = B1 = C1 = C2 = 0;

            for (localY = -step; localY <= step; localY++) {
                for (localX = -step; localX <= step; localX++) {
                    var address = (globalY + localY) * width + globalX + localX;

                    var gradX = (newImage[(address - 1) * 4]) - (newImage[(address + 1) * 4]);
                    var gradY = (newImage[(address - width) * 4]) - (newImage[(address + width) * 4]);
                    var gradT = (oldImage[address * 4]) - (newImage[address * 4]);

                    A2 += gradX * gradX;
                    A1B2 += gradX * gradY;
                    B1 += gradY * gradY;
                    C2 += gradX * gradT;
                    C1 += gradY * gradT;
                }
            }

            var delta = (A1B2 * A1B2 - A2 * B1);

            if (delta !== 0) {
                /* system is not singular - solving by Kramer method */
                var Idelta = step / delta;
                var deltaX = -(C1 * A1B2 - C2 * B1);
                var deltaY = -(A1B2 * C2 - A2 * C1);

                u = deltaX * Idelta;
                v = deltaY * Idelta;
            } else {
                /* singular system - find optical flow in gradient direction */
                var norm = (A1B2 + A2) * (A1B2 + A2) + (B1 + A1B2) * (B1 + A1B2);
                if (norm !== 0) {
                    var IGradNorm = step / norm;
                    var temp = -(C1 + C2) * IGradNorm;

                    u = (A1B2 + A2) * temp;
                    v = (B1 + A1B2) * temp;
                } else {
                    u = v = 0;
                }
            }

            u = max(-winStep, min(winStep, u));
            v = max(-winStep, min(winStep, v));

            // if (-winStep < u && u < winStep &&
                // -winStep < v && v < winStep) {
                uu += u;
                vv += v;
                // zones.push(new FlowZone(globalX, globalY, u, v));
                
            // }
            this.uvArray[index++] = u;
            this.uvArray[index++] = v;
        }
    }

    return {
        // zones : zones,
        uvArray: this.uvArray,
        numX: this.numX,
        numY: this.numY,
        winStep: winStep,
        u : uu / (numElements / 2),
        v : vv / (numElements / 2),
        image: newImage,
        width: width,
        height: height,
    };
};
