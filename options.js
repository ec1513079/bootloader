
function initSetting() {

	if(!localStorage["setting_bootloader_enable"]) {
		localStorage["setting_bootloader_enable"] = "enable";
	}

	if(!localStorage["setting_bootloader_pass_list"]) {
		localStorage["setting_bootloader_pass_list"] = JSON.stringify([]);
	}
};

/************************************************
 * Object Helper
 *  object - オブジェクトを作る
 *  Object object(BaseObj [, mixinObj1 [, mixinObj2...]])
 ************************************************/
function object(o) {
  var f = object.f, i, len, n, prop;
  f.prototype = o;
  n = new f;
  for (i=1, len=arguments.length; i<len; ++i)
    for (prop in arguments[i])
      n[prop] = arguments[i][prop];
  return n;
}
object.f = function(){};


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
 * KeyPass List
 ************************************************/

var KeyPass = {
		key  : "",
		pass : "",
		url  : ""
};

function settingBootloaderKeyPassList() {
	var list_ = [];
	if(localStorage["setting_bootloader_pass_list"]) {
		list_ = JSON.parse(localStorage["setting_bootloader_pass_list"]);
	}
	return list_;
}

function setSettingBootloaderKeyPassList(list) {
	if(list) {
		localStorage["setting_bootloader_pass_list"] = JSON.stringify(list);
	}
}

function convertKeyPassObjectToTrTag(keyPass, index) {
	return
	"<tr>"
	"<td class='key_row'>"  + keyPass["key"]  + "</td>" +
	"<td class='pass_row'>" + keyPass["pass"] + "</td>" +
	"<td class='url_row'>"  + keyPass["url"]  + "</td>" +
	"<td class='edit_row'><a class='btn btn-small' href='delete#index=" + index + "'><i class='icon-trash'></i></a></td>" +
	"</tr>";
}


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

function toggleSwitchByBootloaderOnOff() {
	if (isSettingBootloaderEnable()) {
		settingBootloaderEnable("disable");
	} else {
		settingBootloaderEnable("enable");
	}
}

$(document).ready(function(){

	if(getUrlVars()["page_action"] == "true") {
		// Truncate Url if option page from page icon
		$("td.url_row, td.key_row").each(function(){
			var url_ = $(this).text() ;
		    if(url_.length > 40) { $(this).text(url_.substring(0,40) + "..."); }
		});
	}

	// Init switch
	if(isSettingBootloaderEnable()) { $("#on_off_switch").addClass("active"); }
	// On Off Switch Event
	document.querySelector('#on_off_switch').addEventListener('click', toggleSwitchByBootloaderOnOff);

	// Init List
	var list_ = settingBootloaderKeyPassList();
	jQuery.each(list_, function(i, val) {
		$("table#key_pass_table").append(convertKeyPassObjectToTrTag(val, i));
	});
});


/************************************************
 * Kick Start
 ************************************************/
initSetting();
