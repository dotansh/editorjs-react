import './playground.css'
import useEditorjs from "../hooks/useEditorjs.js";
import {useEffect, useState} from "react";
import Header from "@editorjs/header";

const initialData = {
    "time": 1712064337434,
    "blocks": [
        {
            "id": "5PGb7CjM3C",
            "type": "paragraph",
            "data": {
                "text": "Type here to change the text"
            }
        }
    ],
    "version": "2.29.1"
}

const Playground = () => {
    const [data, setData] = useState(null);
    const [disableData2test, setDisableData2test] = useState(true);
    const holder = "wysiwyg";

    const text2data = async () => {
        if (! disableData2test) {
            return;
        }
        const jsonString = JSON.stringify(await getData(), undefined, 4);
        setData(jsonString);
    }

    const data2text = (e) => {
        if (disableData2test) {
            return;
        }
        try {
            setData(e.target.value);
            const obj = JSON.parse(e.target.value)
            editor.render(obj);
        } catch (e) {
            console.error("Error ", e.toString())
        }
    }

    const {getData, editor} = useEditorjs({
        config: {
            holder: holder,
            tools: {
                header: Header,
            },
            inlineToolbar: ['bold', 'italic'],
            i18n: {
                direction: 'rtl',
            },
            data: initialData,
        },
        onReady: () => {
            text2data();
            setDisableData2test(false);
        },
        onChange: () => {console.log("on change");text2data()}
    });

    return (
        <div className="playground">
            <h3>WYSIWYG:</h3>
            <h3>Editor.js data:</h3>

            {/* This is the actual Editor.js WYSIWYG element: */}
            <section className="content" id={holder} />
            <textarea className="content" value={data || ""}
                      onFocus={() => { setDisableData2test(false) }}
                      onBlur={() => { setDisableData2test(true) }}
                      onChange={data2text}/>
        </div>
    );
}


export default Playground;