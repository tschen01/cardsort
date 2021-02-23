$(function() {


var player, timer, timeSpent = [], display = document.getElementById('display');

function onYouTubeIframeAPIReady() {
	player = new YT.Player( 'player', {
		events: { 'onStateChange': onPlayerStateChange }
	});
}

function onPlayerStateChange(event) {
	if(event.data === 1) { // Started playing
        if(!timeSpent.length){
            for(var i=0, l=parseInt(player.getDuration()); i<l; i++) timeSpent.push(false);
        }
	    timer = setInterval(record,100);
    } else {
		clearInterval(timer);
	}
}

function record(){
	timeSpent[ parseInt(player.getCurrentTime()) ] = true;
	showPercentage();
}

function showPercentage(){
    var percent = 0;
    for(var i=0, l=timeSpent.length; i<l; i++){
        if(timeSpent[i]) percent++;
    }
    percent = Math.round(percent / timeSpent.length * 100);
    display.innerHTML = percent + "%";
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closing")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

  var data = {};

  // var stack = ["ally","adolescent","adoptive father"];
  var stack = ["ally","adolescent","adoptive father","adoptive mother","advisor","ancestor","associate","superior","aunt","auntie",
  "aunty","babe","baby","better half","blood relatives","bosom buddy","boss","boyfriend","bride","bridegroom","bro",
  "brother","brotherly","brother-in-law","buddy","child","children","chum","clan","clansperson","classmate","close","close-knit",
  "cognate","cohort","colleague","companion","consort","couple","cousin","coworker","crony","dad","daddy","darling","daughter",
  "daughter-in-law","dear","dearest","descendant","distant relatives","elder brother","elder sister","extended family","fam","family",
  "faternal","father","father-in-law","fiancee","folk","folks","forebears","friend","friends","girlfriend","grampa","grandchild","grandchildren",
  "granddaughter","grandfather","grandma","grandmother","grandpa","grandparent","grandparents","grandson","granny","great grandfather","great grandmother",
  "great aunt","great granddaughter","great grandparents","great grandson","great uncle","guardian","guru","half brother","half sister","heir","heiress",
  "helpmate","home","honey","house","hubby","hun","husband","identical twin","in-law","in-laws","infant","inherit","inheritance","junior","juvenile","kid",
  "kids","kin","kindred","kinfolk","kinship","kinsperson","kith","love","love of my life","lovely","lover","ma","mama","manager","master","mate","maternal",
  "menage","mentor","mentee","mom","mommy","mother","mother-in-law","mum","mummy","nephew","niece","offspring","pa","pal","papa","parent","partner","paternal",
  "playmate","posterity","preteen","progenitor","progeniture","progeny","relative","relatives","roomie","roommate","schoolmate","senior","sib","sibling","siblings",
  "sidekick","sis","sister","sister-in-law","sisterhood","sisterly","son","son-in-law","soul mate","spouse","step brother","step father","step mother","step sis",
  "step sister","stepbro","stepchild","stepchildren","stepdad","step daughter","stepmom","stepparent","stepson","subordinate","supervisor","sweetheart","sweety",
  "teacher","teammate","teen","teenager","toddler","true love","tween","twin","twin brother","twin sister","uncle","well-wisher","wife","younger brother","younger sister","youth"];

  var alreadySubmitted = false;
  var num = 177;

  const cardnum = document.querySelector('#cardNumber');
  cardnum.dataset.value =  (200-num)*100/200 ;
  // document.getElementById("cardNumber").innerHTML  = (200-num)*100/200;
  init();

  function init() {
    initListeners();
    render();
    $("#year").text(new Date().getFullYear());
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  function hideBoth()  {  
    document.getElementById("cont1").style.display="inherit";  
 }

  function initListeners() {
    $(".button.submit").click(submitAll);
    $("#newGroup").click(addNewGroup);
    $(".button.add").click(addNewCard);
    $(".button.save").click(showSaveDialog);
    $(".button.open").click(showStatesDialog);
    $(".button.reset").click(resetState);
    $(".button.more").click(loadMoreCards);
    $(".popup.name .button.close").click(hideSaveDialog);
    $(".popup.states .button.close").click(hideStatesDialog);
    $(".button.instruction").click();

    $(document).on("keydown", function(event) {
      if(event.which === 27) { // esc
        hidePopups();
        hideScreenlock();
        resetAddNewCard();
      }
    });
  }

  function loadMoreCards() {
    shuffleArray(stack);
    console.log(stack.length);
    if (stack.length < 20) {
      console.log("we done");
      for(var i = 0, count = stack.length; i < count; i++) {
        var card = new Card({ text: stack[i] });
        $("#stack").append(card.$el);
      }
      if (stack.length > 0) {
        console.log("in");
        stack.splice(0,stack.length);
      }

    }
    else {
      for(var i = 0, count = 20; i < count; i++) {
        var card = new Card({ text: stack[i] });
        $("#stack").append(card.$el);
      }
      if (stack.length > 0) {
        console.log("in");
        stack.splice(0,20);
      }
    }

    num = stack.length;
    cardnum.dataset.value =  (200-num)*100/200;
    // document.getElementById("cardNumber").innerHTML = (200-num)*100/200;

  }

  function submitAll() {
    var currState = getCurrentState();

    // console.log(currState);
    // card stack is empty
    if (currState.stack === undefined || currState.stack.length == 0) {

      if (alreadySubmitted){
        alert('Thank you for submitting!');
        $.ajax({
          url:'/submit_card/',
          type: "POST",
          datatype: "json",
          data: JSON.stringify(currState.groups),
          success:function(response){
            console.log(response);
            document.write(response);
          },
          complete:function(){},
          error:function (xhr, textStatus, thrownError){}
        });
      
      } else {
        alreadySubmitted = true;
        alert('Please go back and check if there is anymore cards you would like to add by pressing the Add more Card Button');
        hideBoth();
        console.log(currState.groups);
      }
      //  post request


    } else {
      console.log("You still got something");
      alert("You still got something left in the card stack!!!");
      // render();
    }
  }

  function showScreenlock(duration) {
    $("#screenlock").fadeIn(duration);
  }

  function hideScreenlock(duration) {
    $("#screenlock").fadeOut(duration);
  }


  function showPopup($el) {
    if(!$el.hasClass('display-none')) {
      return;
    }
    hidePopups();
    animatePopup($el, true);
  }

  function hidePopup($el) {
    animatePopup($el, false);
  }

  function hidePopups() {
    $('.popup').addClass('display-none');
  }

  function animatePopup($el, isVisible) {
    var ANIM_TIME = 100;
    var visibleCSS = {
      opacity: 1,
      top: 55
    };
    var hiddenCSS = {
      opacity: 0,
      top: 35
    };
    if(isVisible) {
      $el.removeClass("display-none");
      showScreenlock();
    } else {
      hideScreenlock();
    }
    $el.css(isVisible ? hiddenCSS : visibleCSS).animate(isVisible ? visibleCSS : hiddenCSS, ANIM_TIME, function() {
      if(!isVisible) $el.addClass("display-none");
    });

    return !isVisible;
  }

  function getSavedStates() {

    var data = JSON.parse(window.localStorage.getItem("states")) || [];
    return data || [];
    
  }

  function getSavedStateById(id) {
    var states = getSavedStates();
    var state;
    for(var i = 0, count = states.length; i < count; i++) {
      if(states[i].id.toString() === id) state = states[i];
    }
    return state;
  }

  function getCurrentState() {
    var state = {
      id: Date.now(),
      name: $('input[name="name"]').val(),
      stack: [],
      groups: [],
    };
    $("#stack div.card").each(function(index, card) {
      state.stack.push({ text: $(card).text() });
    });
    $("#groups .group").each(function(index, group) {
      var $group = $(group);
      var groupData = {
        name: $('.title', group).text(),
        cards: []
      };
      $('.card', group).each(function(index, card) {
        groupData.cards.push({ text: $(card).text() });
      });
      state.groups.push(groupData);
    });
    return state;
  };

  function showSaveDialog() {
    var $el = $(".popup.name");
    var $input = $('input', $el);
    showPopup($el);

    $input.val("").focus();

    $(document).on("keydown", function(event) {
      if(event.which === 13) { // enter
        if($input.val().trim().length === 0) {
          var beforeCSS = { 'border-color': 'white' };
          var afterCSS = { 'border-color': 'red' };
          var DURATION = 200;
          $input.closest(".popup").css(beforeCSS).animate(afterCSS, DURATION, function() {
            $(this).animate(beforeCSS, DURATION);
          });
          return;
        }
        $(document).off("keydown");
        hideSaveDialog();
        saveState();
      }
    });
  }

  function hideSaveDialog() {
    hidePopup($(".popup.name"));
  }

  function saveState() {
    var states = getSavedStates();
    var currState = getCurrentState();
    for(var i = 0, count = states.length; i < count; i++) {
      if(states[i].name === currState.name) {
        states[i] = currState;
        currState = false;
      }
    }
    // if this still exists, it's a new state
    if(currState) {
      states.push(currState);
    }

    window.localStorage.setItem("states", JSON.stringify(states));
  }

  function showStatesDialog() {
    var $el = $(".popup.states");
    var states = getSavedStates();
    $(".states", $el).empty();
    if(states.length === 0) {
      $(".states", $el).append('<p style="text-align:center;">No states saved!</p>');
    } else {
      for(var i = 0, count = states.length; i < count; i++) {
        $(".states", $el).append('<a href="#" class="button state" data-id="' + states[i].id + '">' + states[i].name);
      }
      $(".button.state").click(restoreState);
    }
    showPopup($el);
  }

  function hideStatesDialog() {
    hidePopup($(".popup.states"));
  }

  function restoreState(event) {
    $(".popup.states").addClass("display-none");
    hideScreenlock();
    data = getSavedStateById($(event.currentTarget).attr("data-id"));
    render();
  }

  function resetState(event) {
    hidePopups();
    data = {};
    render();
  }

  function render() {
    hideScreenlock(0);
    renderStateName();
    renderStack();
    renderStackInitial();
    renderGroups();
    renderGroupInitial();
  }

  function renderStateName() {
    var $el = $("#name");
    if(!data.name) {
      $el.hide();
      return;
    }
    $el.text(data.name).show();
  }

  function renderStack() {
    $("#stack div.card").remove();
    if(!data.stack) return;
    for(var i = 0, count = data.stack.length; i < count; i++) {
      var card = new Card(data.stack[i]);
      $("#stack").append(card.$el);
    }
  }

  function renderStackInitial() {
    loadMoreCards();
  }

  function renderGroups() {
    $("#groups").empty();
    if(!data.groups) return;
    for(var i = 0, count = data.groups.length; i < count; i++) {
      renderGroup(data.groups[i]);
    }
  }

  function renderGroup(data) {
    var group = new Group(data);
    $("#groups").append(group.$el);
  }

  function renderGroupInitial() {
    // initial groups
    // var initialData = ["Child", "Friend","Grandchild","Grandparent","Indirect Family","Parent","Relatives","Sibling","Sig Other","Superior","Work"];
    
    var initialData = ["Stranger", "Friend","Acquaintance","Best friend","Lover","Extended Family","Supervisor"," Co-worker (peer)","Subordinate","Family"];
    // for loop and add it into the data.groups
    for(var i = 0, count = initialData.length; i < count; i++) {
      var data  = { name: initialData[i], cards: [] };
      var group = new Group(data);
      $("#groups").append(group.$el);
    }
  }

  function resetAddNewCard() {
    var $el = $(".card.button.add");
    $("span", $el).removeClass("display-none");
    $("span.input", $el).addClass("display-none");
    $("textarea", $el).val("");
  }

  function addNewCard(clickEvent) {
    $(clickEvent.currentTarget).children().toggleClass("display-none");
    $("textarea", clickEvent.currentTarget)
      .focus()
      .on("keyup", function(keyEvent) {
        var text = $(keyEvent.target).val().trim();
        if(keyEvent.which === 13 && text !== "") {
          var card = new Card({ text: text });
          $("#stack .button.add").after(card.$el);
          resetAddNewCard();
        }
      });
  }

  function addNewGroup(clickEvent) {
    if(clickEvent) {
      event.preventDefault() && clickEvent.stopPropagation();
      var originalEvent = clickEvent.originalEvent;
      if(originalEvent && $(originalEvent.target).is("input")) {
        return;
      }
    }
    $("span", clickEvent.currentTarget).toggleClass("display-none");
    $("input", clickEvent.currentTarget)
      .focus()
      .on("keyup", function(keyEvent) {
        var text = $(keyEvent.target).val().trim();
        if(keyEvent.which === 13 && text !== "") {
          renderGroup({ name: text, cards: [] });
          $("span", clickEvent.currentTarget).toggleClass("display-none");
          $("input", clickEvent.currentTarget).val("");
        }
      });
  }
});
