import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';

import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';

import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';

import Link from '@ckeditor/ckeditor5-link/src/link';

import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

import Heading from '@ckeditor/ckeditor5-heading/src/heading';

import Font from '@ckeditor/ckeditor5-font/src/font';

import Image from '@ckeditor/ckeditor5-image/src/image';

import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';

import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';

import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';

import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

import List from '@ckeditor/ckeditor5-list/src/list';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

import Table from '@ckeditor/ckeditor5-table/src/table';

import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

import Indent from '@ckeditor/ckeditor5-indent/src/indent';

import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';

import '@ckeditor/ckeditor5-build-classic/build/translations/ko';

import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';

import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

export const editorConfiguration = {

  plugins: [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    Underline,
    Strikethrough,
    BlockQuote,
    MediaEmbed,
    PasteFromOffice,
    Font,
    Image,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    List,
    Alignment,
    Table,
    TableToolbar,
    TextTransformation,
    Indent,
    IndentBlock,
    Base64UploadAdapter,
    CodeBlock,
    Link
  ],
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'fontSize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'alignment',
    'outdent',
    'indent',
    'bulletedList',
    'numberedList',
    'blockQuote',
    '|',
    'link',
    'insertTable',
    'imageUpload',
    'codeBlock',
    '|',
    'undo',
    'redo'
  ],

  alignment: {
    options: ['justify', 'left', 'center', 'right']
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  image: {
    resizeUnit: 'px',
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:full',
      'imageStyle:alignRight',
      '|',
      'imageTextAlternative'
    ],
    styles: ['full', 'alignLeft', 'alignRight']
  },
  typing: {
    transformations: {
      remove: [
        'enDash',
        'emDash',
        'oneHalf',
        'oneThird',
        'twoThirds',
        'oneForth',
        'threeQuarters'
      ]
    }
  },
  codeBlock: {
    languages: [
      { language: 'plaintext', label: 'Plain text' },
      { language: 'c', label: 'C' },
      { language: 'cs', label: 'C#' },
      { language: 'cpp', label: 'C++' },
      { language: 'css', label: 'CSS' },
      { language: 'diff', label: 'Diff' },
      { language: 'html', label: 'HTML' },
      { language: 'java', label: 'Java' },
      { language: 'javascript', label: 'JavaScript' },
      { language: 'php', label: 'PHP' },
      { language: 'python', label: 'Python' },
      { language: 'ruby', label: 'Ruby' },
      { language: 'typescript', label: 'TypeScript' },
      { language: 'xml', label: 'XML' },
      { language: 'go', label: 'Go' }
    ]
  },
  language: 'ko'
};

export const ReadOnly_Configuration = {

  toolbar: ['heading'],

  heading: {}

};
