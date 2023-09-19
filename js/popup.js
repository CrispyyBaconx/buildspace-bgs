// when the user edits something listen for it and save it to chrome.storage.local
window.onload = function() {
    // load the saved value from chrome.storage.local
    chrome.storage.local.get('homepage_text', function(result) {
        // if there is a saved value, update the input
        if (result.homepage_text) {
            document.getElementById('homepage_text').value = result.homepage_text;
        }
    });

    var input = document.getElementById('homepage_text');
    input.addEventListener('input', function() {
        chrome.storage.local.set({ 'homepage_text': input.value });
    });
}