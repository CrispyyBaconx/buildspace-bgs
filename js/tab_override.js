window.onload = function() {
    const list = [
        'sf.png',
        'volcano.png',
    ];

    chrome.storage.local.get('excluded_items', function(result) {
        if(result.excluded_items) {
            const temp_list = list.filter(item => !result.excluded_items.includes(item));
            if(temp_list.length > 0) {
                list = temp_list;
            } else {
                throw new Error('No images left to display');
            }
        }
    });

    var image = document.getElementById('background');
    var random = Math.floor(Math.random() * list.length);

    image.src = 'assets/backgrounds/' + list[random];

    var text = document.getElementById('text');
    chrome.storage.local.get('homepage_text', function(result) {
        // if there is a saved value, update the input
        if (result.homepage_text) {
            text.innerHTML = result.homepage_text;
        } else {
            text.innerHTML = 'Welcome, User!';
        }
    });
}