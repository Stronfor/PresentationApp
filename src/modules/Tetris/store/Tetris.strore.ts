import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPlayerServerData } from '@/modules/Tetris/composables/types'

export const useTetrisStore = defineStore('tetris', () => {
 
  const player = ref<IPlayerServerData>({
    name: "",
    lastGame: "",
    record: 0
  });

  const setPlayer = (playerData: IPlayerServerData) => {
    player.value = {...playerData}
  }

  const setPlayerLastGame = (lastGameDate: string): void => {
      player.value.lastGame = lastGameDate
  }

  const setPlayerRecord = (record: number):void => {
    player.value.record = record
  }

  const setPlayerName = (name: string):void => {
    player.value.name = name
  }
  

  return { player, setPlayer, setPlayerLastGame, setPlayerRecord, setPlayerName }
})
