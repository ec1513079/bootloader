
function initSetting() {

	if(!localStorage["setting_bootloader_enable"]) {
		localStorage["setting_bootloader_enable"] = "enable";
	}

	if(!localStorage["setting_bootloader_pass_list"]) {
		localStorage["setting_bootloader_pass_list"] = JSON.stringify([]);
	}

	keyPassList = settingBootloaderKeyPassList();
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
var keyPassList = [];

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

function getPassFromKey(key) {
	var pass_ = "";
	keyPassList = settingBootloaderKeyPassList();
	jQuery.each(keyPassList, function(i, val) {
		if(key == val.key) { pass_ = val.pass; }
	});
	return pass_;
}

function getSearchUrlFromKey(key) {
	var url_ = "";
	keyPassList = settingBootloaderKeyPassList();
	jQuery.each(keyPassList, function(i, val) {
		if(key == val.key) { url_ = val.url; }
	});
	return url_;
}

function convertKeyPassObjectToTrTag(keyPass, index) {
	var tag_ =
	"<tr>" +
	"<td class='key_row'>"  + keyPass["key"]  + "</td>" +
	"<td class='pass_row'>" + keyPass["pass"] + "</td>" +
	"<td class='url_row'>"  + keyPass["url"]  + "</td>" +
	"<td class='edit_row'><button class='btn btn-small' type='submit' id='delete_button_"+index+"'><i class='icon-trash'></i></button></td>" +
	"</tr>";
	return tag_;
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

function addKeyPass() {
	console.log("add button clicked");
	var keyPass = object(KeyPass, {
		key:  $("input#key_input_box").val(),
		pass: $("input#pass_input_box").val(),
		url:  $("input#url_input_box").val()
	});
	keyPassList.push(keyPass);
	setSettingBootloaderKeyPassList(keyPassList);
}

function deleteKeyPass(index) {
	return function() {
		console.log("delete button clicked : " + index);
		keyPassList.splice(index, 1);
		setSettingBootloaderKeyPassList(keyPassList);
		document.location.reload(true)
	};
}

$(document).ready(function(){

	// Init switch
	if(isSettingBootloaderEnable()) { $("#on_off_switch").addClass("active"); }
	// On Off Switch Event
	document.querySelector('#on_off_switch').addEventListener('click', toggleSwitchByBootloaderOnOff);

	// Init List
	keyPassList = settingBootloaderKeyPassList();
	jQuery.each(keyPassList, function(i, val) {
		$("table#key_pass_table").append(convertKeyPassObjectToTrTag(val, i));
		document.querySelector('#delete_button_'+i).addEventListener('click', deleteKeyPass(i));
	});
	document.querySelector('#add_button').addEventListener('click', addKeyPass);

	// Truncate
//	$("td.url_row, td.key_row").each(function(){
//		var url_ = $(this).text() ;
//	    if(url_.length > 60) { $(this).text(url_.substring(0,60) + "..."); }
//	});
});

/************************************************
 * Kick Start
 ************************************************/
initSetting();
