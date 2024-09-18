import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTetrisStore = defineStore('tetris', () => {
  const currentScore = ref(0)

  const setScore = (index: number) => {
    currentScore.value +=index
  }

  const setDefaultScore = () => currentScore.value = 0
  
  

  return { setScore, setDefaultScore }
})
