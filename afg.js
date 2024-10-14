(function() {
    var adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-';
    adsenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseScript);

    adsenseScript.onload = function() {
        var adContainer = document.createElement('ins');
        adContainer.className = 'adsbygoogle';
        adContainer.style.display = 'inline-block';
        adContainer.style.width = '300px';
        adContainer.style.height = '550px';
        adContainer.setAttribute('data-ad-client', 'ca-pub-2550143154036518');
        adContainer.setAttribute('data-ad-slot', '7694436076');

        var scriptContainer = document.querySelector('.script-container');
        if (scriptContainer) {
            scriptContainer.appendChild(adContainer);
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    };
})();
