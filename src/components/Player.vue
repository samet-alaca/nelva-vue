<template lang="html">
    <div ref="player" class="player">
        <img ref="sizer" class="sizer" src="@/assets/img/design/16x9.png">
        <div class="player-inner">
            <div class="p-container z3">
                <div ref="controls" class="controls">
                    <div class="logo">
                        <img src="@/assets/img/logo.png">
                    </div>
                    <div class="progress">
                        <input id="progress-slider" ref="timeline" @input="changePosition" type="range" min="0" :max="duration" :value="currentTime" class="progress-slider">
                    </div>
                    <div class="control-bar">
                        <div class="control">
                            <button class="control-button play" @click="changePlay" ref="playButton">
                                <svg width="100%" height="100%" viewBox="0 0 36 36">
                                    <defs>
                                        <path fill="white" id="play-pause" d="M 11 10 L 17 10 L 17 26 L 11 26 M 20 10 L 26 10 L 26 26 L 20 26">
                                            <animate ref="animation" begin="indefinite" attributeType="XML" attributeName="d" fill="freeze" from="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" to="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" dur="0.1s" keySplines=".4 0 1 1" repeatCount="1"></animate>
                                        </path>
                                    </defs>
                                    <use xlink:href="#play-pause"></use>
                                    <use xlink:href="#play-pause"></use>
                                </svg>
                            </button>
                        </div>
                        <v-tooltip top>
                            <div class="control control-volume" slot="activator">
                                <div class="control-button sound" ref="volumeButton" @click="changeMute">
                                    <div class="sound--icon"><v-icon>volume_mute</v-icon></div>
                                    <div class="sound--wave sound--wave_one"></div>
                                    <div class="sound--wave sound--wave_two"></div>
                                </div>
                                <div class="volume-control">
                                    <input id="volume-input" ref="volume" @input="changeVolume" type="range" min="0" max="100" value="50" class="slider">
                                </div>
                            </div>
                            <span ref="volumeDisplay">50 %</span>
                        </v-tooltip>
                        <div class="control time">
                            <span ref="currentTimeDisplay">00:00</span> / <span ref="durationDisplay">00:00 &nbsp;&nbsp;- </span>
                        </div>
                        <div class="control status">
                            <span>
                                <div ref="statusCircle" class="circle replay"></div>
                                <span ref="status">Replay du 08/07/2018 à 20h14 - 23 spectateurs</span>
                            </span>
                        </div>
                        <div class="control right">
                            <button class="control-button fullscreen" @click="changeFullscreen"><v-icon ref="fullscreenIcon">fullscreen</v-icon></button>
                        </div>
                        <!--<div class="control right"><button class="control-button quality"><v-icon>settings</v-icon></button></div>-->
                    </div>
                </div>
            </div>
            <div class="p-container z2">
                <div class="loader off">
                    <div class="lds-ripple"><div></div><div></div></div>
                </div>
            </div>
            <div class="p-container z1">
                <div class="video">
                    <video ref="video" src="@/assets/test.mp4"></video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Player',
    data() {
        return {
            fullscreen: false,
            currentTime: 0,
            duration: 0,
            pause: 'M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28',
            play: 'M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26',
            oldWidth: '82%'
        };
    },
    mounted() {
        const isFirefox = typeof InstallTrigger !== 'undefined';
        const isChrome = !!window.chrome && !!window.chrome.webstore;
        if(isChrome) {
            this.initializeVolumeControl();
        } else {
            if(!isFirefox) {
                alert('This browser is not supported, try again with Chrome or Firefox');
            }
        }
        this.initializePositionControl();
        this.initializeMouseFade();
        this.initializeAlternativeCommands();

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';

        script.onload = this.initializeVideoFeed;
        script.onreadystatechange = this.initializeVideoFeed;
        document.getElementsByTagName('head')[0].appendChild(script);
    },
    methods: {
        initializeVolumeControl() {
            const min = this.$refs.volume.getAttribute('min');
            const max = this.$refs.volume.getAttribute('max');
            const sliderStyle = () => {
                const value = (this.$refs.volume.value - min) / (max - min);
                this.$refs.volume.style.backgroundImage = '-webkit-gradient(linear, left top, right top, color-stop(' + value + ', #FFF), color-stop(' + value + ', #333))';
            };
            this.$refs.volume.addEventListener('input', sliderStyle);
            this.$refs.volume.addEventListener('change', sliderStyle);
            sliderStyle();
        },

        initializePositionControl() {
            this.$refs.video.addEventListener('timeupdate', () => {
                if(this.$refs.video) {
                    this.currentTime = Math.round(this.$refs.video.currentTime * 1000);
                    this.duration = Math.round(this.$refs.video.duration * 1000);
                    this.$refs.currentTimeDisplay.innerHTML = this.prettify(Math.round(this.currentTime / 1000));
                    this.$refs.durationDisplay.innerHTML = this.prettify(Math.round(this.$refs.video.duration)) + ' &nbsp;&nbsp;- ';
                    if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                        const value = Math.round((this.currentTime / this.duration) * 10000) / 10000;
                        this.$refs.timeline.style.backgroundImage = '-webkit-gradient(linear, left top, right top, color-stop(' + value + ', #FFF), color-stop(' + value + ', #333))';
                    }
                }
            });
            this.changePlay();
        },

        initializeMouseFade() {
            let hide = null;

            this.$refs.controls.addEventListener('mouseenter', () => {
                this.$refs.controls.style.opacity = 1;
                this.$refs.controls.style.cursor = 'default';
                window.clearTimeout(hide);
                hide = window.setTimeout(() => {
                    this.$refs.controls.style.opacity = 0;
                    this.$refs.controls.style.cursor = 'none';
                }, 2000);
            });

            this.$refs.controls.addEventListener('mouseleave', () => {
                this.$refs.controls.style.opacity = 0;
                this.$refs.controls.style.cursor = 'default';
            });

            this.$refs.controls.addEventListener('mousemove', () => {
                this.$refs.controls.style.opacity = 1;
                this.$refs.controls.style.cursor = 'default';
                window.clearTimeout(hide);
                hide = window.setTimeout(() => {
                    if(this.$refs.controls) {
                        this.$refs.controls.style.opacity = 0;
                        this.$refs.controls.style.cursor = 'none';
                    }
                }, 2000);
            });
        },

        initializeVideoFeed() {
            /*
            if(Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource('https://nelva.fr/stream/source.m3u8');
                hls.attachMedia(this.$refs.video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    this.$refs.video.play();
                });
            } else if(this.$refs.video.canPlayType('application/vnd.apple.mpegurl')) {
                this.$refs.video.src = 'https://nelva.fr/stream/source.m3u8';
                this.$refs.video.addEventListener('loadedmetadata', () => {
                    this.$refs.video.play();
                });
            }
        */
        },

        initializeAlternativeCommands() {
            this.$refs.player.addEventListener('keypress', event => {
                switch(event.code) {
                    case 'KeyF': this.changeFullscreen(); break;
                    case 'Space': this.changePlay(); break;
                }
            });
            this.$refs.player.addEventListener('dblclick', () => {
                this.changeFullscreen();
            });
            this.$refs.player.addEventListener('click', () => {
                this.changePlay();
            });
        },

        changeVolume() {
            this.$refs.video.volume = this.$refs.volume.value / 100;
            if(this.$refs.video.volume === 0 && !this.$refs.volumeButton.classList.contains('sound-mute')) {
                this.$refs.volumeButton.classList.add('sound-mute');
            }
            if(this.$refs.video.volume > 0 && this.$refs.volumeButton.classList.contains('sound-mute')) {
                this.$refs.volumeButton.classList.remove('sound-mute');
            }
            this.$refs.volumeDisplay.innerHTML = Math.round(this.$refs.video.volume * 100) + ' %';
        },

        changePlay() {
            const isFirefox = typeof InstallTrigger !== 'undefined';
            const playing = !!(this.$refs.video.currentTime && this.$refs.video.currentTime > 0 && !this.$refs.video.paused && !this.$refs.video.ended && this.$refs.video.readyState > 2);
            if(!isFirefox) {
                this.$refs.animation.setAttribute('from', !playing ? this.pause : this.play);
                this.$refs.animation.setAttribute('to', !playing ? this.play : this.pause);
                this.$refs.animation.beginElement();
            }

            if(playing) {
                this.$refs.video.pause();
            } else {
                this.$refs.video.play();
            }
        },

        openFullscreen() {
            if(this.$refs.sizer) {
                this.$refs.sizer.style.width = '100vw';
                this.oldWidth = this.$refs.player.style.width;
                this.$refs.player.style.width = '100vw';
                const requestMethod = this.$refs.player.requestFullScreen || this.$refs.player.webkitRequestFullScreen || this.$refs.player.mozRequestFullScreen || this.$refs.player.msRequestFullScreen;
                if(requestMethod) {
                    requestMethod.call(this.$refs.player);
                }
            }
        },

        exitFullscreen() {
            this.$refs.sizer.style.width = '100%';
            this.$refs.player.style.width = this.oldWidth;
            if(document.exitFullscreen) {
                document.exitFullscreen();
            } else if(document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        },

        changeFullscreen() {
            if(this.fullscreen) {
                this.exitFullscreen();
                this.$refs.fullscreenIcon.innerHTML = 'fullscreen';
            } else {
                this.openFullscreen();
                this.$refs.fullscreenIcon.innerHTML = 'fullscreen_exit';
            }
            this.fullscreen = !this.fullscreen;
        },

        changeMute() {
            if(this.$refs.volumeButton.classList.contains('sound-mute')) {
                this.$refs.volumeButton.classList.remove('sound-mute');
            } else {
                this.$refs.volumeButton.classList.add('sound-mute');
                this.$refs.volume.value = 0;
                const value = (this.$refs.volume.value - this.$refs.volume.getAttribute('min')) / (this.$refs.volume.getAttribute('max') - this.$refs.volume.getAttribute('min'));
                this.$refs.volume.style.backgroundImage = '-webkit-gradient(linear, left top, right top, color-stop(' + value + ', #FFF), color-stop(' + value + ', #333))';
            }
            this.changeVolume();
        },

        changePosition() {
            this.currentTime = this.$refs.timeline.value;
            this.$refs.video.currentTime = this.currentTime / 1000;
        },

        prettify(input) {
            const time = parseInt(input, 10);
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time - (hours * 3600)) / 60);
            const seconds = time - (hours * 3600) - (minutes * 60);
            let string = '';
            if(hours > 0) {
                string += hours < 10 ? '0' + hours : hours;
                string += ':';
            }
            string += minutes < 10 ? '0' + minutes : minutes;
            string += ':';
            string += seconds < 10 ? '0' + seconds : seconds;
            return string;
        }
    }
};
</script>

