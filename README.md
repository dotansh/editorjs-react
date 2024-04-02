# editorjs-react
[Editor.js](https://editorjs.io/) wrapper for React

This wrapper aims to provide minimal integration of Editor.js, facing the challenges React adds (race conditions due to the time Editor.js takes to load).

It will not save you from the need to understand Editor.js, but it will make it easier to integrate it into your React project.

## Usage
See the [Playground](https://github.com/dotansh/editorjs-react/blob/main/src/components/Playground.jsx) component for a complete example.

```jsx

import useEditorjs from "../hooks/useEditorjs.js";

const YourCompement = () => {
    const holder = "wysiwyg";  // Used in useEditorjs and as id of the container

    const {getEditor, render} = useEditorjs({
        config: {
            holder: holder,
            tools: {
                header: Header, // Any relevant tool
            },
            inlineToolbar: ['bold', 'italic'],
            data: initialData,
            onChange: () => {
                console.log("on change");
            }
            // Any other Editor.js configuration
            // See https://editorjs.io/configuration
        },
        onReady: () => {
            console.log("onReady")
        }
    });
    
    // you can use getEditor to get the editor instance
    // and directly call save(), render(date) etc.
    // use the returned render function in case of risk for a race condition with the editor creation

    return (
            <section className="content" id={holder}/>
    );
```

Recommended reading:
- [Editor.js](https://editorjs.io/)
- [Integrating EditorJs in ReactJs by Suman Kumar](https://medium.com/@suman.kalia235/integrating-editorjs-in-reactjs-bac7fa3361a7)


## License

[MIT Licensed.](https://github.com/dotansh/editorjs-react/blob/main/LICENSE)