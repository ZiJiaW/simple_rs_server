loadByVid = () => {
    let param = window.location.search;
    if (param.length === 0) {
        document.getElementById("demoText").innerText = "INVALID PAGE!";
    } else {
        let id = param.split("=")[1];
        if (id === undefined) {
            document.getElementById("demoText").innerText = "INVALID ID!";
        } else {
            document.getElementById("demoText").innerText = "DEVICE ID: " + id;
            let options = {
                autoplay: false,
                techorder: ['flash'],
                poster: 'imgs/poster.jpg',
                width: '860',
                height: '520',
                preload: 'auto',
                sources: [{ src: 'rtmp://127.0.0.1/hls/' + id, type: 'rtmp/flv'}]
            }
            videojs("my-player", options);
        }
    }
}

flashChecker = () => {
    var hasFlash = 0;　　　　 //是否安装了flash  
    var flashVersion = 0;　　 //flash版本  
   
    if (document.all) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            hasFlash = 1;
            VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    } 
    else if (navigator.plugins && navigator.plugins.length > 0) {
        var swf = navigator.plugins["Shockwave Flash"];
        if(swf) {
            hasFlash = 1;
            var words = swf.description.split(" ");
            for(var i = 0; i < words.length; ++i) {
                if(isNaN(parseInt(words[i]))) continue;
                flashVersion = parseInt(words[i]);
            }
        }
    }
    return { f: hasFlash, v: flashVersion };
}

checkFlash = () => {
    var fls = flashChecker();
    var s = "";
    if (!fls.f) {
        if (confirm("您的浏览器未安装Flash插件，现在安装？")) {
            window.location.href = "http://www.adobe.com/go/getflashplayer";
        }
    }
}