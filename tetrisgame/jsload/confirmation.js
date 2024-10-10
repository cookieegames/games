// Confirm before unload
function confirmBeforeUnload(e) {
    if (localStorage.getItem('confirmationEnabled') === 'true' && (e.clientY < 0 || e.clientY === undefined)) {
        var confirmationMessage = 'Are you sure you want to leave? You may lose your progress.';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
}

window.addEventListener('beforeunload', confirmBeforeUnload);

document.addEventListener('DOMContentLoaded', function() {
    // Handle confirmation toggle
    var toggleConfirmation = document.getElementById('toggleConfirmation');
    if (localStorage.getItem('confirmationEnabled') === 'true') {
        toggleConfirmation.checked = true;
    }

    // Handle FPS counter
    if (localStorage.getItem('fpsCounterEnabled') === 'true') {
        loadFpsCounterScript();
        document.getElementById('fps').style.display = 'block';
    } else {
        document.getElementById('fps').style.display = 'none';
    }

    function loadFpsCounterScript() {
        if (!document.getElementById('fpsCounterScript')) {
            var script = document.createElement('script');
            script.id = 'fpsCounterScript';
            script.src = 'jsload/fpsCounter.js';
            document.body.appendChild(script);
        }
    }

    function unloadFpsCounterScript() {
        var script = document.getElementById('fpsCounterScript');
        if (script) {
            script.remove();
        }
        document.getElementById('fps').innerHTML = "--";
        document.getElementById('fps').style.display = 'none';
    }
});
