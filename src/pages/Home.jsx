import '../App.css';
import React, { useRef, useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Editor from '@monaco-editor/react';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { CiSaveDown1 } from 'react-icons/ci';
import { BsFillPlayFill } from 'react-icons/bs';

import { auth } from '../firebase-config';
import axios from 'axios';


export default function Home() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [languages, setLanguages] = useState(["python", "javascript"]);
  const [language, setLanguage] = useState("python");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [stdin, setStdin] = useState('');

  const langs = {
    "python": {"language":"python","version":"3.10.0","aliases":["py","py3","python3","python3.10"], filext: "py"},
    "javascript": {"language":"javascript","version":"18.15.0","aliases":["node-javascript","node-js","javascript","js"],"runtime":"node", filext: "js"},
  }

  const logout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const run = () => {
    setRunning(true);
    const options = {
      language: language,
      version: langs[language].version,
      stdin: stdin,
      files: [
        {
          name: `main.${langs[language].filext}`,
          content: code
        }
      ]
    }
    console.log(options);
    axios.post("https://emkc.org/api/v2/piston/execute", options).then((response) => {
      console.log(response.data);
      setOutput(response.data.run.output);
      setRunning(false);
    });
  }

  return (
    <div>
      <div className='navbar'>
        <h5 className='logo'>Code<span className='highlight'>RUNNER</span></h5>
        <button onClick={logout} className='logout-button'>Logout</button>
      </div>
      <div className='main-content'>
        <div className='editor'>
          <div className='topbar'>
            <AiOutlineFolderOpen className='icon' />
            <select className='select' onChange={(e) => setEditorTheme(e.target.value)}>
              <option value="hc-black">High Contrast</option>
              <option value="vs">Default</option>
              <option value="vs-dark">Dark</option>
            </select>
            <select className='select' onChange={(e) => setLanguage(e.target.value)}>
              {
                languages.map((lang) => {
                  return <option value={lang}>{lang}</option>
                })
              }
            </select>
          </div>
          <Editor
            height="80vh"
            language={language}
            value={code}
            onChange={handleCodeChange}
            className='editor-monaco'
            theme={editorTheme}
          />
        </div>
        <div className='controls'>
          <h5 className='controls-title'>Output</h5>
          <div className='output'>
            <p className='output-text'>{output}</p>
          </div>
          <div>
            <textarea
              className='stdin'
              rows="6"
              placeholder='Custom input...'
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
            ></textarea>
          </div>
          <button style={{
            backgroundColor: running ? '#022752' : 'white',
            color: running ? 'white' : '#022752'
          }} className='run-button' onClick={run}>
            {running ? 'Running...' : 'Run'}
            <BsFillPlayFill style={{ marginLeft: '10px' }} />
          </button>
          <button className='run-button'>
            Save
            <CiSaveDown1 style={{ marginLeft: '10px' }} />
          </button>
        </div>
      </div>
    </div>
  )
}


