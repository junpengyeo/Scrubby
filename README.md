# Scrubby
Scrubby is an educational tool to teach children how to wash their hands well, at the same time encouraging this good habit to be carried out in the long run. 

All this will be done through a game with seven different levels to pass, each step allowing you to have progress in your level. A progress indicator will be present, corresponding to the steps. For instance, after completing the first step, the progress indicator will indicate so and you can move on to step two, in each circle, there will be graphics illustrated to prompt the kids on which action they should be completing. 

<h2> How Scrubby was Built </h2>
<p> Handpose by mediapipe and ml5 neural network were utilised in order to achieve high accuracy in tracking a user’s hand and finger movements.</p>

Videos of the 7 different handwashing steps was captured and fed into the hand pose model to generate a skeletal output of the hands. These captured video data (63 points on the hands) are collected, normalized (to allow the model to recognise variations in hand sizes) and fed into a Scrubby’s neural network. The model was trained for 1000 epochs till an error rate of ~0.0001 before deploying it for use in the app.

As a result, 3 separate p5js sketch files had to be drawn up to allow us to fully create Scrubby. 
<ul>
  <a href="https://editor.p5js.org/junpeng/sketches/TA-lOsAR-"><li>Data Collection</li></a>
  <a href="https://editor.p5js.org/junpeng/sketches/uswpH84ru"><li>Model Training</li></a>
  <a href="https://editor.p5js.org/junpeng/sketches/EiVEIsTeH"><li>Scrubby App</li></a>
</ul>


<h2>Scrubby Interface</h2>
<p float="left">
  <img src="images/homescreen.jpg" alt="home" width="250">
  <img src="images/hand1.jpg" alt="hand1" width="250"> 
  <img src="images/hand2.jpg" alt="hand2" width="250">
  In the final version, bacterias are superimposed onto the users hands for a visual feedback.
</p>
