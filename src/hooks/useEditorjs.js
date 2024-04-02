import EditorJS from "@editorjs/editorjs";
import {useEffect, useRef} from "react";


const useEditorjs = ({config, onReady = null}) => {
    const ejInstance = useRef();

    const initEditor = () => {
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


    const getEditor = async () => {
        await ejInstance.current.isReady;
        return ejInstance.current;
    }

    return {getEditor};
}

export default useEditorjs