
function tabOnUpdated(tabId, changeInfo, tab) {
	
	if (localStorage["bootloader_setting_enable"] == "enable") {
		
        var link_ = $("a.l:first").attr("href");

        var xhr_ = new XMLHttpRequest();
        xhr_.open("GET", link_, true);
        xhr_.onreadystatechange = function() {
        	  if (xhr_.readyState == 4) {
        	    var resp_ = xhr_.responseText;

        	    document.location = link_;
        		console.log("document.location = "+link_);

        		console.log("END");
        	  }
        	}
        xhr_.send();
        console.log("XMLHttpRequest Send");
    }
};

chrome.tabs.onUpdated.addListener(tabOnUpdated);