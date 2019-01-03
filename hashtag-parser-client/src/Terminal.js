import React, { Component } from 'react'
import Terminal from 'terminal-in-react'

const showMsg = query => {
  if (query.length == 0) return 'please enter command'
  if (query.length == 1) return 'missing parameter usage : prase #<hash-tag> '
  if (query.length > 2) return 'too many parameter usage : prase #<hash-tag> '

  fetch(`/search/${query[1].replace('#', '')}`)
    .then(response => response.json())
    .then(myJson => {
      console.log(JSON.stringify(myJson))
    })
  return 'processing...'
}

export default class TerminalUi extends Component {
  render () {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
      
        <Terminal
          showActions
          startState='maximised'
          hideTopBar={false}
          allowTabs={false}
          color='green'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: 'bold', fontSize: '1.5em' }}
          commands={{
            parse: showMsg
          }}
          msg='try hashtag parser :-) . usage example: `parse #realdonaldtrump`'
        />
      </div>
    )
  }
}
