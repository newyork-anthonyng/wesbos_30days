const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(localMediaStream => {
        video.src = URL.createObjectURL(localMediaStream);
        video.play();
    }).catch(err => {
        console.error('Error: User did not give permission', err);
    })
}

function paintToCanvas() {
    const { videoWidth: width, videoHeight: height } = video;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);

        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    playCameraAudio();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "handsome");
    link.innerHTML = `
        <img src="${data}" alt="Webcam photo">
    `;
    strip.insertBefore(link, strip.firstChild);
}

function playCameraAudio() {
    snap.currentTime = 0;
    snap.play();
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i] = pixels.data[i] + 100;
        pixels.data[i + 1] = pixels.data[i + 1] - 100;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }

    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i];
        pixels.data[i + 100] = pixels.data[i + 1];
        pixels.data[i - 150] = pixels.data[i + 2];
    }

    return pixels;
}

video.addEventListener('canplay', paintToCanvas);
getVideo();