var slideLength = 4;
var pos = 0;
var w;
var h;

window.onload = function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        if (window.innerWidth < window.innerHeight) {
            document.getElementById('loading-text').innerText = "Please rotate device.";

            screen.orientation.addEventListener('change', function() {
                setTimeout(function() {
                    if (window.innerWidth > window.innerHeight) {
                        document.getElementById('preloader').remove();
                    }
                }, 100);    
            });
        }else {
            setTimeout(function() {    
                document.getElementById('preloader').remove();
            }, 750);
        }   
    }else {
        setTimeout(function() {    
            document.getElementById('preloader').remove();
        }, 750);
    }

    background_handler();
}

// prevent flickering by dynamically hiding all non-used content
for (var i = 1; i < slideLength; i++) {
    document.body.innerHTML += `
                <style>
                .` + i + `{
                    display:none;
                }
                <style>
            `;
}

// load image later to make sure it has no overlap with other positioned elements
document.getElementById('afterload').height = document.getElementById('scroll-msg').offsetHeight;
document.getElementById('afterload').src = "assets/img/YXJyb3c=.png";

window.addEventListener('resize', background_handler);

// handle resize and make sure elements are scaled correctly
function background_handler() {
    if (screen.width < 1000) {
        w = parseInt(window.innerWidth);
        h = parseInt(window.innerHeight);

        document.getElementById('background').width = w;
        document.getElementById('background').height = h;
    } else {
        w = parseInt(window.innerWidth * 0.8);
        h = h = parseInt(window.innerHeight);

        document.getElementById('background').width = w;
        document.getElementById('background').height = h;
    }

    slide(pos);
    non_scroll();
}

// function for handling the users current position in the "slides"
function slide(num) {
    // resets and redraws canvas
    document.getElementById('background').remove();
    document.body.innerHTML += `<canvas id="background" width="` + w + `" height="` + h + `" style="position:fixed; top:0px; right:0px; z-index:-1; background-color: transparent;"></canvas>`;

    // for various functions that don't update user pos themselves
    if (pos !== num) {
        pos = num;
    }

    var c = document.getElementById('background');
    var ctx = c.getContext('2d');

    var all = document.getElementsByClassName('scroll').length;

    // show or hide all elements for the users pos
    for (var i = 0; i < all; i++) {
        if (document.getElementsByClassName('scroll')[i].className.includes(num.toString())) {
            document.getElementsByClassName('scroll')[i].style.display = "block";
        } else {
            document.getElementsByClassName('scroll')[i].style.display = "none";
        }
    }

    // draw to the background canvas
    var rand_rotation = Math.floor(Math.random() * (30 + 30) - 30);

    // background function to determine canvas shape rotation
    ctx.rotate(rand_rotation * Math.PI / 180);
    ctx.fillStyle = "#181818";
    ctx.fillRect(200, 0, 1000, 1000);

    non_scroll();

}

// this function determines if the default scroll-2-next-page should be stopped
// it will fire when the mouse is over an element with a scrollar
function non_scroll() {
    var proceed = false;
    for (var i = 0; i < document.getElementsByClassName('checklist').length; i++) {
        if (!proceed) {
            if (document.getElementsByClassName('checklist')[i].style.display == "block") {
                proceed = true;
            }
        }
    }

    if (proceed) {
        var hasVerticalScrollbar = false;

        for (var i = 0; i < document.getElementsByClassName('checklist').length; i++) {
            if (!hasVerticalScrollbar) {
                hasVerticalScrollbar = document.getElementsByClassName('checklist')[i].scrollHeight > document.getElementsByClassName('checklist')[i].clientHeight;
            }
        }

        if (hasVerticalScrollbar) {
            for (var i = 0; i < document.getElementsByClassName('checklist').length; i++) {
                document.getElementsByClassName('checklist')[i].setAttribute("onmouseover", "handle_scroll('mouseover')");
                document.getElementsByClassName('checklist')[i].setAttribute("onmouseout", "handle_scroll('mouseout')");
            }

        }
    }
}

function handle_scroll(event) {
    if (event == 'mouseover') {
        document.removeEventListener('wheel', checkScrollDirection);
    } else if (event == 'mouseout') {
        document.addEventListener('wheel', checkScrollDirection);
    }
}

document.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    // smooth scrolling
    document.removeEventListener('wheel', checkScrollDirection);
    // for event to not infinitely fire.
    setTimeout(function() {
        document.addEventListener('wheel', checkScrollDirection);
    }, 500);

    if (checkScrollDirectionIsUp(event)) {
        if (pos > 0) {
            pos = pos - 1;
            slide(pos);
        }

    } else {
        if (pos < slideLength) {
            pos = pos + 1;
            slide(pos);
        }

    }
}

// return mouse direction as boolean
function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}
