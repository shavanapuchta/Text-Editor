const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler for 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.add('show');
});

// A click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        if (result.outcome === 'accepted') {
            console.log('App installed');
        } else {
            console.log('App installation stopped');
        }
        deferredPrompt = null;
        butInstall.classList.remove('show');
    }
});

// A handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed');
});
