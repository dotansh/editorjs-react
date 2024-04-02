import {useState} from 'react'
import editorjsLogo from './assets/editorjs.svg'
import reactLogo from './assets/react.svg'
import Playground from './components/Playground.jsx'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

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
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
                <p>
                    Copy useEditorjs.js to your project to use the hook
                </p>
            </div>
            <Playground/>
            <p className="read-the-docs">
                Click on the Editor.js and React logos to learn more
            </p>
        </>
    )
}

export default App
