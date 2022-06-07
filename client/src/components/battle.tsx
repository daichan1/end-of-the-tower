import { useState, useEffect } from 'react'
import { createTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import ShieldIcon from '@mui/icons-material/Shield'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import LinearProgress from '@mui/material/LinearProgress'
import { EnemyType, CardType, PlayerType } from '../types/model/index'
import { EnemyDamaged, ChoiceEnemy } from '../types/battle/index'
import { CardEffectProps } from '../types/battle/cardEffect'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { cardDraw, recoveryDeck, updatePlayerStatus } from '../redux/slice/playerSlice'
import { updateEnemyStatus } from '../redux/slice/fightEnemiesSlice'
import { displayGameTitle } from '../redux/slice/gameTitleSlice'
import { displayRootSelect } from '../redux/slice/rootSelectSlice'
import { disableBattle } from '../redux/slice/battleSlice'
import Card from '../components/battle/card'
import ModalCard from '../components/battle/modalCard'
import uuid from '../common/uuid'
import { sleep, hpAdjustment, isRemainsHp, calcDamage, subtractHp } from '../common/battle'
import {
  checkRemainingHp, isRemainsEnergy, moveAllNameplateToCemetery,
  recoveryEnergy, nextBattleUpdatePlayerStatus, resetDefense,
  subtractEnergy, moveUsedCardToCemetery, initialPlayerStatus,
  searchCardEffect
} from '../battle/player'
import { isExistEnemy, resetDamaged } from '../battle/enemy'
import playerImg from '../images/player.png'
import enemyImg from '../images/enemy.png'
import '../styles/battle/style.scss'

const ENERGY_MAX = 3

const theme = createTheme()

const CustomAppBar = styled(AppBar)({
  backgroundColor: "black"
})

const PlayerTurn = styled(Paper)({
  backgroundColor: "#009688",
  padding: `${theme.spacing(1)}`,
  width: 160
})

const EnemyTurn = styled(Paper)({
  backgroundColor: "#d50000",
  padding: `${theme.spacing(1)}`,
  width: 160
})

const CustomTypography = styled(Typography)({
  marginRight: `${theme.spacing(3)}`
})

const CustomLinearProgress = styled(LinearProgress)({
  width: 100,
  margin: "auto"
})

const Battle = (): JSX.Element => {
  const [drawButtonDisable, setDrawButtonDisable] = useState<boolean>(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [displayPlayerDamage, setDisplayPlayerDamage] = useState<number>(-1)
  const [displayEnemyDamage, setDisplayEnemyDamage] = useState<number>(-1)
  const [choiceEnemyNumber, setChoiceEnemyNumber] = useState<number>(0)
  const [confirmCard, setConfirmCard] = useState<CardType>({
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    cost: 0,
    cardType: "",
    attack: 0,
    defense: 0,
    actionName: ""
  })

  const player = useAppSelector((state) => state.player)
  const fightEnemies = useAppSelector((state) => state.fightEnemies)
  const battle = useAppSelector((state) => state.battle)
  const dispatch = useAppDispatch()

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  const onClickDraw = (): void => {
    const drawNum = 5
    if (player.deck.length < drawNum) {
      dispatch(recoveryDeck())
    }
    dispatch(cardDraw(drawNum))
    setDrawButtonDisable(true)
  }

  const DisplayEnemyDamage = (props: EnemyDamaged): JSX.Element => {
    const { isDamaged } = props
    if (isDamaged) {
      return <span className='damage'>{displayEnemyDamage < 0 ? "" : displayEnemyDamage}</span>
    } else {
      return <span className='damage'></span>
    }
  }

  const DisplayChoiceEnemy = (props: ChoiceEnemy): JSX.Element => {
    const { enemyNumber } = props
    if (choiceEnemyNumber === enemyNumber) {
      return <div><ArrowDownwardIcon /></div>
    } else {
      return <div></div>
    }
  }

  const enemyImageClick = (num: number): void => {
    const enemiesObj: EnemyType[] = JSON.parse(JSON.stringify(fightEnemies))
    enemiesObj.forEach(enemy => enemy.isDamaged = false)
    setChoiceEnemyNumber(num)
    setDisplayPlayerDamage(-1)
    dispatch(updateEnemyStatus(enemiesObj))
  }

  const displayEnemies = (): JSX.Element[] => {
    const maxGridSize = 6
    const gridSize = maxGridSize / fightEnemies.length
    return fightEnemies.map((enemy, index) =>
      <Grid item xs={gridSize} className='enemy' key={index}>
        <DisplayChoiceEnemy enemyNumber={index} />
        <img src={enemyImg} alt={enemy.name} className='enemy-img' onClick={() => enemyImageClick(index)} />
        <DisplayEnemyDamage isDamaged={enemy.isDamaged} />
        <CustomLinearProgress variant="determinate" value={hpAdjustment(enemy.hp, enemy.maxHp, 0)}/>
        <Typography variant="subtitle1" component="div">
          {enemy.hp}/{enemy.maxHp}
        </Typography>
        <div>
          <ShieldIcon />
          <span>{enemy.defense}</span>
        </div>
      </Grid>
    )
  }

  const displayNameplate = (): JSX.Element[] => {
    return player.nameplate.map((card, index) =>
      <Grid item xs={1} key={index}>
        <Card
          card={card}
          isModal={false}
          clickCard={selectCard}
        />
      </Grid>
    )
  }

  const DisplayTurn = (): JSX.Element => {
    if (isPlayerTurn) {
      return <PlayerTurn elevation={1} >プレイヤーのターン</PlayerTurn>
    } else {
      return <EnemyTurn elevation={1} >敵のターン</EnemyTurn>
    }
  }

  const selectCard = (card: CardType): void => {
    setConfirmCard(card)
    setDisplayEnemyDamage(-1)
    handleOpen()
  }

  const actionCard = (card: CardType): void => {
    if (isRemainsEnergy(player, card)) {
      const playerObj: PlayerType = JSON.parse(JSON.stringify(player))
      const enemies: EnemyType[] = JSON.parse(JSON.stringify(fightEnemies))
      playerAction(playerObj, enemies, card)
      checkRemainingHp(enemies)
      if (!isExistEnemy(enemies)) {
        victory(playerObj)
      } else {
        dispatch(updatePlayerStatus(playerObj))
        dispatch(updateEnemyStatus(enemies))
      }
    } else {
      console.log("エナジーが不足しています")
    }
    handleClose()
  }

  const playerAction = (playerObj: PlayerType, enemies: EnemyType[], card: CardType): void => {
    const cardEffect = searchCardEffect(card.actionName)
    if (cardEffect === null) {
      console.log("実行できるカード効果が見つかりませんでした")
      return
    }
    if (card.cardType === "アタック") {
      const props: CardEffectProps = {
        type: "oneAttack",
        player: playerObj,
        enemy: enemies[choiceEnemyNumber],
        card: card,
        setDamage: setDisplayEnemyDamage
      }
      cardEffect.execution(props)
    }
    if (card.cardType === "スキル") {
      const props: CardEffectProps = {
        type: "guardSkill",
        player: playerObj,
        card: card
      }
      cardEffect.execution(props)
    }
    subtractEnergy(playerObj, card.cost)
    moveUsedCardToCemetery(playerObj, card)
  }

  const turnEnd = (): void => {
    const playerObj: PlayerType = JSON.parse(JSON.stringify(player))
    const enemiesObj: EnemyType[] = JSON.parse(JSON.stringify(fightEnemies))
    setIsPlayerTurn(false)
    resetDamaged(enemiesObj)
    setDisplayEnemyDamage(-1)
    moveAllNameplateToCemetery(playerObj)
    enemyTurn(playerObj, enemiesObj)
  }

  const enemyTurn = async (playerObj: PlayerType, enemiesObj: EnemyType[]): Promise<void> => {
    await sleep(2000)
    let totalDamage = 0
    enemiesObj.forEach((enemy) => {
      const damage = calcDamage(playerObj, enemy.attack)
      totalDamage += damage
      subtractHp(playerObj, damage)
    })
    setDisplayPlayerDamage(totalDamage)
    if (!isRemainsHp(playerObj)) {
      lose(playerObj)
    } else {
      enemyTurnEnd(playerObj, enemiesObj)
    }
  }

  const enemyTurnEnd = (playerObj: PlayerType, enemiesObj: EnemyType[]): void => {
    setIsPlayerTurn(true)
    setDrawButtonDisable(false)
    recoveryEnergy(playerObj, ENERGY_MAX)
    resetDefense(playerObj)
    dispatch(updatePlayerStatus(playerObj))
    dispatch(updateEnemyStatus(enemiesObj))
  }

  const victory = (playerObj: PlayerType): void => {
    // プレイヤーのステータスを更新
    nextBattleUpdatePlayerStatus(playerObj)
    dispatch(updatePlayerStatus(playerObj))
    dispatch(updateEnemyStatus([]))
    // 場面の更新
    setDisplayEnemyDamage(-1)
    setDisplayPlayerDamage(-1)
    setIsPlayerTurn(true)
    setDrawButtonDisable(false)
    dispatch(disableBattle())
    dispatch(displayRootSelect())
  }

  const lose = (playerObj: PlayerType): void => {
    // ステータスの初期化
    initialPlayerStatus(playerObj)
    dispatch(updatePlayerStatus(playerObj))
    dispatch(updateEnemyStatus([]))
    // 場面の初期化
    setDisplayEnemyDamage(-1)
    setDisplayPlayerDamage(-1)
    setIsPlayerTurn(true)
    setDrawButtonDisable(false)
    dispatch(disableBattle())
    dispatch(displayGameTitle())
  }

  useEffect((): void => {
    if (drawButtonDisable) { setDisplayPlayerDamage(-1) }
    if (!isPlayerTurn) { setDisplayPlayerDamage(-1) }
  }, [isPlayerTurn, drawButtonDisable])

  return (
    <div style={{ display: battle ? 'none' : '' }}>
      <CustomAppBar position='static'>
        <Toolbar>
          <CustomTypography variant="h6">プレイヤー</CustomTypography>
          <Typography variant="h6">{player && player.name}</Typography>
        </Toolbar>
      </CustomAppBar>

      <Container fixed>

        <Grid container justifyContent="center" className='turn'>
          <Grid item>
            <DisplayTurn/>
          </Grid>
        </Grid>

        <Grid container className='character'>
          <Grid item xs={6} className='player'>
            <img src={playerImg} alt='プレイヤー' className='player-img' />
            <span className='damage' key={uuid()}>{displayPlayerDamage < 0 ? "" : displayPlayerDamage}</span>
            <CustomLinearProgress variant="determinate" value={hpAdjustment(player.hp, player.maxHp, 0)}/>
            <Typography variant="subtitle1" component="div">
              {player && player.hp}/{player.maxHp}
            </Typography>
            <div>
              <ShieldIcon />
              <span>{player.defense}</span>
            </div>
          </Grid>
          { displayEnemies() }
        </Grid>

        <Grid container className='energy'>
          <Grid item xs={12}>
            {player && player.energy}/{ENERGY_MAX}
          </Grid>
        </Grid>

        <Grid container className='draw-button'>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={onClickDraw}
              disabled={ drawButtonDisable ? true : false }
            >
              ドロー
            </Button>
          </Grid>
          <Grid item xs={6} className='turn-end'>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={turnEnd}
              disabled={ isPlayerTurn ? false : true }
            >
              ターン終了
            </Button>
          </Grid>
        </Grid>

        <Grid container className='card-list'>
          <div className='deck'>
            <Avatar className='deck-count'>{player.deck.length}</Avatar>
          </div>
          { displayNameplate() }
          <div className='cemetery'>
            <Avatar className='cemetery-count'>{player.cemetery.length}</Avatar>
          </div>
        </Grid>

      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <div id='modal-modal-title'>
          <ModalCard
            card={confirmCard}
            clickCard={actionCard}
          />
        </div>
      </Modal>

    </div>
  )
}

export default Battle
