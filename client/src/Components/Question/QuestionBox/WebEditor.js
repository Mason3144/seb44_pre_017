/* eslint-disable react/prop-types */
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function WebEditor({ value, setValue }) {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      style={{ height: '300px' }}
      modules={module}
      theme="snow"
      value={value}
      onChange={setValue}
      overflow="scroll"
    />
  );
}
export default WebEditor;
