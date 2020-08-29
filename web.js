
AppClient.random = function(){
  if(arguments.length > 0) return Math.floor(Math.random()*arguments[0]);
  return Math.random();
}


if(typeof window.addEventListener == "function") {
  window.addEventListener("message", function(event){
    console.log("Hello World33"+event);
  }, false);
}

////////////////////////////////////////////////////////////////////////////////
// set app loaded trigger, so we can inform the frame platform when ready
////////////////////////////////////////////////////////////////////////////////
function setReadyTrigger(){
  console.log("Hello World3");
  androidApp.appDone();
  if(!AppClientConnection || AppClientConnection.client.registered != true) {
    setTimeout(setReadyTrigger,100);
    return;
  }
  AppClient.postMessage("AppReady");
  AppClient.postMessage("AppTool|"+AppClient.Tool);
  AppClient.postMessage("AppTask|"+AppClient.Task);
  AppClient.postMessage("AppTitle|"+AppClient.Title);
  AppClient.postMessage("AppFeedback|"+AppClient.getParameter("feedback"));
}

setTimeout(setReadyTrigger,100);

////////////////////////////////////////////////////////////////////////////////
// check if all cards are placed or used,
// very specific code based on different LearningApp templates
// might break on template changes
////////////////////////////////////////////////////////////////////////////////
var taskCompleted = false;

function setTaskCompleteTrigger (){
  if(taskCompleted) return;
  if(AppClientConnection.client.registered != true) return; // wait for AppClient to get ready

  ///////////////////////////////////////////////////////
  // Grouping task, allow check when every card is placed
  ///////////////////////////////////////////////////////
  if(AppClient.AppPath.indexOf("tools/86") > 0){
    for(i = 0; i < allCards.length; i++){
      if(allCards[i].currentCluster === null) return; // missing card
    }
    AppClient.postMessage("taskComplete");
    taskCompleted = true;
  }

  ///////////////////////////////////////////////////////
  // Pairing task, allow check when every card is connected
  ///////////////////////////////////////////////////////
  if(AppClient.AppPath.indexOf("tools/71") > 0){
    for(i = 0; i < Pair1List.length; i++){
      if(Pair1List[i].card.attached === null &&
         Pair1List[i].card.attachedTo === null) return; // missing card
    }
    AppClient.postMessage("taskComplete");
    taskCompleted = true;
  }

  ///////////////////////////////////////////////////////
  // Timeline, allow check when every card is placed
  ///////////////////////////////////////////////////////
  if(AppClient.AppPath.indexOf("tools/72") > 0){
    for(i = 0; i < Cards.length; i++){
      if(Cards[i].card.currentValue === null) return; // missing card
    }
    AppClient.postMessage("taskComplete");
    taskCompleted = true;
  }

  ///////////////////////////////////////////////////////
  // Order template, all cards are already on the table
  ///////////////////////////////////////////////////////
  if(AppClient.AppPath.indexOf("tools/70") > 0){
    AppClient.postMessage("taskComplete");
    taskCompleted = true;
  }
}

setInterval(setTaskCompleteTrigger,500);

////////////////////////////////////////////////////////////////////////////////

;(function ($, window, document, undefined) {

  var $body = $('body'),

  // Number of different background images
  bgImagesNum = 3;

  // initialize
  var init = function init() {
    // update styling hook (portrait/landscape) update when resized
    $(window).resize(updateScreenMode);
    updateScreenMode();
    // randomly choose a background image
    $body.addClass('bg-' + Math.ceil(Math.random() * bgImagesNum));
  };

  // Add styling hook for portrait/landscape mode
  var updateScreenMode = function updateScreenMode() {
    if ($body.width() >= $body.height()) {
      $body.removeClass('portrait');
      $body.addClass('landscape');
    } else {
      $body.removeClass('landscape');
      $body.addClass('portrait');
    }
  };

  init();
})(jQuery, window, document);
