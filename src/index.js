import Sketch from './sketch';
import Stats from 'stats-js';

import WebCamFlow from './oflow/webcamFlow';

let sketch = Sketch.create({
    eventTarget: document.body,
    container: document.body,
    retina: 'auto'
});

let style = sketch.element.style;
style.position = 'absolute';
style.left = '0px';
style.top = '0px';
style.backgroundColor = '#000';

let ctx = sketch;

let stats;
if (process.env.NODE_ENV !== 'production') {
    stats = new Stats();
    stats.setMode(1);
    document.body.appendChild( stats.domElement );
    sketch.stats = stats;
}

let velocityIterations = 8;
let positionIterations = 3;
let world = null;
let particleSystem;
let positions;
let velocities;
let numParticles;
let webcamFlow;

let flow;

sketch.setup = () => {
    let gravity = new b2Vec2(0, 200.0);
    world = window.world = new b2World(gravity); // ugh

    var bd = new b2BodyDef();
    bd.type = b2_staticBody;

    let body = world.CreateBody(bd);

    let b1 = new b2PolygonShape();
    b1.SetAsBoxXYCenterAngle(0.5, 2, new b2Vec2(2.1, 0), 0);
    body.CreateFixtureFromShape(b1, 5);

    let b2 = new b2PolygonShape();
    b2.SetAsBoxXYCenterAngle(0.5, 2, new b2Vec2(-2.1, 0), 0);
    body.CreateFixtureFromShape(b2, 5);

    let b3 = new b2PolygonShape();
    b3.SetAsBoxXYCenterAngle(4, 0.5, new b2Vec2(0, 1.5), 0);
    body.CreateFixtureFromShape(b3, 5);

    let b4 = new b2PolygonShape();
    b4.SetAsBoxXYCenterAngle(4, 0.5, new b2Vec2(0, -1.5), 0);
    body.CreateFixtureFromShape(b4, 5);

    // setup particle system
    let psd = new b2ParticleSystemDef();
    psd.radius = 0.045;
    psd.dampingStrength = 0.1;
    psd.surfaceTensionNormalStrength = 0.004;
    psd.surfaceTensionPressureStrength = 0.004;

    particleSystem = world.CreateParticleSystem(psd);
    let box = new b2PolygonShape();
    box.SetAsBoxXYCenterAngle(1.5, 0.7, new b2Vec2(0, 0.2), 0);

    let particleGroupDef = new b2ParticleGroupDef();
    particleGroupDef.shape = box;
    particleGroupDef.flags = b2_tensileParticle;
    let particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);

    positions = particleSystem.GetPositionBuffer();
    velocities = particleSystem.GetVelocityBuffer();
    numParticles = positions.length;

    webcamFlow = new WebCamFlow(undefined, undefined, undefined, { width: { ideal: 480 }, height: { ideal: 320 }, facingMode: 'user' });
    webcamFlow.startCapture();
    webcamFlow.onCalculated(gotFlow);
}

function gotFlow(direction) {
    flow = direction;
}

// https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
}
function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }

sketch.update = () => {
    if (stats) {
        stats.end();
        stats.begin();
    }

    let height = ctx.height;
    let width = ctx.width;

    let mouse = ctx.mouse;
    let m1 = {
        x: (mouse.ox - width / 2) / height * 2,
        y: (mouse.oy - height / 2) / height * 2
    };
    let m2 = {
        x: (mouse.x - width / 2) / height * 2,
        y: (mouse.y - height / 2) / height * 2
    };
    let v = {
        x: (mouse.dx) / height * 2,
        y: (mouse.dy) / height * 2
    };
    // console.log(v);

    for (let i = 0; i < numParticles; i += 2)
    {
        let pos = {
            x: positions[i],
            y: positions[i+1]
        };
        if (distToSegmentSquared(pos, m1, m2) < 0.1 * 0.1)
        {
            // console.log('hello');
            velocities[i] += v.x * 300;
            velocities[i+1] += v.y * 300;
        }

        if (flow) {
            let aspect = flow.numX / flow.numY;
            let fx = round(map(pos.x, -1 * aspect, 1 * aspect, flow.numX, 0));
            let fy = round(map(pos.y, -1, 1, 0, flow.numY));
            if (0 <= fx && fx < flow.numX && 0 <= fy && fy < flow.numY)
            {
                let index = (fy * flow.numX + fx) * 2;
                let u = -flow.uvArray[index];
                let v = flow.uvArray[index+1];
                velocities[i] += u * 1;
                velocities[i+1] += v * 1;
            }
        }
    }

    world.Step(1 / 60 / 60, velocityIterations, positionIterations);
}

sketch.draw = () => {
    let dpr = window.devicePixelRatio || 1;
    let height = ctx.height * dpr;
    let width = ctx.width * dpr;

    ctx.setTransform(height / 2, 1, 1, height / 2, width/2, height/2);

    ctx.fillStyle = '#AAA';

    for (let i = 0; i < numParticles; i += 2)
    {
        let x = positions[i];
        let y = positions[i+1];
        let vx = velocities[i];
        let vy = velocities[i+1];
        let v = sqrt(vx*vx + vy*vy);
        v = map(v, 0, 200, 0, 1);

        let r, g, b;
        let a = 0.7;
        if (flow)
        {
            let aspect = flow.numX / flow.numY;
            let ix = floor(map(x, -1 * aspect, 1 * aspect, flow.width, 0));
            ix = min(flow.width-1, max(0, ix));
            let iy = floor(map(y, -1, 1, 0, flow.height));
            iy = min(flow.height-1, max(0, iy));
            let address = (flow.width * iy + ix) * 4;

            r = flow.image[address];
            g = flow.image[address+1];
            b = flow.image[address+2];

            let lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            let m = max(10, lum) / lum;

            let rgv = pow(v, 0.3);
            let bv = pow(v, 0.5);

            r = floor(min(255, r * m * rgv));
            g = floor(min(255, g * m * rgv));
            b = floor(min(255, b * m * bv));
        }
        else
        {
            r = floor(pow(v, 0.3) * 255);
            g = r;
            b = floor(pow(v, 0.5) * 255);
        }

        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

        let rad = map(pow(v, 0.7), 0, 1, 0.001, 0.045);

        ctx.beginPath();
        ctx.arc(x, y, rad, 0, TWO_PI);
        ctx.fill();
    }

    // if (flow) {
    //     let index = 0;

    //     let h = 2 / flow.numY;
    //     let w = h;

    //     for (let j = 0; j < flow.numY; j++)
    //     {
    //         for (let i = 0; i < flow.numX; i++)
    //         {
    //             let u = flow.uvArray[index++];
    //             u = map(u, -flow.winStep, flow.winStep, 0, 1);
    //             let v = flow.uvArray[index++];
    //             v = map(v, -flow.winStep, flow.winStep, 0, 1);

    //             let r = floor(u * 255);
    //             let g = floor(v * 255);
    //             let b = 0;

    //             let x = map(i, 0, flow.numX, 1.5, -1.5);
    //             let y = map(j, 0, flow.numY, -1.0, 1.0);

    //             ctx.fillStyle = 'rgba(' + r + ', ' + g + ',' + b + ',' + 0.2 + ')';
    //             ctx.fillRect(x, y, w, h);
    //         }
    //     }
    // }
}

sketch.touchstart = (event) => {
    event.preventDefault();
}
