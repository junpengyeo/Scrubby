let video;
let model;
let predictions = [];
let image_filelist = ['images/Germs-01.png', 'images/Germs-03.png', 'images/Germs-05.png', 'images/Germs-11.png', 'images/Germs-13.png', 'images/Germs-16.png', 'images/Germs-21.png'];
let imagelist = [];
var capture;
let frame = 0;
let count = 0;
let brain;
let end = 0;

function preload() {
  // load in the graphic and sound assets of the app
  for (let filename of image_filelist) {
    imagelist.push(loadImage(filename));
  }

  hand1 = loadAnimation('images/hand1/hand1.1.png', 'images/hand1/hand1.2.png', 'images/hand1/hand1.3.png', 'images/hand1/hand1.4.png', 'images/hand1/hand1.5.png', 'images/hand1/hand1.6.png', 'images/hand1/hand1.7.png', 'images/hand1/hand1.8.png', 'images/hand1/hand1.9.png', 'images/hand1/hand1.10.png');
  hand1.playing = false;

  hand2 = loadAnimation('images/hand2/hand2.1.png', 'images/hand2/hand2.2.png', 'images/hand2/hand2.3.png', 'images/hand2/hand2.4.png', 'images/hand2/hand2.5.png', 'images/hand2/hand2.6.png', 'images/hand2/hand2.7.png', 'images/hand2/hand2.8.png', 'images/hand2/hand2.9.png');
  hand2.playing = false;

  hand3 = loadAnimation('images/hand3/hand3.1.png', 'images/hand3/hand3.2.png', 'images/hand3/hand3.3.png', 'images/hand3/hand3.4.png', 'images/hand3/hand3.5.png', 'images/hand3/hand3.6.png', 'images/hand3/hand3.7.png', 'images/hand3/hand3.8.png', 'images/hand3/hand3.9.png');
  hand3.playing = false;

  hand4 = loadAnimation('images/hand4/hand4.1.png', 'images/hand4/hand4.2.png', 'images/hand4/hand4.3.png', 'images/hand4/hand4.4.png', 'images/hand4/hand4.5.png', 'images/hand4/hand4.6.png', 'images/hand4/hand4.7.png', 'images/hand4/hand4.8.png', 'images/hand4/hand4.9.png');
  hand4.playing = false;

  hand5 = loadAnimation('images/hand5/hand5.1.png', 'images/hand5/hand5.2.png', 'images/hand5/hand5.3.png', 'images/hand5/hand5.4.png', 'images/hand5/hand5.5.png', 'images/hand5/hand5.6.png', 'images/hand5/hand5.7.png', 'images/hand5/hand5.8.png', 'images/hand5/hand5.9.png');
  hand5.playing = false;

  hand6 = loadAnimation('images/hand6/hand6.1.png', 'images/hand6/hand6.2.png', 'images/hand6/hand6.3.png', 'images/hand6/hand6.4.png', 'images/hand6/hand6.5.png', 'images/hand6/hand6.6.png', 'images/hand6/hand6.7.png', 'images/hand6/hand6.8.png', 'images/hand6/hand6.9.png');
  hand6.playing = false;

  hand7 = loadAnimation('images/hand7/hand7.1.png', 'images/hand7/hand7.2.png', 'images/hand7/hand7.3.png', 'images/hand7/hand7.4.png', 'images/hand7/hand7.5.png', 'images/hand7/hand7.6.png', 'images/hand7/hand7.7.png', 'images/hand7/hand7.8.png', 'images/hand7/hand7.9.png', 'images/hand7/hand7.10.png', 'images/hand7/hand7.11.png');
  hand7.playing = false;

  var constraints = {
    audio: false,
    video: {
      facingMode: "environment"
    }
  };
  video = createCapture(constraints, () => {
    loadHandTrackingModel();
  });
  video.hide();

  song = loadSound('images/magicsound.mp3');
  song2 = loadSound('images/congratulations.mp3');
}

function windowResized() {
  // keep a 16:9 portrait format
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowHeight);
  } else {
    resizeCanvas((windowHeight / 1.3) * 0.5625, windowHeight / 1.38);
  }
}

