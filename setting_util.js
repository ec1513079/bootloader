
var SettingActions = {
    bootloader_setting_enable : bootloader_setting_enable
};

function bootloader_setting_enable(value)
{
	if(value != null)
		return localStorage[ "bootloader_setting_enable" , value ];
	else
		return localStorage[ "bootloader_setting_enable"];
}

chrome.extension.onRequest.addListener( function ( message , sender , sendResponse) {

    var retVal = (SettingActions[ message.action ]||function(){}).apply(　message.args );

    //関数の実行結果をレスポンスの引数として返す
    //sendResponse.apply( null , retVal )とかの方が綺麗かも？
    sendResponse( { value : retVal } );
});

