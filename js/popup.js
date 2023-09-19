window.onload = function() {
    const list = [
        'sf.png',
        'volcano.png',
    ];

    // Initialize excluded_items as an empty array if it doesn't exist
    chrome.storage.local.get('excluded_items', function(result) {
        if (!Array.isArray(result.excluded_items)) {
            chrome.storage.local.set({ 'excluded_items': [] });
        }

        // Load images and set their initial CSS class based on the stored data
        loadImages(result.excluded_items);
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
    function loadImages(excludedItems) {
        var images = document.getElementById('images');

        for (let i = 0; i < list.length; i++) {
            var image = document.createElement('img');
            var imageName = list[i];
            image.src = 'assets/backgrounds/' + imageName;
            image.id = imageName;
            
            // Set the initial CSS class based on whether the image is excluded
            image.className = excludedItems.includes(imageName) ? 'image excluded' : 'image';

            image.addEventListener('click', function(id) {
                return function() {
                    const selectedImages = document.querySelectorAll('.image.excluded');
                    if (selectedImages.length === 1 && selectedImages[0].id !== id) {
                        return;
                    }

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
                }
            }(imageName));
            images.appendChild(image);
        }
    }
}