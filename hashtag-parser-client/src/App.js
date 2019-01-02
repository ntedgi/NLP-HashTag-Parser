import React, { Component } from 'react'
import './App.module.scss'
import TerminalUi from './Terminal'
import Header from './Header'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <TerminalUi />
      </div>
    )
  }
}

export default App
