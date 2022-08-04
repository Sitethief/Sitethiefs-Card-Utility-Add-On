async function saveSettings(e) {
    browser.storage.sync.set({
        settings: {
            global: {
                main_nation: document.querySelector("#global_main_nation")
                    .value,
                container_style: document.querySelector("#global_container_style")
                    .value
            },
            quick_menu: {
                nation_deck: document.querySelector("#quick_menu_nation_deck")
                    .checked,
                nation_container_switch: document.querySelector("#quick_menu_nation_container_switch")
                    .checked
            }
        }
    });
    e.preventDefault();
    
    console.log("Settings saved.");
}

function restoreOptions() {
    
    let settings = browser.storage.sync.get('settings');
    
    settings.then((res) => {
        document.querySelector("#global_main_nation")
            .value = res.settings.global.main_nation || '';
        if (res.settings.global.container_style) {
            document.querySelector("#global_container_style_" + res.settings.global.container_style)
                .selected = true;
        }
        if (res.settings.quick_menu.nation_deck) {
            document.querySelector("#quick_menu_nation_deck")
                .checked = true;
        }
        if (res.settings.quick_menu.nation_container_switch) {
            document.querySelector("#quick_menu_nation_container_switch")
                .checked = true;
        }
    });
    
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#saveSettings")
    .addEventListener("click", async (e) => {
        await saveSettings(e);
    });