function setup() {
  // keep a 16:9 portrait format
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas((windowHeight / 1.3) * 0.5625, windowHeight / 1.38);
  }

  // Scale and position the handwashing icons

  spr7 = createSprite(width / 2, height / 2);
  spr7.addAnimation("default", hand7);
  spr7.scale = 0.3;
  spr7.position.x = width / 2;
  spr7.position.y = height / 2;

  spr6 = createSprite(width / 2, height / 2);
  spr6.addAnimation("default", hand6);
  spr6.scale = 0.3;
  spr6.position.x = width / 2;
  spr6.position.y = height / 2;

  spr5 = createSprite(width / 2, height / 2);
  spr5.addAnimation("default", hand5);
  spr5.scale = 0.3;
  spr5.position.x = width / 2;
  spr5.position.y = height / 2;

  spr4 = createSprite(width / 2, height / 2);
  spr4.addAnimation("default", hand4);
  spr4.scale = 0.3;
  spr4.position.x = width / 2;
  spr4.position.y = height / 2;

  spr3 = createSprite(width / 2, height / 2);
  spr3.addAnimation("default", hand3);
  spr3.scale = 0.3;
  spr3.position.x = width / 2;
  spr3.position.y = height / 2;

  spr2 = createSprite(width / 2, height / 2);
  spr2.addAnimation("default", hand2);
  spr2.scale = 0.3;
  spr2.position.x = width / 2;
  spr2.position.y = height / 2;

  spr1 = createSprite(width / 2, height / 2);
  spr1.addAnimation("default", hand1);
  spr1.scale = 0.3;
  spr1.position.x = width / 2;
  spr1.position.y = height / 2;

}

async function loadHandTrackingModel() {
  // Load the MediaPipe handpose model.
  model = await handpose.load();
  predictHand();
  let options = {
    inputs: 63,
    outputs: 7,
    task: 'classification',
    debug: true
  }
  // Load and read the handson trained model/neural network
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  let modelJson = await fetch(modelInfo.model);
  modelJson = await modelJson.text();
  const modelJsonFile = new File([modelJson], 'model.json', {
    type: 'application/json'
  });
  let weightsBlob = await fetch(modelInfo.weights);
  weightsBlob = await weightsBlob.blob();
  const weightsBlobFile = new File([weightsBlob], 'model.weights.bin', {
    type: 'application/macbinary',
  });

  brain = await tf.loadLayersModel(tf.io.browserFiles([modelJsonFile, weightsBlobFile]));
  brainLoaded();
}

function brainLoaded() {
  console.log('Hand pose classification ready!');
  classifyPose();
}

