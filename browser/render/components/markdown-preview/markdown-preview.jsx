import React from 'react'
import marked from 'marked'
import CM from 'lib/config-manager'
import './markdown-preview.sass'

const baseMarkdownCSS = require('!!css-loader!./github-markdown.css') // eslint-disable-line

class MarkdownPreview extends React.Component {
  componentDidMount () {
    const previewDoc = this.refs.preview.contentWindow.document
    previewDoc.write(this.buildHTML())
  }

  getMarkdownCSSTheme () {
    const config = CM.get()
    let markdownCSSTheme = ''
    if (config.ui.theme === 'dark') {
      markdownCSSTheme = require('!!css-loader!./dark-markdown.css') // eslint-disable-line
    } else if (config.ui.theme === 'light') {
      markdownCSSTheme = require('!!css-loader!./light-markdown.css') // eslint-disable-line
    }
    return markdownCSSTheme
  }

  buildHTML () {
    const { markdown } = this.props
    const body = marked(markdown)
    return `<html>
        <head>
          <meta charset="UTF-8">
          <meta name = "viewport" content = "width = device-width, initial-scale = 1, maximum-scale = 1">
          <style id="style">${baseMarkdownCSS}</style>
          <style>${this.getMarkdownCSSTheme()}</style>
        </head>
        <body class='markdown-body'>${body}</body>
    </html>`
  }

  render () {
    return <iframe ref="preview" className="markdownPreview" />
  }
}

export default MarkdownPreview
