const hublink = "https://cookieegames.github.io/games/"

if ( window !== window.parent )
{   
    try {
        if (window.parent.location.toString() === 'about:blank'){}
    } catch (err) {
        if ((window.location.host) !== (document.referrer.split('/')[2]) && (!document.referrer.includes('Credits'))){
            window.location.replace(window.location.protocol + window.location.hostname);
        }
    }
} 
else if ((window.location.href.includes('game-assets')) || (window.location.href.includes('swf'))){
    window.location.replace(document.referrer || (window.location.origin + '/'));
}
