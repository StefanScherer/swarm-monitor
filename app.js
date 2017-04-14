'use strict';

const Blinkt = require('node-blinkt');
const monitor = require('node-docker-monitor');

const leds = new Blinkt();

const image = 'stefanscherer/whoami';
var containers = [];

const shutdown = function () {
  console.log('Turning off lights.');

  leds.setAllPixels(0, 0, 0, 0);
  leds.sendUpdate();
  leds.sendUpdate();

  /* eslint-disable no-process-exit */
  process.nextTick(() => {
    console.log('Terminating process.');
    process.exit(0);
  });
  /* eslint-enable no-process-exit */
};

const init = function () {
  leds.setup();
  leds.clearAll();

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  console.log('Initialized.');
};

init();

const color = function (container) {
  container.animation++;

  if (container.mode === 'up') {
    if (container.animation > 10) {
      container.mode = 'running';
    }
    return [ 0, 255, 0, container.animation * 0.08 ];
  } else if (container.mode === 'down') {
    if (container.animation > 10) {
      container.mode = 'remove';
    }
    return [ 255, 0, 0, (11 - container.animation) * 0.08 ];
  } else {
    if (container.Image.startsWith(image+':1.1')) {
      return [ 255, 255, 0, 0.1 ];
    } else if (container.Image.startsWith(image+':1.2')) {
      return [ 0, 255, 255, 0.1 ];
    } else {
      return [ 255, 255, 255, 0.1 ];
    }
  }
};

setInterval(() => {
  leds.setAllPixels(0, 0, 0, 0);
  var i = 7;
  containers.forEach ((container) => {
    var col = color(container);
    if (i > -1) {
      leds.setPixel(i--, col[0], col[1], col[2], col[3]);
    }
  });

  leds.sendUpdate();

  containers = containers.filter((item) => {
    return (item.mode !== 'remove');
  });

}, 1000 / 30);

monitor({
  onContainerUp: function(container) {
    container.mode = 'up';
    container.animation = 0;
    console.log('up', container);
    if (container.Image.startsWith(image)) {
      containers.push(container);
    }
  },
  onContainerDown: function(container) {
    container.mode = 'down';
    container.animation = 0;
    console.log('down', container);
    const found = containers.find((item) => {
      return (item.Id === container.Id);
    });
    // if (found) {
    //   found.mode = 'down';
    //   found.animation = 0;
    // }
  }
});
