import React, { Component } from 'react'
import Terminal from 'terminal-in-react'
import search from './logic/search'
export default class TerminalUi extends Component {
  showMsg = () => 'Hello World'
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
          showActions={true}
          hideTopBar={false}
          allowTabs={false}
          color='green'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: 'bold', fontSize: '1em' }}
          commands={{
            pif: {
              method:  async (args, print, runCommand)=> {
                await search(`${args._[0]}`, res => {
                   print(` ${res}`)
                })
              }
            }
          }}
          descriptions={{
            'open-google': 'opens google.com'
          }}
          msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
        />
      </div>
    )
  }
}
