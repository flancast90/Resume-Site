window.addEventListener('load',function(){
var ot = parseInt(document.getElementById('about').offsetTop,10);
document.getElementById('about-tag').style.marginTop=ot+150;

var ot2 = parseInt(document.getElementById('projects').offsetTop,10);
document.getElementById('project-tag').style.marginTop=ot2+250;

var ot3= parseInt(document.getElementById('links').offsetTop,10);
document.getElementById('link-tag').style.marginTop=ot3+250;
});
