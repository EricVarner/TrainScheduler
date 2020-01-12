
  var firebaseConfig = {
    apiKey: "AIzaSyCuk3aRo9ZBJrkbjkfukpff7UCKZpPGTDI",
    authDomain: "trainapp-c5368.firebaseapp.com",
    databaseURL: "https://trainapp-c5368.firebaseio.com",
    projectId: "trainapp-c5368",
    storageBucket: "trainapp-c5368.appspot.com",
    messagingSenderId: "378463863790",
    appId: "1:378463863790:web:07e8a3cccd308205fec4ff"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#Train-Name-input").val().trim();
  var trainDest = $("#Destination-input").val().trim();
  var trainStart = moment($("#FirstTrain-input").val().trim(), "hh:mm").format("X");
  var trainFreq = $("#Freq-input").val().trim();
console.log("train Start"+trainStart);
  // Creates local "temporary" object for holding Train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    start: trainStart,
    freq: trainFreq
  };

  // Uploads Train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log("start time"+ newTrain.start);
  console.log("freq" + newTrain.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#Train-Name-input").val("");
  $("#Train-input").val("");
  $("#Start-input").val("");
  $("#Freq-input").val("");
});

// 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log("train start"+trainStart);
  console.log(trainFreq);

  // Prettify the Train start
  var trainStartPretty = moment.unix(trainStart).format("hh:mm");
console.log("trainstartpretty"+trainStartPretty);
  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMonths = moment().diff(moment(trainStart, "X"), "months");
  console.log("months "+trainMonths);

  // Calculate the total billed rate
  var trainBilled = trainMonths * trainFreq;
  console.log("train billed " +trainBilled);
  var firstTimeConverted = moment(trainStartPretty, "HH:mm").subtract(1, "years");
  console.log("firsttimeconverted " + firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFreq;
  console.log("tremainder="+tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainStartPretty),
    // $("<td>").text(trainMonths),
    $("<td>").text(trainFreq),
    $("<td>").text(moment(nextTrain).format("hh:mm")),
    $("<td>").text(tMinutesTillTrain)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log("firsttimeconverted " + firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log("tremainder="+tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