<style lang="css">
.player {
    position: relative;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}

.player-inner, .p-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.sizer {
    width: 100%;
    display: block;
}

.z1 { z-index: 1; }
.z2 { z-index: 2; }
.z3 { z-index: 3; }

.controls, .loader, .video, .video video {
    width: 100%;
    height: 100%;
}

.controls {
    transition: 200ms;
}

.controls .logo img {
    width: 15%;
    display: block;
    opacity: .75;
}

.controls .logo {
    padding: 1%;
}

.controls .control-bar {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 35px;
    background-color: rgba(0, 0, 0, .5);
    text-align: left;
    padding: 0 10px;
    padding-bottom: 5px;
}

.control-bar .control {
    height: 30px;
    float: left;
}

.control-button {
    width: 30px;
    height: 30px;
    float: left;
    transition: 200ms;
}

.control-button > * {
    color: white !important;
}

.progress {
    position: absolute;
    width: 100%;
    bottom: 35px;
    padding-top: 5px;
    background-color: rgba(0, 0, 0, .5);
}
.progress-slider {
    width: calc(100% - 20px);
    margin: 0 10px;
}

.time, .time > *, .status, .status > * {
    color: white;
    vertical-align: middle;
    line-height: 30px;
}

.status {
    padding-left: 10px;
    font-weight: bold;
}

