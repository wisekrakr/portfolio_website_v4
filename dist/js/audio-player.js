let audio;

//Initializer - Play First Song
initAudio($("#playlist li:first-child"));

function initAudio(element) {
  let song = element.attr("song");
  let title = element.attr("title");
  let cover = element.attr("cover");
  let artist = element.attr("artist");

  // Create the Audio
  audio = new Audio(song);

  if (!audio.currentTime) {
    $("#duration").html("0.00");
  }

  $("#audio-player .title").text(title);
  $("#audio-player .artist").text(artist);

  //Create cover image
  $("img.cover").attr("src", cover);

  $("#playlist li").removeClass("active");
  element.addClass("active");

  audio.volume = document.getElementById("volume").value / 10;
}

//Hide Pause
$("#pause").hide();

//Play Button
$("#play").click(function() {
  audio.play();
  $("#play").hide();
  $("#pause").show();
  $("#duration").fadeIn(400);
  showDuration();
});

//Pause Button
$("#pause").click(function() {
  audio.pause();
  $("#pause").hide();
  $("#play").show();
});

//Stop Button
$("#stop").click(function() {
  audio.pause();
  audio.currentTime = 0;
  $("#pause").hide();
  $("#play").show();
  $("#duration").fadeOut(400);
});

//Next Button
$("#next").click(function() {
  audio.pause();
  let next = $("#playlist li.active").next();

  if (next.length == 0) {
    next = $("#playlist li:first-child");
  }

  initAudio(next);
  audio.play();
  showDuration();
});

//Previous Button
$("#prev").click(function() {
  audio.pause();

  let prev = $("#playlist li.active").prev();

  if (prev.length == 0) {
    prev = $("#playlist li:last-child");
  }

  initAudio(prev);
  audio.play();
  showDuration();
});

//Click Song to play
$("#playlist li").click(function() {
  audio.pause();
  if (typeof audio !== "undefined") audio.src = $(this).attr("song");

  audio.play();

  $("#play").hide();
  $("#pause").show();
  $("#duration").fadeIn(400);
  showDuration();

  $("#playlist li").removeClass("active");
  $(this).addClass("active");

  $("#audio-player .title").text($(this).attr("title"));
  $("#audio-player .artist").text($(this).attr("artist"));

  //Create cover image
  $("img.cover").attr("src", $(this).attr("cover"));

  audio.volume = parseFloat(localStorage.getItem("volume"));
});

//Click to skip into song
document.getElementById("progressbar").addEventListener("click", function(e) {
  let percent = (e.offsetX / this.offsetWidth) * 1.65;
  audio.currentTime = percent * audio.duration;
  document.getElementById("progressbar").value = percent / 100;
});

function setVolume() {
  audio.volume = document.getElementById("volume").value / 10;
  localStorage.setItem("volume", audio.volume); // you change your volume setting
}

//Duration
function showDuration() {
  $(audio).bind("timeupdate", function() {
    //Get hours and minutes
    let secs = parseInt(audio.currentTime % 60);
    let mins = parseInt(audio.currentTime / 60) % 60;

    //Add 0 if less than 10
    if (secs < 10) {
      secs = "0" + secs;
    }

    $("#duration").html(mins + "." + secs);

    let value = 0;

    if (audio.currentTime > 0) {
      value = Math.floor((100 / audio.duration) * audio.currentTime) / 2;
    }

    //Set the progress bar
    $("#progress").css("width", value + "%");
  });
}

// When  page is loaded restore your volume to it's save value
window.onload = function() {
  if (localStorage.getItem("volume") != null) {
    audio.volume = parseFloat(localStorage.getItem("volume")); // you restore your volume setting to your save volume
  }
};
