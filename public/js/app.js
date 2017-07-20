// my js - new comment - new comment
'use strict';

const projectsView = {};

function Projects(portDataObj) {
  this.name = portDataObj.name;
  this.desc = portDataObj.desc;
  this.course = portDataObj.course;
  this.date = portDataObj.date;
  this.language = portDataObj.language;
  this.link = portDataObj.link;
  this.img = portDataObj.img;
}

Projects.all = [];

Projects.prototype.toHtml = function() {
  var template = $('#article-template').html();
  var comp = Handlebars.compile(template);
  // var $newProjects = $('article.template').clone();

  // This cloned article still has a class of template.
  // However, in our modules.css stylesheet, we gave all elements
  // with a class of template a display of none. Let's make
  // sure we're not accidentally hiding our cloned article! */
  // $($newProjects).removeClass().addClass(this.name);
  //
  //
  // if (!this.date) $newProjects.addClass('draft');
  // $newProjects.data('category', this.language);


  this.daysAgo = parseInt((new Date() - new Date(this.date))/60/60/24/1000);
  this.publishStatus = this.date ? `published ${this.daysAgo} days ago` : '(draft)';
  // $newProjects.append('<hr>');
  return comp(this);
};

Projects.all.sort(function(a, b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.date)) - (new Date(a.date));
});

Projects.all.forEach(function(articleObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  Projects.all.push(new Projects(articleObject));
});

// projectsView.initIndexPage() {
// Projects.all.forEach(function(article) {
//   $('#articles').append(article.toHtml());
// });
// };

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

// Initializing the index page and rendering to the Handlebars template
projectsView.initIndexPage = function() {
  Projects.all.forEach(function(article) {
    $('#articles').append(article.toHtml())
  });
};

Projects.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.date)) - (new Date(a.date));
  });

  rawData.forEach(function(ele) {
    Projects.all.push(new Projects(ele));
  })
}

const successCallback = function(data){
  console.log(data)
  localStorage.setItem('rawData', JSON.stringify(data))

  Projects.loadAll(data)
  projectsView.initIndexPage();
}

const errorCallback = function(err){
  console.log(err)
}

// This function will retrieve the data from either a local or remote source,
// and process it, then hand off control to the View.
Projects.fetchAll = function() {
  if (localStorage.rawData) {
    // When rawData is already in localStorage,
    // we can load it with the .loadAll function above,
    // and then render the index page (using the proper method on the projectsView object).
    Projects.loadAll(JSON.parse(localStorage.rawData)); //TODO: What do we pass in to loadAll()?
    // render the index page
    projectsView.initIndexPage();
  } else {
    // When we don't already have the rawData,
    // we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    // cache it in localStorage so we can skip the server call next time,
    // then load all the data into Projects.all with the .loadAll function above,
    // and then render the index page.
    $.getJSON('data/portData.json')
      .then(successCallback, errorCallback)


  }
};
