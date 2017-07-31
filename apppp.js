// Low Level request
let next, prev

const successCallback = function(data){
  console.log(data)
  next = data.next
  prev = data.previous
  let template = Handlebars.compile($('#termplate').html())
  $('#app').html(template({persons: data.results}))

}
const errorCallback = function(err){
  console.log(err)
}
//Not sure what line 16 does, gonna try to find what api you're using. -Zach
$.getJSON('https://swapi.co/api/people')
.then(successCallback, errorCallback)

$('#next').on('click', function(){
  $.getJSON(next).then(successCallback, errorCallback)
})

$('#prev').on('click', function(){
  $.getJSON(next).then(successCallback, errorCallback)
})
// $.ajax({
//   url: 'https://swapi.co/people/5',
//   type: 'GET',
//     success: function(data) {
//       console.log(data);
//     },
//     fail: funtion(error) {
//       console.log(error);
//     },
// })
//
// jQuery.Deferred()
// deferred.done()
// deferred.fail()
// deferred.always()
// deferred.then()

// shorthand GET request
// $.get('https://swapi.co/people/5') //no ssemi colon here
//   .done(function(data){
//     console.log(data)
//   })
//   .fail(function(err){
//     console.error(err)
//   })
//   .always(function(){
//     console.log('yep I ran anyways')
//   })

// GET request using .then syntax
// $.get('https://swapi.co/api/people')
// .then(function(data){
//   console.log(data)
// },
// function(err) {
//   console.log(err)
// }
// )
//
Article.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    Article.all.push(new Article(ele));
  })
}
// Looks like you have the function at the top of the page, I think you can just delete this one -Zach
const successCallback = function(data){
  console.log(data)
  localStorage.setItem('rawData', JSON.stringify(data))

  Article.loadAll(data)

}

const errorCallback = function(err){
  console.log(err)
}
// This function will retrieve the data from either a local or remote source,
// and process it, then hand off control to the View.
Article.fetchAll = function() {
  if (localStorage.rawData) {
    // When rawData is already in localStorage,
    // we can load it with the .loadAll function above,
    // and then render the index page (using the proper method on the articleView object).
    Article.loadAll(JSON.parse(localStorage.rawData)); //TODO: What do we pass in to loadAll()?
    //TODO: What method do we call to render the index page?
    articleView.initIndexPage();
  } else {
    // TODO: When we don't already have the rawData,
    // we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    // cache it in localStorage so we can skip the server call next time,
    // then load all the data into Article.all with the .loadAll function above,
    // and then render the index page.
    $.getJSON('data/hackerIpsum.json')
      .then(successCallback, errorCallback)
        // localStorage.setItem('rawData', JSON.stringify(data))
        // Article.loadAll(data)
        // articleView.initIndexPage.toHtml();

    articleView.initIndexPage();
  }
};
//This file should probably be called indexPageView.js?
