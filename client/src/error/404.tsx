import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const CustomContainer = styled(Container)({
  textAlign: "center"
})

const ErrorTitle = styled(Typography)({
  marginTop: 100,
  marginBottom: 20
})

const ErrorMessage = styled(Typography)({
  marginBottom: 100
})

const Error404 = (): JSX.Element => {
  return (
    <div>
      <CustomContainer fixed>
        <ErrorTitle variant="h3">ページが見つかりませんでした</ErrorTitle>
        <ErrorMessage variant="body1">
          申し訳ありませんが、お探しのページは削除されたか、URLが変更された可能性がございます。
        </ErrorMessage>
        <Link to="/">トップに戻る</Link>
      </CustomContainer>
    </div>
  )
}

export default Error404
