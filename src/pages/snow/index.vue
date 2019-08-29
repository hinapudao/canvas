<template>
    <div class="main">
        <canvas ref="canvas" id="snow""></canvas>

        <div class="controller">
            <div class="item">
                <span>背景</span>
                <input type="text" v-model="bgColor">
            </div>
            <div class="item">
                <span>数量</span>
                <input type="text" v-model="nums">
            </div>
            <div class="item">
                <span>半径</span>
                <input type="text" v-model="radius">
            </div>
            <div class="download" @click="exportCanvasAsPNG('snow', 'snow')">保存截图</div>
        </div>
    </div>
</template>

<script>
    import 'raf.js';
    import Ctx from 'src/assets/ctx';

    export default {
        data () {
            return {
                particles: [],
                nums: 100,
                angle: 0,
                bgColor: '#6b92b9',
                radius: 5,
                raf: null,
                reStart: false
            };
        },
        computed: {
            ctx () {
                return Ctx(this.$refs.canvas, '2d');
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.init();
            });
        },
        watch: {
            radius () {
                this.particles = [];
                this.pushParticle();
            },
            nums () {
                this.particles = [];
                this.pushParticle();
            }
        },
        methods: {
            init () {
                this.resetSize();
                this.pushParticle();
                requestAnimationFrame(this.drawSnow);
                window.addEventListener('resize', this.resetSize);
            },
            resetSize () {
                let ctx = this.ctx;
                let winWidth = this.winWidth = window.innerWidth;
                let winHeight = this.winHeight = window.innerHeight;
                this.$refs.canvas.width = winWidth;
                this.$refs.canvas.height = winHeight;
            },
            pushParticle () {
                for (let i = 0; i < this.nums; i++) {
                    this.particles.push({
                        x: Math.random() * this.winWidth,
                        y: Math.random() * this.winHeight,
                        r: Math.random() * this.radius,
                        d: Math.random() * this.nums
                    });
                }
            },
            drawSnow () {
                let ctx = this.ctx;
                ctx.clearRect(0, 0, this.winWidth, this.winHeight);

                ctx.fillStyle = this.bgColor;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.rect(0, 0, this.winWidth, this.winHeight);
                ctx.fill();

                ctx.fillStyle = 'rgba(255, 255, 255, .8)';
                ctx.beginPath();

                for (let i = 0; i < this.nums; i++) {
                    let curParticle = this.particles[i];
                    ctx.moveTo(curParticle.x, curParticle.y);
                    ctx.arc(curParticle.x, curParticle.y, curParticle.r, 0, Math.PI * 2);
                }

                ctx.fill();
                this.updateCanvas();
            },
            updateCanvas () {
                this.angle += .01;

                for(let i = 0; i < this.nums; i++) {
                    let curParticle = this.particles[i];
                    curParticle.x += Math.sin(this.angle) * 2;
                    curParticle.y += Math.cos(this.angle + curParticle.d) + 1 + curParticle.r / 2;
                    
                    if (curParticle.x > this.winWidth + this.radius || curParticle.x < -this.radius || curParticle.y > this.winHeight) {

                        if (i % 3 > 0) {
                            this.particles[i] = {
                                x: Math.random() * this.winWidth,
                                y: -10,
                                r: curParticle.r,
                                d: curParticle.d
                            };
                        } else if (Math.sin(this.angle) > 0) {
                            this.particles[i] = {
                                x: -this.radius,
                                y: Math.random() * this.winHeight,
                                r: curParticle.r,
                                d: curParticle.d
                            };
                        } else {
                            this.particles[i] = {
                                x: this.winWidth + this.radius,
                                y: Math.random() * this.winHeight,
                                r: curParticle.r,
                                d: curParticle.d
                            };
                        }
                    }
                }

                requestAnimationFrame(this.drawSnow);
            },
            exportCanvasAsPNG (id, fileName) {
                let canvasElement = document.getElementById(id);
                let MIME_TYPE = 'image/png';
                let imgURL = canvasElement.toDataURL(MIME_TYPE);

                let dlLink = document.createElement('a');
                dlLink.download = fileName;
                dlLink.href = imgURL;
                dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

                document.body.appendChild(dlLink);
                dlLink.click();
                document.body.removeChild(dlLink);
            }
        }
    };
</script>

<style lang="scss">
    @import 'src/assets/base';
</style>
