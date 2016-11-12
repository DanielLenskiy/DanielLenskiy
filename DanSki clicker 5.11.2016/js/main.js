// Basic variable declaration - keep track of how many of each
// item we currently own, and how much the new ones should cost.
var numWheels = 0;
var WheelPS = 0;
var numWoodWheel = 0;
var numRubberWheels = 0;
var numHitechWheels = 0;
var numNeytonWheels = 0;
var WoodWheelCost = 10;
var RubberWheelCost = 50;
var HitechWheelCost = 250;
var NeytonWheelCost = 1250;

updateScreen();

var rotation = 0;

jQuery.fn.rotate = function(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};


// Increase numWheels every time produce-wheel is clicked
$('#produce-wheel').on('click', function () {
    numWheels++;
    updateScreen();
});

$('#produce-wheel').on('mousewheel', function(event) {
   numWheels++;
    rotation += 5;
    $(this).rotate(rotation);
});

// Same for wood-wheel
$('#wood-wheel').on('click', function () {
    numWoodWheel++;

    // Deduct cost
    numWheels -= WoodWheelCost;

    // Increase cost for the next one, using Math.ceil() to round up
    WoodWheelCost = Math.ceil(WoodWheelCost * 1.1);

    calcWidget();
});

$('#rubber-wheel').on('click', function () {
    numRubberWheels++;
    numWheels -= RubberWheelCost;
    RubberWheelCost = Math.ceil(RubberWheelCost * 1.1);
    calcWidget();
});

$('#hitech-wheel').on('click', function () {
    numHitechWheels++;
    numWheels -= HitechWheelCost;
    HitechWheelCost = Math.ceil(HitechWheelCost * 1.1);
    calcWidget();
});

// Ditto for neytron-wheel... you get the idea
$('#neytron-wheel').on('click', function () {
    numNeytonWheels++;
    numWheels -= NeytonWheelCost;
    NeytonWheelCost = Math.ceil(NeytonWheelCost * 1.1);
    calcWidget();
});

$('#wood-training').on('click', function () {
    numWoodWheel-=5;
    numRubberWheels++;
    calcWidget();
});

$('#rubber-training').on('click', function () {
    numRubberWheels-=5;
    numHitechWheels++;
    calcWidget();
});

$('#hitech-training').on('click', function () {
    numHitechWheels-=5;
    numNeytonWheels++;
    calcWidget();
});

function updateScreen () {
    // Update the text showing how many widgets we have, using Math.floor() to round down
    $('#wheel-count').text(Math.floor(numWheels));
    $('#wheel-ps').text(WheelPS);

    // Enable/disable Upgrade Buttons
    $('#wood-training').prop('disabled', numWoodWheel < 5);
    $('#rubber-training').prop('disabled', numRubberWheels < 5);
    $('#hitech-training').prop('disabled', numHitechWheels < 5);

    // Update the widgeteers with their current prices
    $('#wood-wheel').text('Hire Wood Wheel - ' + WoodWheelCost);
    $('#rubber-wheel').text('Hire Rubber Wheel - ' + RubberWheelCost);
    $('#hitech-wheel').text('Hire Hitech Wheel - ' + HitechWheelCost);
    $('#neytron-wheel').text('Hire Neytron Wheel - ' + NeytonWheelCost);

    // Enable/disable the wheel buttons based on our numWheels
    $('#wood-wheel').prop('disabled', WoodWheelCost > numWheels);
    $('#rubber-wheel').prop('disabled', RubberWheelCost > numWheels);
    $('#hitech-wheel').prop('disabled', HitechWheelCost > numWheels);
    $('#neytron-wheel').prop('disabled', NeytonWheelCost > numWheels);

    $('#wood-count').text(numWoodWheel);
    $('#rubber-count').text(numRubberWheels);
    $('#hitech-count').text(numHitechWheels);
    $('#neytron-count').text(numNeytonWheels);

}

function calcWidget () {
    WheelPS = numWoodWheel * 1;
    WheelPS += (numRubberWheels * 2.5);
    WheelPS += (numHitechWheels * 6);
    WheelPS += (numNeytonWheels * 15);
    updateScreen();
}

// Run UI update code every 10ms
window.setInterval(function () {

    numWheels += WheelPS;

    updateScreen();
}, 1000);
