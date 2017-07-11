// my js - new comment

var allProjects = [];

function Projects(name, desc, course, date, language, link, img) {
  this.name = name;
  this.desc = desc;
  this.course = course;
  this.date = date;
  this.language = language;
  this.link = link;
  this.img = img;
  allProjects.push(this);
}
