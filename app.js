function simon(sequence, colors, interval){
  /*
  for (var i = 0; i < interval; ++i){
    setTimeout(function(){ lighten(colors[sequence[i]]); }, 1300 * (i + 1));
  }*/
  var current = sequence.slice(0, interval);
  $.each(current, function(i){
    setTimeout(function(){
      lighten(colors[sequence[i]]);
    }, 1000 * i);
  });
}

function lighten(block){
  var sound;
  var lightColor;
  if (block === "red"){ lightColor = "#ffb3b3"; sound = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"; }
  else if(block === "green"){ lightColor = "#b3ffb3"; sound = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"; }
  else if(block === "blue"){ lightColor = "#b3b3ff"; sound = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"; }
  else if(block === "yellow") { lightColor = "#ffffb3"; sound = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"; }
  new Audio(sound).play();
  $("#" + block).css("background-color", lightColor);
  setTimeout(function(){ normalizeColor(block); }, 700);
}

function normalizeColor(block){
  var darkenColor;
  if (block === "red"){ darkenColor = "red"; }
  else if(block === "green"){ darkenColor = "green"; }
  else if(block === "blue"){ darkenColor = "blue"; }
  else if(block === "yellow") { darkenColor = "yellow"; }
  $("#" + block).css("background-color", darkenColor);
}

function initNormal(sequence){
  $("#red").show();
  $("#green").show();;
  $("#blue").show();;
  $("#yellow").show();;
  $("#counter").html("00");
  for(var i = 0; i < 20; ++i){ sequence.push(Math.floor(Math.random() * 4)); }
}

function normal(sequence, str){
  var seed = sequence[0];
  setTimeout(function(){ lighten(colors[seed]); }, 1000);
  var interval = 1;
  var numPushes = 0;
  $("#start").click(function(){ location.reload(true); });
  $("#strict").click(function(){ location.reload(true); });
  $(".pad").click(function(){
    var choice = $(this).attr("id");
    if (choice !== (colors[sequence[numPushes]])){
      alert("Loser!");
      if (str){ sequence = []; initNormal(sequence); }
        $("#counter").html(00);
        interval = 1;
        numPushes = 0;
        setTimeout(function(){ simon(sequence, colors, interval); }, 2000);
    }
    else{
      if (numPushes === 19){
        $("#red").effect("explode");
        $("#green").effect("explode");
        $("#blue").effect("explode");
        $("#yellow").effect("explode");
        $("#counter").html("WIN!");
      }
      else{
      numPushes += 1;
        if (numPushes === interval){
          setTimeout(function(){ simon(sequence, colors, interval); }, 2000);
          interval += 1;
          numPushes = 0;
          $("#counter").html(interval - 1);
        }
      }
    }
  });
}

$(document).ready(function(){
  
  
  colors = ["green", "red", "blue", "yellow"];
  
  $(".pad").mousedown(function(){
      var color = $(this).attr("id");
      lighten(color);
    });
  
  $("#start").click(function(){
    var sequence = [];
    initNormal(sequence);
    normal(sequence, false);
  });
  
  var s = [];
  $("#strict").click(function(){
    initNormal(s);
    normal(s, true);
  });
})