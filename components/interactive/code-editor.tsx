"use client"

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      setOutput(result);
    } catch (error) {
      setOutput(error.message);
    }
  };

  return (
    <div>
      <Editor
        height="50vh"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        onChange={handleEditorChange}
      />
      <button onClick={runCode}>Run</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;
