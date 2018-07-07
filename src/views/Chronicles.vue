<template lang="html">
    <v-container class="custom-fluid" fluid align-center>
        <v-layout row wrap>
            <v-flex xs12>
                <img src="@/assets/img/design/titles/chronicles.png"/>
            </v-flex>
            <v-flex md4>
                <v-card class="full-height">
                    <v-card-text class="text-xs-left">
                        <div class="canvas-controller">
                            <v-form>
                                <v-text-field @keyup="draw" v-model="channel" label="Chaîne"></v-text-field>
                                <v-text-field @keyup="draw" v-model="headline" label="Headline"></v-text-field>
                                <v-text-field @keyup="draw" v-model="description" label="Description"></v-text-field>
                                <v-text-field @keyup="draw" v-model="date" label="Date"></v-text-field>
                                <v-text-field @keyup="draw" v-model="place" label="Place"></v-text-field>
                                <input ref="input" type="file">
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex md8>
                <v-card class="full-height">
                    <v-card-text class="text-xs-center">
                        <canvas width="854" height="480" ref="canvas"></canvas>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xl12>
                <v-card class="full-height">
                    <v-card-text class="text-xs-center">
                        <v-btn class="btn-primary" flat ref="download" @click="download"><v-icon>cloud_download</v-icon>&nbsp;Télécharger</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-dialog v-model="error.state" max-width="500px">
                <v-card>
                    <v-card-title primary-title class="card-title text-xs-center">
                        <h3 class="headline">Erreur</h3>
                    </v-card-title>
                    <v-card-text class="text-error text-xs-center">
                        <v-icon>error</v-icon> {{ error.message }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="btn-primary" @click.stop="error.state = false">OK</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Chroniques',
    data() {
        return {
            channel: 'BBC News',
            headline: 'No news today',
            description: 'Huw Edwards doesn\'t even have a story about cats',
            date: '2017',
            place: 'Cardiff',
            context: null,
            previous: {
                x: 0,
                y: 0
            },
            position: {
                x: 0,
                y: 0
            },
            dragging: false,
            error: {
                state: false,
                message: ""
            },
            image: new Image()
        }
    },
    methods: {
        init() {
            this.context = this.$refs.canvas.getContext('2d');

            this.$refs.input.onchange = (event) => {
                let file = event.target.files[0];
                if(file.type.match('image.*')) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onerror = () => {
                        this.error.message = 'Une erreur est survenue lors de la lecture de l\'image. Réessayez ?';
                        this.error.state = true;
                    };

                    reader.onload = (event) => {
                        if(event.target.readyState === FileReader.DONE) {
                            this.image.src = event.target.result;
                            this.image.onload = this.draw;
                        }
                    };
                } else {
                    this.error.message = 'Le fichier doit être une image.';
                    this.error.state = true;
                }
            };

            this.$refs.canvas.onmousedown = (event) => {
                this.previous = {
                    x: parseInt(event.clientX - this.$refs.canvas.offsetLeft),
                    y: parseInt(event.clientY - this.$refs.canvas.offsetTop)
                };
                this.dragging = true;
            };

            this.$refs.canvas.onmousemove = (event) => {
                if(!this.dragging) {
                    return;
                }

                this.position.x += parseInt(event.clientX - this.$refs.canvas.offsetLeft - this.previous.x);
                this.position.y += parseInt(event.clientY - this.$refs.canvas.offsetTop - this.previous.y);

                this.previous = {
                    x: parseInt(event.clientX - this.$refs.canvas.offsetLeft),
                    y: parseInt(event.clientY - this.$refs.canvas.offsetTop)
                };

                this.draw();
            };

            this.$refs.canvas.onmouseup = () => { this.dragging = false; }
            document.onmouseup = () => { this.dragging = false; }
            this.draw();
        },

        draw() {
            this.context.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            this.context.fillStyle = '#343434';
            this.context.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            this.context.drawImage(this.image, this.position.x, this.position.y, this.$refs.canvas.width, this.$refs.canvas.height);

            var ending = this.write('LIVE', 'white', 'red', '24px arial', 30, 30);
            this.write(this.channel, 'white', 'green', '24px arial', ending, 30);
            this.write(this.place, 'white', 'red', '32px arial', 30, this.$refs.canvas.height - 120);
            this.write(this.headline, 'black', 'white', '32px arial', 30, this.$refs.canvas.height - 83, true);
            ending = this.write(this.date, 'white', 'green', '19px arial', 30, this.$refs.canvas.height - 46);
            this.write(this.description, 'black', 'yellow', '19px arial', ending, this.$refs.canvas.height - 46, true);
        },

        write(text, color, background, font, x, y, full = false) {
            this.context.save();
            this.context.font = font;
            this.context.textBaseline = 'top';
            this.context.fillStyle = background;

            let width = (full) ? this.$refs.canvas.width : this.context.measureText(text).width;
            this.context.fillRect(x - 2, y - 2, width + 5, parseInt(font, 10) + 5);
            this.context.fillStyle = color;
            this.context.fillText(text, x, y);
            this.context.restore();
            return x + width + 5;
        },

        download() {
            let link = document.createElement('a');
            link.href = this.$refs.canvas.toDataURL();
            link.download = this.channel + '.png';
            link.click();
        },
    },
    mounted() {
        this.init();
    },
}
</script>

<style lang="css" scoped>
.full-height {
    height: 100% !important;
    border: 0px !important;
    border-radius: 0px !important;
}

.text-error, .text-error > i {
    color: #ff5252 !important;
}


@media(min-width: 1650px) {
    .custom-fluid {
        padding: 0 10%;
    }
}
</style>
