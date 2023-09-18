window.onload = function() {
    const files = [
        'sf.png',
        'volcano.png',
        // add more files here
    ]

    var image = document.getElementById('background');
    var random = Math.floor(Math.random() * files.length);
    // if(settings.backgroundRandom) {} maybe add this later if we want to add a setting for it
    image.src = 'assets/backgrounds/' + files[random];

    // if(settings.text) {}
    var text = document.getElementById('text');
    text.innerHTML = 'Welcome, Bacon!';
}

// add a thing for when the ext is clicked some settings for text and image selection
// radio button array maybe with the images above and the dot below maybe