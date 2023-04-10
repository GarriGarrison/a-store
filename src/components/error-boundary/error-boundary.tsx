import { Component, ErrorInfo, ReactNode } from 'react'
import { Typography } from '@alfalab/core-components/typography'
import errorBoundary from './img/errorBoundary.jpg'
import styles from './error-boundary.module.css'


type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <Typography.TitleResponsive tag="h1" view="xlarge">
            Упс, что-то сломалось
          </Typography.TitleResponsive>

          <img src={errorBoundary} alt="Not Found" />
        </div>
      )
    }

    return this.props.children
  }
}
