# Sefer Chat frontend library

This library contains a React chat component that can work various settings, like admin panel, public website and the app.

To use the Chat component, the component need to be wrapped in the styled components **ThemeProvider** provider the follow theme

```ts
  export interface DefaultTheme {
    colors: {
        primary: string
        secondary: string
        tertiary: string
        text: string
        background: string
        error: string
        lightGray: string
    }
    screens: { medium: number }
    maxWidth: number
}
```

Additionally, it needs to be wrapped the **FetchContextProvider** from **martin-hillford/sefer-fetch** library.
