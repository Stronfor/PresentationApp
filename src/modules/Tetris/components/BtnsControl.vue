<script setup lang="ts">
    import {ref, onUnmounted, type PropType } from "vue";

    import ArrowIcon from "@/components/icons/ArrowIcon.vue";
    import ArrowRotate from "@/components/icons/ArrowRotate.vue";
    import PlayIcon from "@/components/icons/PlayIcon.vue";
    import PauseImg from "@/components/icons/PauseIcon.vue";

    import {DegEnum, type IBoard, type IFigures} from "../composables/types"

    const controller = new AbortController();
    const signal = controller.signal;

    onUnmounted(() => controller.abort())

    const {isPaused, currentFigure, board, width, isGameStarted, isGameOver } = defineProps({
        isPaused: {type: Boolean, default: false},
        currentFigure: {type: Object as PropType<IFigures>, required: false},
        board: {type: Object as PropType<IBoard>, required: true},
        width: {type: Number, required: true},
        isGameStarted: {type: Boolean, required: true},
        isGameOver: {type: Boolean, required: true}
    })

    const emits = defineEmits(["speedChange", "pause", "start"])
    enum SpeedEnum {
        fast = 50,
        normal = 500
    }

    const changeSpeed = (speedVal: SpeedEnum) => emits("speedChange", speedVal);

    const Rotate = () => {
        if(currentFigure && !isPaused){
            const list = [DegEnum.DEFAULT, DegEnum.ONE, DegEnum.TWO, DegEnum.THREE];
            const result = list.indexOf(currentFigure.degree)
            const index = result === list.length-1 ? 0 : result + 1
            return currentFigure.rotateDeg(list[index], board)
        }
    }

    const moveRight = () => {
        if(currentFigure && !isPaused){
            currentFigure.moveRight(board)
        }
    }

    const moveLeft = () => {
        if(currentFigure && !isPaused){
            currentFigure.moveLeft(board)
        }
    }

// =======> Events <========

    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft" && !isPaused){
            e.preventDefault()
            btnPushLeft.value = true
            if(currentFigure) return currentFigure.moveLeft(board);
        }
        if (e.key === "ArrowRight" && !isPaused){
            e.preventDefault()
            btnPushRight.value = true
            if(currentFigure) return currentFigure.moveRight(board);
        }
        if (e.key === "ArrowDown" && !isPaused){
            e.preventDefault()
            btnPushDown.value = true
            if(currentFigure) return changeSpeed(SpeedEnum.fast);
        }
        if (e.key === "ArrowUp" && !isPaused) {
            e.preventDefault()
            btnPushUp.value = true
            if(currentFigure) return Rotate();
        }
        if (e.code === "Space"){
            e.preventDefault()
            btnPushPause.value = true
            return emits("pause");
        }
    }, {signal});

    document.addEventListener('keyup', (e) => {
        e.preventDefault()
        btnPushUp.value = false; 
        btnPushDown.value = false;
        btnPushRight.value = false;
        btnPushLeft.value = false;
        btnPushPause.value = false;
        btnPushStart.value = false
        if(e.key === "ArrowDown") return changeSpeed(SpeedEnum.normal);
    }, {signal});

    const btnPushUp = ref(false)
    const btnPushDown = ref(false)
    const btnPushRight = ref(false)
    const btnPushLeft = ref(false)
    const btnPushStart = ref(false)
    const btnPushPause = ref(false)
    const active = "box-shadow: inset 0 0.1em 0.4em #d4d4d8;";

