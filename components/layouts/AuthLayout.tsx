import { Box } from "@mui/material"
import Head from "next/head"
import { FC, PropsWithChildren } from "react"

interface Props {
    title: string
}

export const AuthLayout:FC<PropsWithChildren<Props>> = ({children, title}) => {

  return (

    <>
        <Head>
            <title>{ title }</title>
        </Head>

        <main>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh)'
                sx={{
                    background: 'linear-gradient(144deg, rgba(255,238,239,1) 19%, rgba(250,114,102,1) 71%, rgba(53,94,159,1) 100%)'
                }}
            >
                { children }
            </Box>
        </main>
    </>

  )
}
