// my js - new comment - new comment - new comment
'use strict';

const projectsView = {};

var app = app || {};

(function(module) {
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


    this.daysAgo = parseInt((new Date() - new Date(this.date))/60/60/24/1000);
    this.publishStatus = this.date ? `published ${this.daysAgo} days ago` : '(draft)';
    return comp(this);
  };

  // Projects.all.sort(function(a, b) {
  //   return (new Date(b.date)) - (new Date(a.date));
  // });

  Projects.loadAll = rows => {
    rows.sort((a,b) => (new Date(b.date)) - (new Date(a.date)));

    Projects.all = rows.map(ele => new Projects(ele))

  };

  // Projects.all.forEach(function(articleObject) {
  //   Projects.all.push(new Projects(articleObject));
  // });

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
    console.log('got here')
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

  // Get a sum of numbers using .reduce
  var numbers = [6, 18, 24, 17];

  function getSum(total, num) {
    return total + num;
  }

  function myFunction(item) {
    document.getElementById('foot').innerHTML = numbers.reduce(getSum);
  }
  myFunction();
  module.Projects = Projects;
})(app)
