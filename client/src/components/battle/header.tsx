import { createTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../redux/hooks'

const theme = createTheme()

const CustomAppBar = styled(AppBar)({
  backgroundColor: "black"
})

const CustomTypography = styled(Typography)({
  marginRight: `${theme.spacing(3)}`
})

const Header = (): JSX.Element => {
  const player = useAppSelector((state) => state.player)
  return (
    <CustomAppBar position='static'>
      <Toolbar>
        <CustomTypography variant="h6">プレイヤー</CustomTypography>
        <Typography variant="h6" data-testid='playerName'>{player && player.name}</Typography>
      </Toolbar>
    </CustomAppBar>
  )
}

export default Header
