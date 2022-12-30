import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const QuillNoSSRWrap = styled(QuillNoSSRWrapper)`
    border-radius: 10px;
    border: ${(props) =>
    props.variant == 'light'
        ? '1.5px solid #00281a !important'
        : '1.5px solid #B0FFE2 !important;'};

    .ql-toolbar.ql-snow {
        border: none !important;
    }

    .ql-container.ql-snow {
        border: none !important;
    }

    & .ql-editor {
        min-height: 8rem;
    }

    & .ql-editor.ql-blank:focus::before {
        content: '';
        text-align: center;
    }

    & > .ql-container > .ql-editor.ql-blank::before {
        color: ${(props) =>
            props.variant == 'dark' ? '#B0FFE2 !important' : '#0b754e !important;'};
        font-weight: 500;
        font-size: 1rem;
        font-family: Work Sans;
        font-style: normal;
    }

    & .ql-toolbar.ql-snow {
        border-bottom: ${(props) =>
            props.variant == 'dark'
            ? '1.5px solid #B0FFE2 !important'
            : '1.5px solid #00281a !important'};
    }

    & .ql-toolbar .ql-stroke {
        fill: ${(props) => (props.variant == 'dark' ? 'none !important' : null)};
        stroke: ${(props) => (props.variant == 'dark' ? '#fff !important' : null)};
    }

    & .ql-toolbar .ql-fill {
        fill: ${(props) => (props.variant == 'dark' ? '#fff !important' : null)};
        stroke: ${(props) => (props.variant == 'dark' ? 'none !important' : null)};
    }

    & .ql-toolbar .ql-picker {
        color: ${(props) => (props.variant == 'dark' ? '#fff !important' : null)};
    }

    & .ql-snow .ql-picker.ql-expanded .ql-picker-options {
        background-color: ${(props) =>
            props.variant == 'dark' ? 'black !important' : null};
    }

    & .ql-snow.ql-toolbar button.ql-active .ql-stroke{
        stroke: ${(props) => (props.variant == 'dark' ? '#06c !important' : null)};
    }
`;

const TextEditor = ({ name, placeholder, value, onChange }) => {

    const Theme = useTheme();
    const currentTheme = Theme.palette.mode;

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],

            [{ color: [] }, { background: [] }],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],

            // ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };

    const formats = [
        'header',
        'font',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'color',
        'background',
        'code-block',
        'list',
        'bullet',
        'indent',
        // 'link',
        // 'image',
        // 'video',
    ];

    return (

        <QuillNoSSRWrap
            variant={ currentTheme }
            modules={ modules }
            formats={ formats }
            name={ name }
            placeholder={ placeholder }
            value={ value }
            onChange={ onChange }
            theme="snow"
        />
    );
};

export default TextEditor;