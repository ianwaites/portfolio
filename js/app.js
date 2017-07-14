// my js - new comment
'use strict';

var allProjects = [];

function Projects(portDataObj) {
  this.name = portDataObj.name;
  this.desc = portDataObj.desc;
  this.course = portDataObj.course;
  this.date = portDataObj.date;
  this.language = portDataObj.language;
  this.link = portDataObj.link;
  this.img = portDataObj.img;
}

Projects.prototype.toHtml = function() {
  var template = $('#article-template').html();
  var comp = Handlebars.compile(template);
  // var $newArticle = $('article.template').clone();
  // /* TODO: This cloned article still has a class of template.
  // However, in our modules.css stylesheet, we gave all elements
  // with a class of template a display of none. Let's make
  // sure we're not accidentally hiding our cloned article! */
  // $($newArticle).removeClass().addClass(this.name);
  //
  //
  // if (!this.date) $newArticle.addClass('draft');
  // $newArticle.data('category', this.language);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest
  of the current template clone with properties from this particular Article instance.
  We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */

  // Display the date as a relative number of 'days ago'
  // $newArticle.find('h1').html(this.name);
  // $newArticle.find('#description').html(this.desc);
  // $newArticle.find('#course').html(this.course);
  // $newArticle.find('#date').html(this.date);
  // $newArticle.find('#lang').html(this.language);
  // $newArticle.find('#link').html(this.link);
  // $newArticle.find('#img').html(this.img);


  this.daysAgo = parseInt((new Date() - new Date(this.date))/60/60/24/1000);
  this.publishStatus = this.date ? `published ${this.daysAgo} days ago` : '(draft)';
  // $newArticle.append('<hr>');
  return comp(this);
};

portData.sort(function(a, b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.date)) - (new Date(a.date));
});

portData.forEach(function(articleObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  allProjects.push(new Projects(articleObject));
});

allProjects.forEach(function(article) {
  $('#articles').append(article.toHtml());
});

// jQuery for nav
$(document).ready(function() {
  $('.tab').on('click', function(e) {
    e.preventDefault();
    $('.tab-content').hide();
    $('#' + $(this).attr('data-content')).show();
    console.log($('#' + $(this).attr('data-content')));

  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.

});
