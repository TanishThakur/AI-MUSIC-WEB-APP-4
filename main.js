song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload()
{
    song1 = loadSound("music.mp3")
    song2 = loadsound("music2.mp3")
}

function setup() 
{
    canvas = createCanvas(600,500);
    canvas.center();

    video  = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on( 'pose' , gotPoses)
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log("results");
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist ="+ scoreLeftWrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log( "leftWristX = " + leftWristX + "leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log( "rightWristX = " + rightWristX + "rightWristY =" + rightWristY);
    }

}

function modelLoaded()  
{
    console.log('PoseNet Is Initialized');
}


function draw()
{
    image(video,0,0,600,500);

    fill("#8acfc2");
    stroke("#8acfc2");

    if(scoreLeftWrist > 0.2) 
    {
    circle(leftWristX,leftWristY,20); 
    song1.stop();

    if(song2_status == false) 
    {
    song2.play(); 
    document.getElementById("song").innerHTML = "Playing - Peter Pan Song" 
    } 
    }
}