</script>
<template>
    <div @touchstart.prevent class="flex flex-col mb-14 absolute md:relative md:top-40 top-[500px] md:right-0 -right-0">
        <button
            @mousedown="btnPushUp = true"
            @mouseup="btnPushUp = false"
            @touchstart="btnPushUp = true; Rotate()"
            @touchendt="btnPushUp = false"
            @mouseout.prevent="btnPushUp = false"
            @click="Rotate"
            :style="btnPushUp ? active : null"
            class="shadow-xl -mb-2 opacity-50 shadow-zinc300 dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-0 md:p-4 rounded-t-xl rounded-b-3xl mx-auto w-12 h-16 md:w-16 md:h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
        >
        <ArrowRotate _class="mx-auto text-hoverText md:h-[32px] md:w-[32px] h-[26px] w-[26px]" />
        </button>
        <div class="flex justify-center gap-10">
            <button
                @mousedown="btnPushLeft = true"
                @mouseup="btnPushLeft = false"
                @touchstart="btnPushLeft = true; moveLeft()"
                @touchend="btnPushLeft = false"
                @mouseout.prevent="btnPushLeft = false"
                :style="btnPushLeft ? active : null"
                @click="moveLeft()"
                class="shadow-xl opacity-50 dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-0 md:p-4 rounded-l-xl rounded-r-3xl md:w-20 md:h-16 w-16 h-12 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
            >
                <ArrowIcon _class="mx-auto text-hoverText md:h-[32px] md:w-[32px] h-[26px] w-[26px]" />
            </button>
            <button
                @mousedown.prevent="btnPushRight = true"
                @mouseup.prevent="btnPushRight = false"
                @touchstart="btnPushRight = true; moveRight()"
                @touchend="btnPushRight = false"
                @mouseout.prevent="btnPushRight = false"
                :style="btnPushRight ? active : null"
                @click="moveRight()"
                class="shadow-xl opacity-50 dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-0 md:p-4 rounded-r-xl rounded-l-3xl md:w-20 md:h-16 w-16 h-12 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
            >
                <ArrowIcon _class="mx-auto text-hoverText rotate-180 md:h-[32px] md:w-[32px] h-[26px] w-[26px]" />
            </button>
        </div>
        <button
            @mousedown.prevent="changeSpeed(SpeedEnum.fast); btnPushDown = true"
            @mouseup.prevent="changeSpeed(SpeedEnum.normal); btnPushDown = false"
            @touchstart="changeSpeed(SpeedEnum.fast);btnPushDown = true"
            @touchend="changeSpeed(SpeedEnum.normal);btnPushDown = false"
            @mouseout.prevent="changeSpeed(SpeedEnum.normal); btnPushDown = false"
            :style="btnPushDown ? active : null"
            class="mb-10 -mt-2 opacity-50 shadow-xl dark:shadow-md dark:shadow-zinc500 outline-none border border-zinc300 dark:border-zinc600 p-0 md:p-4 rounded-b-xl rounded-t-3xl mx-auto w-12 h-16 md:w-16 md:h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
        >
            <ArrowIcon _class="mx-auto text-hoverText -rotate-90 md:h-[32px] md:w-[32px] h-[26px] w-[26px]" />
        </button>

        <div class="absolute md:relative md:right-0 top-12 right-48 flex mt-10 justify-between gap-5">
            <button
                @mousedown="btnPushStart = true"
                @mouseup="btnPushStart = false"
                @touchstart="btnPushStart = true; emits('start')"
                @touchend="btnPushStart = false"
                @mouseout.prevent="btnPushStart = false"
                :style="btnPushStart ? active : null"
                @click="emits('start')"
                class="sm:w-30 shadow-xl px-4 rounded-full dark:shadow-md dark:shadow-zinc500 text-hoverText outline-none border border-zinc300 dark:border-zinc600 mb-24 sm:rounded-xl mx-auto h-16  sm:h-20 dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
            >
                <span v-if="width >= 480">{{ isGameStarted ? "Stop Game" : "Start New Game" }}</span>
                <span v-else>{{ isGameStarted ? "Stop" : "Start" }}</span>
            </button>
            <button
                @mousedown="btnPushPause = true"
                @mouseup="btnPushPause = false"
                @touchstart="btnPushPause = true; emits('pause')"
                @touchend="btnPushPause = false"
                @mouseout.prevent="btnPushPause = false"
                :style="btnPushPause ? active : null"
                :disabled="isGameOver"
                @click="emits('pause')"
                class="shadow-xl dark:shadow-md md:h-20 dark:shadow-zinc500 rounded-full outline-none md:w-24 h-16 w-20 border border-zinc300 dark:border-zinc600 p-4 md:rounded-xl mx-auto dark:bg-zinc900 dark:hover:bg-zinc800 bg-zinc100 hover:bg-zinc200 transition"
            >
                <PlayIcon
                    v-if="isPaused"
                    _class="mx-auto text-hoverText"
                    width="32"
                    height="32"
                />
                <PauseImg
                    v-else
                    _class="mx-auto text-hoverText"
                    width="32"
                    height="32"
                />
            </button>
        </div>
    </div>
</template>