import { CompanyProvider, UiProvider } from '@/context'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from '@/context/auth'
import { SWRConfig } from 'swr'
import { useEffect } from 'react'
import mongoose from 'mongoose'


function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {

  return (

    <SessionProvider session={ pageProps.session }  >
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CompanyProvider>
            <ThemeProvider theme={ lightTheme }>
              <CssBaseline/>
                <UiProvider>
                    <Component {...pageProps}/>
                </UiProvider>
            </ThemeProvider>
          </CompanyProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default App
