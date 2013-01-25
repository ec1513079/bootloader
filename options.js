
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
	"<tr id='key_pass_tr_"+index+"'>" +
	"<td class='key_row'  id='key_"+index+"'>"  + keyPass["key"]  + "</td>" +
	"<td class='pass_row' id='pass_"+index+"'>" + keyPass["pass"] + "</td>" +
	"<td class='url_row'  id='url_"+index+"'>"  + keyPass["url"]  + "</td>" +
	"<td class='edit_row' style='text-align: center;'><div class='btn-group'>" + 
		"<button class='btn btn-small' type='submit' id='edit_button_"+index+"'><i class='icon-pencil'></i></button>" + 
		"<button class='btn btn-small' type='submit' id='delete_button_"+index+"'><i class='icon-trash'></i></button>" + 
	"</div></td>" +
	"</tr>";
	return tag_;
}

function convertKeyPassObjectToEditingTrTag(keyPass, index) {
	var tag_ =
	"<tr id='key_pass_tr_"+index+"_edit"+"'>" +
	"<form>" +
	"<td class='key_row'>"  + '<input type="text" id="key_'  + index + '_edit" value="' + keyPass["key"]  + '">' + "</td>" +
	"<td class='pass_row'>" + '<input type="text" id="pass_' + index + '_edit" value="' + keyPass["pass"] + '">' + "</td>" +
	"<td class='url_row'>"  + '<input type="text" id="url_'  + index + '_edit" value="' + keyPass["url"]  + '">' + "</td>" +
	"<td class='edit_row' style='text-align: center;'><div class='btn-group'>" + 
		"<button class='btn btn-small' type='submit' id='ok_button_"+index+"'><i class='icon-ok'></i></button>" + 
	"</div></td>" +
	"</form>" +
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
	keyPassList.splice(0,0,keyPass);
	setSettingBootloaderKeyPassList(keyPassList);
}

function editKeyPass(index) {
	return function() {
		var tr_tag = $("tr#key_pass_tr_"+index);
		var edit_tr_tag = convertKeyPassObjectToEditingTrTag(keyPassList[index], index);
		tr_tag.after(edit_tr_tag);
		tr_tag.remove();
		document.querySelector('#ok_button_'+index).addEventListener('click', okKeyPass(index));
	};
}

function okKeyPass(index) {
	return function() {
		var keyPass_ = keyPassList[index];
		keyPass_["key"]  = $("input#key_"  + index + "_edit").val();
		keyPass_["pass"] = $("input#pass_" + index + "_edit").val();
		keyPass_["url"]  = $("input#url_"  + index + "_edit").val();
		setSettingBootloaderKeyPassList(keyPassList);
		document.location.reload(true);
	};
}

function deleteKeyPass(index) {
	return function() {
		console.log("delete button clicked : " + index);
		keyPassList.splice(index, 1);
		setSettingBootloaderKeyPassList(keyPassList);
		document.location.reload(true);
	};
}

function importKeyPassList() {
	$("#import_alert").text("");
	$("#import_alert").fadeOut();
	$('div#import_modal').modal('show');
}

function importKeyPassListFromJson() {
	try {
		var json_ = $("textarea#import_textarea").val();
		if (json_ == "") { throw "Please input json string."; }
		var list_ = JSON.parse(json_);
		jQuery.each(list_, function(i, val) {
			if(val.key === undefined || val.pass === undefined || val.url === undefined) {
				throw "undefined param in ('"+val.key+"','"+val.pass+"','"+val.url+"') : index is "+i+".";
			}
			keyPassList.push(object(KeyPass, {
				key:  val.key,
				pass: val.pass,
				url:  val.url
			}));
		});
		setSettingBootloaderKeyPassList(keyPassList);

    	$("#import_alert").text("");
		$("#import_alert").fadeOut();

		document.location.reload(true)
	} catch (e) {
    	$("#import_alert").text(e);
    	$("#import_alert").fadeIn();
	}
}

function exportKeyPassList() {
	$('div#export_data').text(localStorage["setting_bootloader_pass_list"]);
	$('div#export_modal').modal('show');
}

function copyExportedJsonToClipboard() {
	var copyArea = $("<textarea id='copy_area'/>");
	copyArea.text(localStorage["setting_bootloader_pass_list"]);
	$("body").append(copyArea);
	copyArea.select();
	document.execCommand("copy");
	copyArea.remove();
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
		document.querySelector('#edit_button_'+i).addEventListener('click', editKeyPass(i));
		document.querySelector('#delete_button_'+i).addEventListener('click', deleteKeyPass(i));
	});
	document.querySelector('#add_button').addEventListener('click', addKeyPass);

	// Init Import and Export button
	document.querySelector('button#import_button').addEventListener('click', importKeyPassList);
	document.querySelector('button#export_button').addEventListener('click', exportKeyPassList);

	// Init Modal
	$('div#import_modal').modal({ keyboard: false, show: false });
	document.querySelector('button#import_data_button').addEventListener('click', importKeyPassListFromJson);
	$('div#export_modal').modal({ keyboard: false, show: false });
	document.querySelector('button#export_copy_button').addEventListener('click', copyExportedJsonToClipboard);

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
