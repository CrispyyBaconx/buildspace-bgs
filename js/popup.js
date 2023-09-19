window.onload = function() {
    const list = [
        'sf.png',
        'volcano.png',
    ];

    chrome.storage.local.get('excluded_items', function(result) {
        if (!Array.isArray(result.excluded_items)) {
            chrome.storage.local.set({ 'excluded_items': [] });
        }
    });

    chrome.storage.local.get('homepage_text', function(result) {
        if (result.homepage_text) {
            document.getElementById('homepage_text').value = result.homepage_text;
        }
    });

    var input = document.getElementById('homepage_text');
    input.addEventListener('input', function() {
        chrome.storage.local.set({ 'homepage_text': input.value });
    });

    // need to load images
    var images = document.getElementById('images');

    for (let i = 0; i < list.length; i++) {
        var image = document.createElement('img');
        var imageName = list[i];
        image.src = 'assets/backgrounds/' + imageName;
        image.id = imageName;
        image.className = 'image';
        image.addEventListener('click', function(id) {
            return function() {
                chrome.storage.local.get('excluded_items', function(result) {
                    if (result.excluded_items) {
                        if (result.excluded_items.includes(id)) {
                            const updated_list = result.excluded_items.filter(item => item !== id);
                            chrome.storage.local.set({ 'excluded_items': updated_list });
                            let img = document.getElementById(id);
                            img.className = 'image';
                        } else {
                            const updated_list = [...result.excluded_items, id];
                            chrome.storage.local.set({ 'excluded_items': updated_list });
                            let img = document.getElementById(id);
                            img.className = 'image excluded';
                        }
                    } else {
                        chrome.storage.local.set({ 'excluded_items': [id] });
                        image.className = 'image excluded';
                    }
                });
            };
        }(imageName));
        images.appendChild(image);
    }
}