window.addEventListener('load',function(){
var ot = parseInt(document.getElementById('about').offsetTop,10);
document.getElementById('about-tag').style.top=ot+150;

var ot2 = parseInt(document.getElementById('projects').offsetTop,10);
document.getElementById('project-tag').style.top=ot2+250;

var ot3= parseInt(document.getElementById('links').offsetTop,10);
document.getElementById('link-tag').style.top=ot3+250;
});
