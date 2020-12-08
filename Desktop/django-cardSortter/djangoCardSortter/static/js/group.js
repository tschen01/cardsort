var Group = function(data) {
  this.data = data;
  this.$el = $("<div>", { class: "group" });

  this.render = render;
  this.renderCards = renderCards;
  this.renderCard = renderCard;

  this.render();
};

function render() {
  var inputDiv = "<input type='text' name='groupTitle' value='" + this.data.name + "' class='display-none'>";
  var textDiv = "<span>" + this.data.name + "</span>";
  this.$el.append("<div class='title'>" + inputDiv + textDiv, "<div class='cards dropzone'>");

  $('.title', this.$el).click(onTitleClick);

  this.renderCards();
}
function renderCards() {
  for(var i = 0, count = this.data.cards.length; i < count; i++) {
    this.renderCard(this.data.cards[i]);
  }
}

function renderCard(cardData) {
  var card = new Card(cardData);
  $('.cards', this.$el).append(card.$el);
}

function onTitleClick(event) {
  event.stopPropagation();
  if($(event.originalEvent.target).hasClass('title')) {
    return;
  }
  $(event.currentTarget).children().toggleClass('display-none');
  $('input', event.currentTarget)
    .val($('span', event.currentTarget).text())
    .focus();
}
