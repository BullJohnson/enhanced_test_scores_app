
//arrays could also be initialized empty, to start clean
let namesArr = ['Ben', 'Joel', 'Judy', 'Anne'];
let scoresArr = [88, 98, 77, 88];

function getAvgScore() {
    let i = 0,
        sum = 0,
        len = scoresArr.length;
    let name = '';
    for (i; i < len; i++) {
        sum += scoresArr[i];
    }
    return sum / len;
}

function getHighScore() {
    let i = 0,
        max = 0,
        len = scoresArr.length;
    let name = '';
    for (i; i < len; i++) {
        if (scoresArr[i] > max) {
            max = scoresArr[i];
            name = namesArr[i];
        }
    }
    return name + ' with score of ' + max;
}

function initializeResults() {
    let results = $('#results');
    let high = getHighScore();
    let avg = getAvgScore().toFixed(1);
    $('#highScore').html(high);
    $('#avgScore').html(avg);
}


function displayScores() {
    let scores = $("#scores");
    scores.toggle();
    $("#name").focus();
}

function displayResults() {
    let results = $('#results');
    results.toggle();
    $("#name").focus();
}

function insertNewTableElement(newName, newScore) {
   $("#name").focus();
}

function initializeScoresTable() {
$("#scores_table tr").slice(1).remove();
for (let i = 0; i < scoresArr.length; i++) {
    insertNewTableElement($("#scores_table tr:last").after("<tr><td>" + 
    namesArr[i] + "</td><td>" + scoresArr[i] + "</td></tr>"));
    }
}

//removes any previous error messages, before validation process restarts
function resetSpans() {
    $("#name_span").text("");
    $("#score_span").text("");
};

function addScore() {
    resetSpans();
    let isValid = true;             //boolean variable to indicate if input error has occured
    let score = $('#score');
    let name = $('#name');
    let pattern = /[^A-Za-z ]/;     //test pattern to determin alphabetic response (including space)
    if (name.val() === "" || pattern.test(name.val())) {    //no response or test pattern failed
        if (name.val() === ''){
            $("#name_span").text(" Required");
        } else {
            $("#name_span").text(" Invalid");
        }
        isValid = false;
        name.focus();
    }
    //if no score entered or entry not a number or entry less than zero
    if (score.val() === "" || isNaN(score.val()) || 0 > parseInt(score.val())) {
        if (isNaN(score.val()) || 0 > parseInt(score.val())) {
            $("#score_span").text(" Invalid");
        } else {
            $("#score_span").text(" Required");
        }
        if (isValid == true) {
            score.focus();
        }
        isValid = false;
    }   
    
    //end function execution, if a response is invalid (event listener will restart upon click)
    if (isValid == false) {
        return;
    }
    scoresArr.push(parseInt(score.val()));
    namesArr.push($("#name").val());
    initializeScoresTable();
    score.val('');
    name.val('');
    initializeResults();
    $('#scores').show();
    $('#results').show();
}

window.onload = function () {
    $('#display_results').on('click',  function() {
        displayResults();
    });

    $('#display_scores').on('click',  function() {
        displayScores();
    });
    $('#add').on('click',  function() {
        addScore();
    });

    let name = $('#name');
    let score = $('#score');

    name.focus();
    initializeResults();
    initializeScoresTable();
}