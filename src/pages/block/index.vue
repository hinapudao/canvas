<template>
    <div class="main">
        <canvas id="block" ref="canvas"></canvas>
    </div>
</template>

<script>
    import Ctx from 'src/assets/ctx';

    export default {
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
        methods: {
            init () {
                this.resetSize();
            },
            resetSize () {
                let ctx = this.ctx;
                let winWidth = this.winWidth = window.innerWidth;
                let winHeight = this.winHeight = window.innerHeight;
                this.$refs.canvas.width = winWidth;
                this.$refs.canvas.height = winHeight;
                
                ctx.clearRect(0, 0, this.winWidth, this.winHeight);

                ctx.fillStyle = '#eee';
                ctx.fillRect(0, 0, this.winWidth, this.winHeight);
            },
        }
    };
</script>

<style lang="scss">
    @import 'src/assets/base';
</style>