.status .circle {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin-right: 5px;
    display: inline-block;
}

.live {
    background-color: red;
}

.replay {
    background-color: #4a69bd;
}

.volume-control {
    height: 30px;
    transition: 250ms;
    width: 0px;
    overflow: hidden;
    margin-left: 5px;
    margin-right: 5px;
}

.sound {
    width: 30px;
    height: 30px;
    position: relative;
    cursor: pointer;
    display: inline-block;
}
.sound--icon {
    color: #FFF;
    width: 100%;
    height: 100%;
    line-height: 100%;
    font-size: 30px;
    display: block;
    margin: auto;
    position: relative;
    top: -2px;
}
.sound--icon > i {
    color: white !important;
}
.sound--wave {
    position: absolute;
    border: 2px solid transparent;
    border-right: 2px solid #FFF;
    border-radius: 50%;
    transition: all 200ms;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.sound--wave_one {
    width: 50%;
    height: 50%;
}
.sound--wave_two {
    width: 75%;
    height: 75%;
}
.sound-mute .sound--wave {
    border-radius: 0;
    width: 50%;
    height: 50%;
    border-width: 0 2px 0 0;
}
.sound-mute .sound--wave_one {
    -webkit-transform: rotate(45deg) translate3d(0, -45%, 0);
    transform: rotate(45deg) translate3d(0, -45%, 0);
}
.sound-mute .sound--wave_two {
    -webkit-transform: rotate(-45deg) translate3d(0, 45%, 0);
    transform: rotate(-45deg) translate3d(0, 45%, 0);
}

.control-volume:hover > .volume-control {
    width: 60px;
}

#volume-input, .volume-control {
    display: inline-block;
}

