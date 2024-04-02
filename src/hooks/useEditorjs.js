import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import {useCallback, useEffect, useRef, useState} from "react";


const useEditorjs = ({config, onReady = null, onChange = null}) => {
    const ejInstance = useRef();

    const initEditor = () => {
        if (onChange) {
            config.onChange = onChange;
        }
        try {
            const editor = new EditorJS({
                ...config,
                onReady: () => {
                    ejInstance.current = editor;
                    if (config.data) {
                        editor.render(config.data);
                    }
                    onReady && onReady();  // Caller's onReady
                }
            });
        } catch (e) {
            console.error('Failed to init editor: ', e);
        }
    };

    const render = async (data) => {
        if (!data) {
            return;
        }
        if (ejInstance.current) {
            try {
                await ejInstance.current.isReady;
                ejInstance.current.render(data);
            } catch (e) {
                console.error('Failed to render editor: ', e);
            }
        } else {
            setTimeout(() => {
                render(data);
            }, 100);
        }
    }

    useEffect(() => {
        if (ejInstance.current === null) {
            ejInstance.current = undefined; // Prevent multiple init
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);


    const getData = async () => {
        try {
            return ejInstance.current?.save();
        } catch (error) {
            console.error('Editorjs saving failed: ', error);
        }

        return "error";
    }

    return {getData, editor: ejInstance.current};
}

export default useEditorjs