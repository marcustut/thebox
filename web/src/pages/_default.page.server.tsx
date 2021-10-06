import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { AppProvider } from '@/context'
import { createThemeHelper, createEmotionCache } from '@/utils'
import createEmotionServer from '@emotion/server/create-instance'
import logoUrl from '/logo.svg'
import type { PageContext } from '@/types/ssr'
import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'apolloInitialState']

export const render = async (pageContext: PageContextBuiltIn & PageContext) => {
  // Get page context from server
  const { Page, pageProps, apolloClient } = pageContext
  // Create cache for emotion (to work with MUI)
  const emotionCache = createEmotionCache()
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(emotionCache)
  const theme = createThemeHelper('dark')
  const pageHtml = ReactDOMServer.renderToString(
    <AppProvider apolloClient={apolloClient} pageContext={pageContext} emotionCache={emotionCache} theme={theme}>
      <Page {...pageProps} />
    </AppProvider>
  )

  // Get the CSS from emotion
  const emotionChunks = extractCriticalToChunks(pageHtml)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)

  // See https://vite-plugin-ssr.com/html-head
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || 'The Box'
  const desc = (documentProps && documentProps.description) || 'Think out of the Box'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl as unknown as string}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        ${dangerouslySkipEscape(emotionCss)}
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}

export const onBeforeRender = async (pageContext: PageContext) => {
  const { Page, pageProps, apolloClient } = pageContext
  const theme = createThemeHelper('dark')
  const tree = (
    <AppProvider
      apolloClient={apolloClient}
      pageContext={pageContext}
      emotionCache={createEmotionCache()}
      theme={theme}
    >
      <Page {...pageProps} />
    </AppProvider>
  )
  const pageHtml = await getDataFromTree(tree)
  const apolloInitialState = apolloClient.extract()
  return { pageContext: { pageHtml, apolloInitialState } }
}