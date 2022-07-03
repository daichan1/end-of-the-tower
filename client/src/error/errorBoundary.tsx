import { Component, ErrorInfo, ReactNode } from 'react'
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

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <CustomContainer fixed>
          <ErrorTitle variant="h3">エラーが発生しました</ErrorTitle>
          <ErrorMessage variant="body1">
            申し訳ありませんが、ページを表示できません
            再度時間をおいてからアクセスしてください
          </ErrorMessage>
        </CustomContainer>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
