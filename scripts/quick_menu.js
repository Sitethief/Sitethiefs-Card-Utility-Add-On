console.log('init SCUA Quickmenu');

const currentHref = window.location.href;
const storedSettings = browser.storage.sync.get('settings');

storedSettings.then((res) => {
    let settings = {};
    settings.container_style = res.settings.global.container_style;
    settings.nation_deck = res.settings.quick_menu.nation_deck;
    settings.nation_container_switch = res.settings.quick_menu.nation_container_switch;
    
    let anchors = document.querySelectorAll('a');
    
    for (let i = 0; i < anchors.length; i++) {
        let anchor = anchors[i];
        const href = anchor.href;
        const possibleNatioName = href.replace('https://www.nationstates.net/nation=', '')
        let nationname = false;
        if (!possibleNatioName.includes('/')) {
            nationname = possibleNatioName;
        }
        
        if (!anchor.classList.contains('quietlink') && !currentHref.includes('detail=') && href.includes('https://www.nationstates.net/nation=') && !href.includes('page=deck') && (nationname && href.endsWith(nationname))) {
            if (settings.nation_deck) {
                anchor.insertAdjacentHTML(
                    "afterend",
                    '&nbsp;<a target="_blank" style="font-size:8px;" href="' + href + '/page=deck" title="Card Deck"><span><i class=\"icon-cards\"></i></span></a>'
                );
            }
            
            if (settings.nation_container_switch && nationname) {
                anchor.insertAdjacentHTML(
                    "afterend",
                    '&nbsp;<a target="_blank" style="font-size:8px;" href="' + href + '/' + settings.container_style + '=' + nationname + '" title="Switch to nation"><span><i class=\"icon-globe\"></i></span></a>'
                );
            }
        }
    }
});
