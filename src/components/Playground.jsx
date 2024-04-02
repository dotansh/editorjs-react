import './playground.css'

const Playground = () => {

    const text2data = () => {

    }

    const data2text = () => {

    }

    return (
        <div className="container">
            <h3>WYSIWYG:</h3>
            <p></p>
            <h3>Editor.js data:</h3>

            <section>
                <div className="wysiwyg">
                    Test 1234
                </div>
            </section>
            <div>
                <button onClick={text2data}>Convert Test to Data &gt;&gt;</button>
                <button onClick={data2text}>&lt;&lt; Convert Data to Text</button>
            </div>
            <code>
                <div className="code">
                    Test 1234
                </div>
            </code>
        </div>
    )
        ;
}


export default Playground;