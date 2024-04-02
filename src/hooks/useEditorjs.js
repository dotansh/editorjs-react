import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import {useCallback, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";


 const useEditorjs = ({initialData = null, id}) => {
    const navigate = useNavigate();
    const ejInstance = useRef();

    const initEditor = () => {
        try {
            const editor = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: Header,
                },
                inlineToolbar: ['bold', 'italic'],
                onReady: () => {
                    ejInstance.current = editor;
                    if (initialData) {
                        editor.render(initialData);
                    }
                },
                i18n: {
                    direction: 'rtl',
                },
                autofocus: !!initialData,
                placeholder: initialData ? false : 'כאן כותבים את התוכן...',
                data: initialData,
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


    const savePost = () => {

        // get post data
        ejInstance.current.save().then(async (outputData) => {
            if (id === 'new') {
                const reply = await fetch(import.meta.env.VITE_SREVER_URL + "/api/posts", {
                    method: "POST",
                    cache: "no-cache",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({title: "New post", content: JSON.stringify(outputData)})
                });

                if (reply.status === 200) {
                    const user = await reply.json();
                    navigate("/");
                    return;
                }

                const errors = await reply.json();
                console.error('Saving failed: ', errors);
                //  return errors ? errors : ["Unknown error"];
            }
        }).catch((error) => {
            console.error('Saving failed: ', error);
        });
    }

    return {postElement: (<div id={"editorjs"}></div>), savePost, render};
}

export default useEditorjs