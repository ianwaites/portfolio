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
