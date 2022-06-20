import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slice/playerSlice'
import enemiesReducer from './slice/enemiesSlice'
import cardsReducer from './slice/cardsSlice'
import fightEnemiesReducer from './slice/fightEnemiesSlice'
import gameTitleReducer from './slice/gameTitleSlice'
import rootSelectReducer from './slice/rootSelectSlice'
import battleReducer from './slice/battleSlice'
import turnReducer from './slice/turnSlice'
import playerDamageReducer from './slice/playerDamageSlice'
import choiceEnemyReducer from './slice/choiceEnemySlice'
import drawButtonReducer from './slice/drawButtonSlice'
import playerActionCountReducer from './slice/playerActionCountSlice'
import rewardReducer from './slice/rewardSlice'
import enemyDefeatedReducer from './slice/enemyDefeatedSlice'
import enemyListReducer from './slice/enemyListSlice'
import floorReducer from './slice/floorSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    enemies: enemiesReducer,
    cards: cardsReducer,
    fightEnemies: fightEnemiesReducer,
    gameTitle: gameTitleReducer,
    rootSelect: rootSelectReducer,
    battle: battleReducer,
    turn: turnReducer,
    playerDamage: playerDamageReducer,
    choiceEnemy: choiceEnemyReducer,
    drawButton: drawButtonReducer,
    playerActionCount: playerActionCountReducer,
    reward: rewardReducer,
    enemyDefeated: enemyDefeatedReducer,
    enemyList: enemyListReducer,
    floor: floorReducer
  }
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
