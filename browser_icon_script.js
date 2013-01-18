
function init()
{
	if(!localStorage["bootloader_setting_enable"]) { localStorage["bootloader_setting_enable"] = "disable"; }
}

function reloadBrowserIcon()
{
	if (localStorage["bootloader_setting_enable"] == "enable") {
		chrome.browserAction.setIcon( { path:"img/icon-19-off.png" } );
	} else {
		chrome.browserAction.setIcon( { path:"img/icon-19-disable.png" } );
	}
};

function toggleBootloadreEnable()
{
	if (localStorage["bootloader_setting_enable"] == "enable") {
		localStorage["bootloader_setting_enable"] = "disable";
	} else {
		localStorage["bootloader_setting_enable"] = "enable";
	}
	reloadBrowserIcon();
}

init();
chrome.browserAction.onClicked.addListener(toggleBootloadreEnable);
reloadBrowserIcon();