async function classifyPose() {
  if (predictions.length > 0) {
    const landmarks = predictions[0].landmarks;
    let inputs = [];
    for (let i = 0; i < landmarks.length; i++) {
      inputs.push(landmarks[i][0] / 640);
      inputs.push(landmarks[i][1] / 480);
      inputs.push((landmarks[i][2] + 80) / 80);
    }
    const output = tf.tidy(() => {
      return brain.predict(tf.tensor(inputs, [1, 63]));
    });
    const result = await output.array();
    gotResult(result);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(results) {
  console.log('1 = ' + results[0][0]);
  console.log('2 = ' + results[0][1]);
  console.log('3 = ' + results[0][2]);
  console.log('4 = ' + results[0][3]);
  console.log('5 = ' + results[0][4]);
  console.log('6 = ' + results[0][5]);
  console.log('7 = ' + results[0][6]);

  if (results[0] && results[0][0]) {
    if (results[0][0] > 0.0001) {
      hand1();
    }
    if (results[0][1] > 0.001) {
      hand2();
    }
    if (results[0][2] > 0.5) {
      hand3();
    }
    if (results[0][3] > 0.0001) {
      hand4();
    }
    if (results[0][4] > 0.98) {
      hand5();
    }
    if (results[0][5] > 0.0001) {
      hand6();
    }
    if (results[0][6] > 0.0001) {
      hand7();
    }
  }

  function hand1() {
    if (count % 20 == 0) {
      if (spr1.animation.getFrame() < (spr1.animation.getLastFrame() - 1)) {
        spr1.animation.nextFrame();
      } else {
        if (spr1.removed == false) {
          spr1.remove();
          song.play();
        }
      }
    }
  }

  function hand2() {
    if (count % 20 == 0 && spr1.removed) {
      if (spr2.animation.getFrame() < (spr2.animation.getLastFrame() - 1)) {
        spr2.animation.nextFrame();
      } else {
        if (spr2.removed == false) {
          spr2.remove();
          song.play();
        }
      }
    }
  }

  function hand3() {
    if (count % 20 == 0 && spr2.removed) {
      if (spr3.animation.getFrame() < (spr3.animation.getLastFrame() - 1)) {
        spr3.animation.nextFrame();
      } else {
        if (spr3.removed == false) {
          spr3.remove();
          song.play();
        }
      }
    }
  }

  function hand4() {
    if (count % 20 == 0 && spr3.removed) {
      if (spr4.animation.getFrame() < (spr4.animation.getLastFrame() - 1)) {
        spr4.animation.nextFrame();
      } else {
        if (spr4.removed == false) {
          spr4.remove();
          song.play();
        }
      }
    }
  }

  function hand5() {
    if (count % 20 == 0 && spr4.removed) {
      if (spr5.animation.getFrame() < (spr5.animation.getLastFrame() - 1)) {
        spr5.animation.nextFrame();
      } else {
        if (spr5.removed == false) {
          spr5.remove();
          song.play();
        }
      }
    }
  }

  function hand6() {
    if (count % 20 == 0 && spr5.removed) {
      if (spr6.animation.getFrame() < (spr6.animation.getLastFrame() - 1)) {
        spr6.animation.nextFrame();
      } else {
        if (spr6.removed == false) {
          spr6.remove();
          song.play();
        }
      }
    }
  }

  function hand7() {
    if (count % 20 == 0 && spr6.removed) {
      if (spr7.animation.getFrame() < (spr7.animation.getLastFrame() - 2)) {
        spr7.animation.nextFrame();
      } else {
        if (end == 0) {
          spr7.animation.nextFrame();
          song2.play();
          end = 1;
        }
      }
    }
  }

  classifyPose();
}

function modelLoaded() {
  console.log('Hand pose model ready');
}

function draw() {
  background(255, 247, 218);
  if (model) {
    if (end == 0) {
      image(video, 0, 0);
    }
  }
  if (predictions.length > 0) {
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    drawSkeleton();
    count++;
  }
  drawSprites();
}

async function predictHand() {
  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
  // hand prediction from the MediaPipe graph.
  predictions = await model.estimateHands(video.elt);
  setTimeout(() => predictHand(), 200);
}

//function that draws out bacteria
function drawKeypoints() {
  let prediction = predictions[0];
  for (let j = 0; j < prediction.landmarks.length; j++) {
    let keypoint = prediction.landmarks[j];
    noStroke();
    imageMode(CENTER);
    if (j == 0) {
      image(imagelist[0], keypoint[0], keypoint[1], 80, 80);
    } else if (j == 3) {
      image(imagelist[1], keypoint[0], keypoint[1], 80, 80);
    } else if (j == 6) {
      image(imagelist[2], keypoint[0], keypoint[1], 80, 80);
    } else if (j == 9) {
      image(imagelist[3], keypoint[0], keypoint[1], 80, 80);
    } else if (j == 12) {
      image(imagelist[4], keypoint[0], keypoint[1], 80, 80);
    } else if (j == 15) {
      image(imagelist[5], keypoint[0], keypoint[1], 80, 80);
    } else if (j == 18) {
      image(imagelist[6], keypoint[0], keypoint[1], 80, 80);
    }
    imageMode(CORNERS);
  }
}

//function that estimates the skeletal structure of the hand from handpose
function drawSkeleton() {
  // stroke(255, 0, 0);
  let annotations = predictions[0].annotations;
  for (let j = 0; j < annotations.thumb.length - 1; j++) {
    line(annotations.thumb[j][0], annotations.thumb[j][1], annotations.thumb[j + 1][0], annotations.thumb[j + 1][1]);
  }
  for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
    line(annotations.indexFinger[j][0], annotations.indexFinger[j][1], annotations.indexFinger[j + 1][0], annotations.indexFinger[j + 1][1]);
  }
  for (let j = 0; j < annotations.middleFinger.length - 1; j++) {
    line(annotations.middleFinger[j][0], annotations.middleFinger[j][1], annotations.middleFinger[j + 1][0], annotations.middleFinger[j + 1][1]);
  }
  for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
    line(annotations.ringFinger[j][0], annotations.ringFinger[j][1], annotations.ringFinger[j + 1][0], annotations.ringFinger[j + 1][1]);
  }
  for (let j = 0; j < annotations.pinky.length - 1; j++) {
    line(annotations.pinky[j][0], annotations.pinky[j][1], annotations.pinky[j + 1][0], annotations.pinky[j + 1][1]);
  }

  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.thumb[0][0], annotations.thumb[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.indexFinger[0][0], annotations.indexFinger[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.middleFinger[0][0], annotations.middleFinger[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.ringFinger[0][0], annotations.ringFinger[0][1]);
  line(annotations.palmBase[0][0], annotations.palmBase[0][1], annotations.pinky[0][0], annotations.pinky[0][1]);

}