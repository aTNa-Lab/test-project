import React, {useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';

export default function App() {
    const editorRef = useRef(null);
    const [docData, setDocData] = useState("")
    const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const handleChange = (d) => {
        console.log(d)
        setDocData(d)
    }
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <h1>Editor</h1>
            <Editor
                id={"EditorTinyMCE"}
                onEditorChange={(newValue, editor) => handleChange(newValue)}
                value={docData}
                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    selector: 'textarea#full-featured-non-premium',
                    plugins: 'print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                    imagetools_cors_hosts: ['picsum.photos'],
                    menubar: 'file edit view insert format tools table help',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media link anchor codesample | ltr rtl',
                    toolbar_sticky: true,
                    image_advtab: true,
                    link_list: [
                        {title: 'My page 1', value: 'https://www.tiny.cloud'},
                        {title: 'My page 2', value: 'http://www.moxiecode.com'}
                    ],
                    image_list: [
                        {title: 'My page 1', value: 'https://www.tiny.cloud'},
                        {title: 'My page 2', value: 'http://www.moxiecode.com'}
                    ],
                    image_class_list: [
                        {title: 'None', value: ''},
                        {title: 'Some class', value: 'class-name'}
                    ],
                    importcss_append: true,
                    file_picker_callback: function (callback, value, meta) {
                        /* Provide file and text for the link dialog */
                        if (meta.filetype === 'file') {
                            callback('https://www.google.com/logos/google.jpg', {text: 'My text'});
                        }

                        /* Provide image and alt text for the image dialog */
                        if (meta.filetype === 'image') {
                            callback('https://www.google.com/logos/google.jpg', {alt: 'My alt text'});
                        }

                        /* Provide alternative source and posted for the media dialog */
                        if (meta.filetype === 'media') {
                            callback('movie.mp4', {
                                source2: 'alt.ogg',
                                poster: 'https://www.google.com/logos/google.jpg'
                            });
                        }
                    },
                    height: 600,
                    image_caption: true,
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    contextmenu: 'link image imagetools table',
                    // skin: useDarkMode ? 'oxide-dark' : 'oxide',
                    // content_css: useDarkMode ? 'dark' : 'default',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <h1>Viewer</h1>
            <Editor
                id={"ViewerTinyMCE"}
                onEditorChange={(newValue, editor) => handleChange(newValue)}
                value={docData}
                toolbar={false}
                menubar={false}
                inline={false}
                disabled={true}
                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                init={{
                    // plugins: 'print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists imagetools textpattern noneditable charmap',
                    menubar: false,
                    image_advtab: true,
                    importcss_append: true,
                    height: 600,
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}