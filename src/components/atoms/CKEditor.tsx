import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorProps {
  data?: string;
  onChange?: (data: string) => void;
}

const CustomCKEditor: React.FC<CKEditorProps> = ({ data = '', onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor as any}
      data={data}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange && onChange(data);
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  );
};

export default CustomCKEditor;
