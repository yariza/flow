import Sketch from './sketch';
import Stats from 'stats-js';

import webcamFlow from './oflow/webcamFlow';
console.log(webcamFlow);

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
    }

    world.Step(1 / 60 / 60, velocityIterations, positionIterations);
}

sketch.draw = () => {
    let height = ctx.height;
    let width = ctx.width;

    ctx.setTransform(height, 1, 1, height, width, height);

    ctx.fillStyle = '#AAA';
    
    for (let i = 0; i < numParticles; i += 2)
    {
        let x = positions[i];
        let y = positions[i+1];
        let vx = velocities[i];
        let vy = velocities[i+1];
        let v = sqrt(vx*vx + vy*vy);
        v = map(v, 0, 200, 0, 1);
        let r = floor(pow(v, 0.3) * 255);
        let g = r;
        let b = floor(pow(v, 0.5) * 255);
        let a = 0.7;
        // r = g = b = 255;
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

        let rad = map(pow(v, 1), 0, 1, 0.001, 0.035);
        
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, TWO_PI);
        ctx.fill();
    }
}

sketch.touchstart = (event) => {
    event.preventDefault();
}
