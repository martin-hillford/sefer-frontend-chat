// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
  colors: {
    default: string
    defaultInverse: string
    defaultSupport: string

    primary: string
    primaryInverse: string

    secondary: string
    secondaryInverse: string

    tertiary: string
    tertiaryInverse: string

    error: string
    errorInverse: string
  }
  screens: { medium: number, large: number }
  maxWidth: number
}
}
