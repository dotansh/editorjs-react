import {useState} from 'react'
import editorjsLogo from './assets/editorjs.svg'
import reactLogo from './assets/react.svg'
import Playground from './components/Playground.jsx'
import './App.css'

function App() {
    return (
        <>
            <div>
                <a href="https://editorjs.io/" target="_blank">
                    <img src={editorjsLogo} className="logo" alt="Editor.js logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Editor.js + React</h1>
            <div className="card">
                <p>
                    Edit <code>src/components/Playground.jsx</code> and save to test HMR
                </p>
                <p>
                    Copy useEditorjs.js to your project to use the hook
                </p>
                <p className="read-the-docs">
                    Click on the Editor.js and React logos to learn more
                </p>
            </div>
            <Playground/>
        </>
    )
}

export default App
