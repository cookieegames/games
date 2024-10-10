// fpsCheck.js

document.addEventListener('DOMContentLoaded', function() {
    var fps = document.getElementById('fps');
    var startTime = Date.now();
    var frame = 0;

    function tick() {
        var time = Date.now();
        frame++;
        if (time - startTime > 1000) {
            fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
            startTime = time;
            frame = 0;
        }
        window.requestAnimationFrame(tick);
    }
    tick();

    // Show FPS counter if enabled
    if (localStorage.getItem('fpsCounterEnabled') === 'true') {
        fps.style.display = 'block';
    } else {
        fps.style.display = 'none';
    }
});
