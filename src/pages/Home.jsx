import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Editor from '@monaco-editor/react';
import { AiFillFolder, AiOutlineClose } from 'react-icons/ai';
import { CiSaveDown1 } from 'react-icons/ci';
import { BsFillPlayFill } from 'react-icons/bs';
import {  VscNewFile } from 'react-icons/vsc';
import { TbBrandJavascript } from 'react-icons/tb';
import { IoLogoPython } from 'react-icons/io';
import axios from 'axios';
import { addDoc, collection, query, onSnapshot, where, updateDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

import { auth, db } from '../firebase-config';
import { useAuth } from '../context-stores/Authcontext';


export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // State
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [languages, setLanguages] = useState(["python", "javascript"]);
  const [language, setLanguage] = useState("python");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [stdin, setStdin] = useState('');
  const [saveMenu, setSaveMenu] = useState(false);
  const [filename, setFilename] = useState('');
  const [filemenu, setFilemenu] = useState(false);
  const [myFiles, setMyFiles] = useState([]);
  const [newFile, setNewFile] = useState(true);
  const [fileName, setFileName] = useState('');
  const [fileId, setFileId] = useState('');

  // Supported Languages
  const langs = {
    "python": {"language":"python","version":"3.10.0","aliases":["py","py3","python3","python3.10"], filext: "py"},
    "javascript": {"language":"javascript","version":"18.15.0","aliases":["node-javascript","node-js","javascript","js"],"runtime":"node", filext: "js"},
  }

  useEffect(() => {
    const colRef = collection(db, "files");
    const q = query(colRef, where("user", "==", user.uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const files = [];
      querySnapshot.forEach((doc) => {
        files.push({...doc.data(), id: doc.id});
      });
      console.log(files);
      setMyFiles(files);
    });

    return () => unsub();
  }, [user.uid]);

  // Logs out a user
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

  // Runs code snippet
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
      toast.success('Code executed successfully!');
    });
  }

  // Saves a user's code to firebase
  const save = () => {
    //save to firebase
    const colRef = collection(db, "files");
    const payload = {
      filename: `${filename}.${langs[language].filext}`,
      code: code,
      language: language,
      user: user.uid,
    }
    addDoc(colRef, payload).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      toast.success('File saved successfully!');
      setSaveMenu(false);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });

  }

  // Updates a file
  const saveChanges = () => {
    console.log("Updating file with file id: ", fileId);
    const docRef = doc(db, "files", fileId);
    const payload = {
      code: code,
    }
    updateDoc(docRef, payload).then(() => {
      console.log("Document updated");
      toast.success('File saved successfully!');
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
  }

  const openFileMenu = () => {
    setFilemenu(true);
  }

  return (
    <div>
      <ToastContainer />
      <div className='navbar'>
        <h5 className='logo'>Code<span className='highlight'>RUNNER</span></h5>
        <button onClick={logout} className='logout-button'>Logout</button>
      </div>
      <div className='main-content'>
        <div className='editor'>
          <div className='topbar'>
            <select className='select' onChange={(e) => setEditorTheme(e.target.value)}>
              <option value="hc-black">High Contrast</option>
              <option value="vs">Default</option>
              <option value="vs-dark">Dark</option>
            </select>
            <select className='select' value={language} onChange={(e) => setLanguage(e.target.value)}>
              {
                languages.map((lang) => {
                  return <option value={lang}>{lang}</option>
                })
              }
            </select>
            {
              !newFile ? (
                <p className='file-title'>{fileName}</p>
              ) : (
                <p className='file-title'>NewFile</p>
              )
            }
          </div>
          {/* Monaco Editor for code editing */}
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
          {
            !saveMenu ? 
            (
              <div className='run-controls'>
                {
                  !filemenu ? (
                    <>
                      <div className='tool-bar'>
                        <h5 className='controls-title'>Output</h5>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                          <div onClick={() => {
                            setCode('');
                            setNewFile(true);
                            setFileName("");
                            setFileId();
                            setOutput("");
                          }}>
                            <VscNewFile className="icon" />
                          </div>
                          <div onClick={openFileMenu}><AiFillFolder className='icon' /></div>
                        </div>
                      </div>
                      <div className='output'>
                        <pre className='output-text'>{output}</pre>
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
                      {
                        newFile ? (
                          <button className='run-button' onClick={() => setSaveMenu(true)}>
                            Save
                            <CiSaveDown1 style={{ marginLeft: '10px' }} />
                          </button>
                        ) : (
                          <button className='run-button' onClick={saveChanges}>
                            Save Changes
                            <CiSaveDown1 style={{ marginLeft: '10px' }} />
                          </button>
                        )
                      }
                      
                    </>
                  ) : (
                    <>
                      <div className='file-menu'>
                        <div className='tool-bar'>
                          <h5 className='controls-title'>Your files</h5>
                          <div onClick={() => setFilemenu(false)}>
                            <AiOutlineClose style={{ fontSize: '25px' }} />
                          </div>
                        </div>
                        <div>
                          {
                            myFiles.map((file) => {
                              return (
                                <div className='file' onClick={() => {
                                  setCode(file.code);
                                  setLanguage(file.language);
                                  setFilemenu(false);
                                  setNewFile(false);
                                  setFileName(file.filename);
                                  setFileId(file.id);
                                  setOutput("");
                                }}>
                                  <p style={{
                                    margin: '1px 0px 1px 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}>
                                    {file.language === "javascript" ? (
                                      <TbBrandJavascript style={{ marginRight: '3px'}} />
                                    ) : (
                                      <IoLogoPython style={{ marginRight: '3px'}} />
                                    )}
                                    {file.filename}
                                  </p>
                                </div>
                              )
                            }
                            )
                          }
                        </div>                        
                      </div>
                    </>
                  )
                }
              </div>
            ) : (
              <div className='save-controls'>
                <div className='tool-bar'>
                  <h5 className='controls-title'>Save File</h5>
                  <div onClick={() => setSaveMenu(false)}>
                    <AiOutlineClose style={{ fontSize: '25px' }} />
                  </div>
                </div>
                <div className='save-inputs'>
                  {
                    filename && (
                      <p style={{
                        margin: '1px',
                        fontSize: 'large',
                        fontWeight: 'bold'
                      }}>Filename: {filename}.{langs[language].filext}</p>
                    )
                  }
                  <input
                    className='save-input'
                    placeholder='Enter file name..'
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                  />
                  <button className='run-button' onClick={save}>Save</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}


