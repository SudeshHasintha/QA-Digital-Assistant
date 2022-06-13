import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// 0. Install dependencies
// npm i @tensorflow/tfjs @tensorflow-models/qna react-loader-spinner
// mokak

// 1. Import dependencies
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Fragment } from 'react';
import { AppBar, Button, IconButton, TextareaAutosize, TextField, Toolbar, Typography, Modal } from '@mui/material';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Box from '@mui/material/Box';

export default function App() {

  // 3. Setup references and state hooks
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showAnswers, setShowAnswers] = useState("");
  const [question, setQuestion] = useState("");
  const handleQuestion = e => {
    setQuestion(e.target.value);
  };
  const handleClear = e => {
    setQuestion("");
    setShowAnswers("");
  };
  const [model, setModel] = useState(null);

  // 4. Load Tensorflow Model
  const loadModel = async () => {
    const loadedModel = await qna.load()
    setModel(loadedModel);
    console.log('Model loaded.')
  }

  // 5. Handle Questions 
  const answerQuestion = async (e) => {
    handleOpen();
    if (model !== null && question !== "") {   
      console.log("runnnnn")   
      const passage = 'A network is just a collection of devices and end systems connected to each other and able to communicate with each other. These could be computers, servers, smartphones, routers etc. A network could be as large as the internet or as small as your two computers at home sharing files and a printer.Bus topology is a network type in which every computer and network device is connected to single cable. When it has exactly two endpoints, then it is called Linear Bus topology. In computing, a firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. A firewall typically establishes a barrier between a trusted network and an untrusted network, such as the Internet.'
      const answers = await model.findAnswers(question, passage);
      try {
        setShowAnswers("01. " + answers[0].text + "\n\n" + "02. " + answers[1].text + "\n\n" + "03. " + answers[2].text + "\n\n" + "04. " + answers[3].text + "\n\n" + "05. " + answers[4].text);
        handleClose();
      } catch (e) {
        setShowAnswers("Nothing Found Any Answer");
        handleClose();
      }
    } else {
      setShowAnswers("Question Required");
      handleClose();
    }
  }

  useEffect(() => { loadModel() }, [])

  // 2. Setup input, question and result area
  return (
    <div className="App">
      {model == null ?
        <header className="App-header">
          <div>
            <div>Model Loading</div>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100} />
          </div>
        </header>
        :
        <header className="App-header-home">
          <Fragment>
            <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }}>
              <Toolbar>
                <Typography variant="h6" component="div" align="left" sx={{ flex: 11, fontWeight: 'bold' }}>
                  QA Digital Assistant
                </Typography>
                <IconButton color="inherit" align="right" sx={{ flex: 1 }}>
                  <ContactSupportIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box style={{ justifyContent: 'right' }} sx={{
              width: '100%',
              height: "80vh",
              justifyContent: 'right',
            }}>
              <Box style={{ backgroundColor: 'rgba(191, 215, 237, 0.75)' }} sx={{
                width: '65%',
                height: "70vh",
                justifyContent: 'center',
                paddingTop: "5%",
                marginLeft: "30%",
                marginRight: "5%",
              }}>
                <div>
                  <TextField id="question" value={question} onChange={handleQuestion} label="Ask a Question?" variant="outlined" sx={{
                    width: '80%',
                  }} />
                </div>
                <div style={{ marginTop: "2%" }}>
                  <Button style={{ backgroundColor: '#0074B7', width: "12%", marginRight: "7.5%", fontWeight: "bold" }} variant="contained" onClick={answerQuestion}>FIND</Button>
                  <Button style={{ backgroundColor: '#0074B7', width: "12%", marginLeft: "7.5%", fontWeight: "bold" }} variant="contained" onClick={handleClear}>CLEAR</Button>
                </div>
                <div>
                  <TextareaAutosize
                    disabled
                    minRows={15}
                    placeholder=""
                    value={showAnswers}
                    style={{ color: "#282c34", fontSize: "20px", fontWeight: "bold", width: '80%', marginTop: "5%", backgroundColor: 'transparent' }} />
                </div>
                <Modal
                  style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                  open={open}
                  onClose={handleClose}
                >
                  <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100} />
                  {/* <Box sx={{
                    backgroundColor:'transparent',
                    justifyContent:'center',
                    marginLeft: 'auto', 
                    marginRight: 'auto',
                    // marginTop: 'auto', 
                    // marginBottom: 'auto',
                    width:'100vh',
                    height:'100vh',
                  }}>
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100} />
                  </Box> */}
                </Modal>
              </Box>
            </Box>
          </Fragment>
        </header>
      }
    </div>
  );
}