#volume-input, #progress-slider {
    outline: none;
    -webkit-appearance: none;
    -moz-apperance: none;
    height: 5px;
}

#volume-input {
    width: 60px;
    margin-top: 12px;
    border-radius: 6px;
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
    .time, .status {
        position: relative;
        top: 2px;
    }

    #volume-input {
        background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, #FFF), color-stop(0.5, #333));
    }

    #progress-slider {
        background-image: -webkit-gradient(linear, left top, right top, color-stop(0.0, #FFF), color-stop(0.0, #333));
    }

    #volume-input::-webkit-slider-thumb, #progress-slider::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        background-color: #FFF;
        border: 0px;
        height: 12px;
        width: 12px;
        border-radius: 100%;
        transition: 250ms;
        cursor: pointer;
    }

    #progress-slider::-webkit-slider-thumb {
        border-radius: 0px;
        width: 4px;
    }

    #volume-input:hover::-webkit-slider-thumb {
        height: 15px;
        width: 15px;
    }
}

@-moz-document url-prefix() {
    #volume-input::-moz-range-thumb, #progress-slider::-moz-range-thumb {
        -moz-appearance: none;
        background-color: #FFF;
        border: 0px;
        height: 12px;
        width: 12px;
        border-radius: 100%;
        transition: 250ms;
        cursor: pointer;
    }

    #progress-slider::-moz-range-thumb {
        border-radius: 0px;
        width: 4px;
    }

    #volume-input:hover::-moz-range-thumb {
        height: 15px;
        width: 15px;
    }

    #volume-input::-moz-range-track, #progress-slider::-moz-range-track {
        border: 0px;
        background-color: #333;
        height: 5px;
        border-radius: 6px;
    }

    #volume-input::-moz-range-progress, #progress-slider::-moz-range-progress {
        background-color: white;
        height: 5px;
        border-radius: 6px;
    }

    #progress-slider::-moz-range-track, #progress-slider::-moz-range-progress {
        border-radius: 0px;
    }
}

.fullscreen:hover > i {
    font-size: 30px;
}

button { outline: none; }
.off { opacity: 0; }

.lds-ripple {
    display: inline-block;
    position: relative;
    top: calc(50% - 32px);
    width: 64px;
    height: 64px;
}
.lds-ripple div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
}
@keyframes lds-ripple {
    0% {
        top: 32px;
        left: 32px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: -1px;
        left: -1px;
        width: 64px;
        height: 64px;
        opacity: 0;
    }
}

</style>
