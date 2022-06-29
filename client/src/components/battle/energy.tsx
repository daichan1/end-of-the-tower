import { useAppSelector } from '../../redux/hooks'

const Energy = (): JSX.Element => {
  const ENERGY_MAX = 3
  const player = useAppSelector((state) => state.player)
  return (
    <div data-testid='energy'>
      {player && player.energy}/{ENERGY_MAX}
    </div>
  )
}

export default Energy
