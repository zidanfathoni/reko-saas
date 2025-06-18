import React, { useRef, useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorProps {
  data?: string;
  onChange?: (data: string) => void;
  onReady?: (editor: any) => void;
  disabled?: boolean;
  placeholder?: string;
  height?: string;
  className?: string;
  darkMode?: boolean; // New prop for dark mode
}

const EnhancedCKEditor: React.FC<CKEditorProps> = ({
  data = '',
  onChange,
  onReady,
  disabled = false,
  placeholder = 'Mulai menulis konten Anda di sini...',
  height = '400px',
  className = '',
  darkMode = false
}) => {
  const editorRef = useRef<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  // Auto-detect system dark mode if not explicitly set
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(darkMode || mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        if (!darkMode) { // Only auto-detect if darkMode prop is not explicitly set
          setIsDarkMode(e.matches);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [darkMode]);

  const editorConfiguration: any = {
    placeholder,
    toolbar: [
      'heading',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      '|',
      'alignment',
      'outdent',
      'indent',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'link',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'imageUpload',
      '|',
      'code',
      'codeBlock',
      'htmlEmbed',
      '|',
      'undo',
      'redo',
      '|',
      'findAndReplace',
      'selectAll',
      '|',
      'sourceEditing'
    ],
    shouldNotGroupWhenFull: true,

    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
      ]
    },

    fontFamily: {
      options: [
        'default',
        'Arial, Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif',
        'Roboto, sans-serif',
        'Open Sans, sans-serif'
      ],
      supportAllValues: true
    },

    fontSize: {
      options: [
        8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72
      ],
      supportAllValues: true
    },

    fontColor: {
      colors: [
        { color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 0%)', label: 'Default' },
        { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
        { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
        { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
        { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true },
        { color: 'hsl(0, 75%, 60%)', label: 'Red' },
        { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
        { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
        { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
        { color: 'hsl(120, 75%, 60%)', label: 'Green' },
        { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
        { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
        { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
        { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
        { color: 'hsl(270, 75%, 60%)', label: 'Purple' }
      ],
      columns: 5
    },

    fontBackgroundColor: {
      colors: [
        { color: 'hsl(0, 75%, 60%)', label: 'Red' },
        { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
        { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
        { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
        { color: 'hsl(120, 75%, 60%)', label: 'Green' },
        { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
        { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
        { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
        { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
        { color: 'hsl(270, 75%, 60%)', label: 'Purple' }
      ],
      columns: 5
    },

    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        'linkImage',
        'imageResize'
      ],
      styles: ['full', 'side', 'alignLeft', 'alignCenter', 'alignRight'],
      resizeOptions: [
        { name: 'imageResize:original', label: 'Original', value: null },
        { name: 'imageResize:25', label: '25%', value: '25' },
        { name: 'imageResize:50', label: '50%', value: '50' },
        { name: 'imageResize:75', label: '75%', value: '75' }
      ],
      insert: {
        integrations: ['insertImageViaUrl']
      }
    },

    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ],
      tableProperties: {
        borderColors: [
          { color: isDarkMode ? 'hsl(0, 0%, 60%)' : 'hsl(0, 0%, 90%)' },
          { color: 'hsl(0, 0%, 60%)' },
          { color: 'hsl(0, 0%, 30%)' },
          { color: 'hsl(0, 0%, 0%)' }
        ],
        backgroundColors: [
          { color: isDarkMode ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 100%)', label: 'Default' },
          { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
          { color: 'hsl(0, 75%, 60%)', label: 'Red' },
          { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
          { color: 'hsl(60, 75%, 60%)', label: 'Yellow' }
        ]
      },
      tableCellProperties: {
        borderColors: [
          { color: isDarkMode ? 'hsl(0, 0%, 60%)' : 'hsl(0, 0%, 90%)' },
          { color: 'hsl(0, 0%, 60%)' },
          { color: 'hsl(0, 0%, 30%)' },
          { color: 'hsl(0, 0%, 0%)' }
        ],
        backgroundColors: [
          { color: isDarkMode ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 100%)', label: 'Default' },
          { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
          { color: 'hsl(0, 75%, 60%)', label: 'Red' },
          { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
          { color: 'hsl(60, 75%, 60%)', label: 'Yellow' }
        ]
      }
    },

    mediaEmbed: {
      previewsInData: true
    },

    link: {
      decorators: {
        openInNewTab: {
          mode: 'manual',
          label: 'Open in a new tab',
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }
      }
    },

    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },

    alignment: {
      options: ['left', 'center', 'right', 'justify']
    },

    codeBlock: {
      languages: []
    },

    code: {
      languages: []
    },

    htmlEmbed: {
      showPreviews: true
    },

    findAndReplace: {
      options: {
        caseSensitive: true,
        wholeWords: true,
        highlight: true
      }
    },

    autosave: {
      save(editor: any) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            console.log('Auto-saved content:', editor.getData());
            if (onChange) {
              onChange(editor.getData());
            }
            resolve();
          }, 100);
        });
      }
    }
  };

  const handleReady = (editor: any) => {
    editorRef.current = editor;

    const editorElement = editor.ui.getEditableElement();
    if (editorElement) {
      editorElement.style.minHeight = height;
    }

    // Custom upload adapter for images
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return {
        upload: () => {
          return loader.file.then((file: File) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve({
                  default: reader.result
                });
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          });
        },
        abort: () => {
          console.log('Upload aborted');
        }
      };
    };

    console.log('CKEditor ready!', editor);
    if (onReady) {
      onReady(editor);
    }
  };

  const handleChange = (event: any, editor: any) => {
    const data = editor.getData();
    if (onChange) {
      onChange(data);
    }
  };

  const handleFocus = (event: any, editor: any) => {
    console.log('Editor focused', editor);
  };

  const handleBlur = (event: any, editor: any) => {
    console.log('Editor blurred', editor);
  };

  const handleError = (error: any, { willEditorRestart }: any) => {
    if (willEditorRestart) {
      console.log('Editor will restart');
    } else {
      console.error('Editor error:', error);
    }
  };

  // Dark mode styles
  const darkModeStyles = `
    /* Dark Mode Styles */
    .ckeditor-wrapper.dark-mode .ck.ck-editor {
      --ck-color-base-background: #1e1e1e;
      --ck-color-base-foreground: #2d2d2d;
      --ck-color-focus-border: #4a9eff;
      --ck-color-text: #ffffff;
      --ck-color-shadow-drop: rgba(0, 0, 0, .3);
      --ck-color-shadow-inner: rgba(0, 0, 0, .25);
      --ck-color-button-default-background: transparent;
      --ck-color-button-default-hover-background: #3a3a3a;
      --ck-color-button-on-background: #4a4a4a;
      --ck-color-button-on-hover-background: #5a5a5a;
      --ck-color-dropdown-panel-background: #2d2d2d;
      --ck-color-dropdown-panel-border: #4a4a4a;
      --ck-color-input-background: #1e1e1e;
      --ck-color-input-border: #4a4a4a;
      --ck-color-list-background: #2d2d2d;
      --ck-color-list-button-hover-background: #3a3a3a;
      --ck-color-list-button-on-background: #4a4a4a;
      --ck-color-panel-background: #2d2d2d;
      --ck-color-panel-border: #4a4a4a;
      --ck-color-toolbar-background: #2d2d2d;
      --ck-color-toolbar-border: #4a4a4a;
      --ck-color-tooltip-background: #1e1e1e;
      --ck-color-tooltip-text: #ffffff;
      --ck-color-engine-placeholder-text: #888888;
      --ck-color-upload-bar-background: #6cb5f9;
      --ck-color-link-default: #6cb5f9;
      --ck-color-link-selected-background: rgba(108, 181, 249, .3);
    }

    .ckeditor-wrapper.dark-mode .ck.ck-editor__main > .ck-editor__editable {
      background-color: #1e1e1e;
      color: #ffffff;
      border-color: #4a4a4a;
    }

    .ckeditor-wrapper.dark-mode .ck.ck-content {
      color: #ffffff;
    }

    .ckeditor-wrapper.dark-mode .ck.ck-content blockquote {
      border-left-color: #4a4a4a;
    }

    .ckeditor-wrapper.dark-mode .ck.ck-content code {
      background-color: #2d2d2d;
      color: #ffffff;
    }

    .ckeditor-wrapper.dark-mode .ck.ck-content pre {
      background-color: #2d2d2d;
      color: #ffffff;
      border-color: #4a4a4a;
    }

    .ckeditor-wrapper.dark-mode .ck.ck-content table {
      border-color: #4a4a4a;
    }

    .ckeditor-wrapper.dark-mode .ck.ck-content table td,
    .ckeditor-wrapper.dark-mode .ck.ck-content table th {
      border-color: #4a4a4a;
    }

    .ckeditor-wrapper.dark-mode .ck.ck-content hr {
      border-color: #4a4a4a;
    }

    /* Light Mode Styles (default) */
    .ckeditor-wrapper:not(.dark-mode) .ck.ck-editor {
      --ck-color-base-background: #ffffff;
      --ck-color-base-foreground: #fafafa;
      --ck-color-focus-border: #005cc8;
      --ck-color-text: #333333;
    }

    .ckeditor-wrapper:not(.dark-mode) .ck.ck-editor__main > .ck-editor__editable {
      background-color: #ffffff;
      color: #333333;
    }
  `;

  const baseStyles = `
    .ckeditor-wrapper .ck-editor__editable {
      min-height: ${height};
    }

    .ckeditor-wrapper .ck-content {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      line-height: 1.6;
    }

    .ckeditor-wrapper .ck-content .category {
      font-family: 'Bebas Neue', cursive;
      font-size: 20px;
      color: #d1335b;
      letter-spacing: 10px;
      margin: 0;
      padding: 0;
      border: 0;
    }

    .ckeditor-wrapper .ck-content .document-title {
      font-family: 'Lora', serif;
      font-size: 50px;
      font-weight: bold;
      margin: 0;
      padding: 0;
      border: 0;
    }

    .ckeditor-wrapper .ck-content .document-subtitle {
      font-size: 20px;
      color: #e91e63;
      margin: 0 0 10px;
      padding: 0;
      border: 0;
    }

    .ckeditor-wrapper .ck-content .info-box {
      --ck-color-info-box-background: ${isDarkMode ? '#1a2332' : '#e8f5ff'};
      padding: 15px;
      background: var(--ck-color-info-box-background);
      border: 1px solid ${isDarkMode ? '#3a4a5c' : '#b3d7ff'};
      border-radius: 4px;
    }

    .ckeditor-wrapper .ck-content .side-quote {
      font-family: 'Bebas Neue';
      font-style: normal;
      float: right;
      width: 35%;
      position: relative;
      border: 0;
      overflow: visible;
      z-index: 1;
      margin-left: 15px;
    }

    .ckeditor-wrapper .ck-content .marker {
      background: ${isDarkMode ? '#ffd700' : 'yellow'};
      color: ${isDarkMode ? '#000000' : 'inherit'};
    }

    .ckeditor-wrapper .ck-content .spoiler {
      background: #000;
      color: #000;
    }

    .ckeditor-wrapper .ck-content .spoiler:hover {
      background: #000;
      color: #fff;
    }

    .ckeditor-wrapper .ck-content .fancy-code {
      border: 0;
      margin-left: 15px;
      margin-right: 15px;
      border-radius: 10px;
    }

    .ckeditor-wrapper .ck-content .fancy-code-dark {
      background: #272822;
      color: #fff;
      box-shadow: 5px 5px 0 #0000001f;
    }

    .ckeditor-wrapper .ck-content .fancy-code-bright {
      background: ${isDarkMode ? '#404040' : '#ddd'};
      color: ${isDarkMode ? '#ffffff' : '#000'};
      box-shadow: 5px 5px 0 ${isDarkMode ? '#2a2a2a' : '#b3b3b3'};
    }
  `;

  return (
    <div className={`ckeditor-wrapper ${className} ${isDarkMode ? 'dark-mode' : ''}`}>
      <style>
        {baseStyles + darkModeStyles}
      </style>
      <CKEditor
        editor={ClassicEditor as any}
        data={data}
        config={editorConfiguration}
        onReady={handleReady}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onError={handleError}
        disabled={disabled}
      />
    </div>
  );
};

export default EnhancedCKEditor;
