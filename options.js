
function initSetting() {

	if(!localStorage["setting_bootloader_enable"]) {
		localStorage["setting_bootloader_enable"] = "enable";
	}

	if(!localStorage["setting_bootloader_pass_list"]) {
		localStorage["setting_bootloader_pass_list"] = JSON.stringify([]);
	}
};


/************************************************
 * Bootloader Enable/Disable
 ************************************************/

function settingBootloaderEnable(value) {

	if(!localStorage["setting_bootloader_enable"]) {
		localStorage["setting_bootloader_enable"] = "enable";
	}

	if(value)
		return localStorage["setting_bootloader_enable"] = value;
	else
		return localStorage["setting_bootloader_enable"];
};

function isSettingBootloaderEnable() {
	if (settingBootloaderEnable() == "enable") {
		return true;
	} else {
		return false;
	}
}


/************************************************
 * RapPass List
 ************************************************/



/************************************************
 * Option Page Inner Script
 ************************************************/

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function(){
	if(getUrlVars()["page_action"] == "true") {
		$("td.url_row, td.key_row").each(function(){
			var url_ = $(this).text() ;
		    if(url_.length > 40) { $(this).text(url_.substring(0,40) + "..."); }
		});
	}
});


/************************************************
 * Kick Start
 ************************************************/
initSetting();
