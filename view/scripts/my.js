load_by_vid = () => {
    let param = window.location.search;
    if (param.length === 0) {
        document.getElementById("demoText").innerText = "INVALID PAGE!";
    } else {
        let id = param.split("=")[1];
        if( id === undefined) {
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