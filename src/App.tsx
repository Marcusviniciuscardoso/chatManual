import './App.css';
import React, {useState} from 'react';

import { Configuration, OpenAIApi } from 'openai';

export default function App() {
  const [openContent, setOpencontent] = useState(false)
  const [openWindow, setOpenwindow] = useState(false)
  const [tabTime, setTabtime] = useState(1)
  const chooseTab = (number: Number) => {
    setTabtime(number)
  }

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const generateResponse = async (newQuestion) => {
    let options = {
        model: 'text-davinci-003',
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['/'],
    }

    let completeOptions = {
      ...options,
      prompt: newQuestion,
    }

    const response = await openai.createCompletion(completeOptions);

    if (response.data.choices) {
      setCurrentQuestion(newQuestion);
      setCurrentAnswer(response.data.choices[0].text);
    }
  }

return (
  <div className="App">
      {(!openContent && !openWindow)&&(
         <button id="myCard" onClick={()=>{
          setOpencontent(true) 
        }}>ÍCONE</button>
      )}
      {(!openWindow && openContent)&&(
         <button onClick={()=>{
          setOpenwindow(true); 
          setOpencontent(false);
        }}>Opções</button>
      )}
      <div className="card">
        {(openContent)&&(
        <div>
        <div id="card-content" className="hidden">
          <h2>SmartGuide</h2>
          <p className="card-content-id">
          O SmartGuide é seu manual de auxílio para o LibreOffice Writer.
          </p>
        </div>
        <div className="card-chat">
           <h2 className="card-content-h2">Não encontrou sua resposta? <br />Pergunte ao chat. </h2>
          <div className="form-section">
                <textarea
                  className="form-control"
                  placeholder="Digite sua pergunta"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                ></textarea>
                <button className="btn" onClick={() => generateResponse(currentQuestion)}>
                  Resposta
                </button>
              </div>
              <div className="answer-container">
                {currentQuestion && (
                  <div className="answer-section">
                    <p className="answer">{currentAnswer}</p>
                    <div className="copy-icon">
                      <i className="fa-solid fa-copy"></i>
                    </div>
                  </div>
                )}
              </div>
       </div>
        </div>
        )}
        {(openWindow)&&(
          <div className='windowTab'>
              <div className="headerTab"><h2>Ferramentas LibreOffice</h2></div>
              <div className="tab">
                <button style={{backgroundColor: `${(tabTime === 1) ? '':'white'}`}} className="tablinks" onClick={()=>chooseTab(1)}>File</button>
                <button style={{backgroundColor: `${(tabTime === 2) ? '':'white'}`}} className="tablinks" onClick={()=>chooseTab(2)}>Home</button>
                <button style={{backgroundColor: `${(tabTime === 3) ? '':'white'}`}} className="tablinks" onClick={()=>chooseTab(3)}>Insert</button>
              </div>
            {(tabTime != null )&&(
              <div style={{backgroundColor:''}} id="tabNumber" className="tabcontent">
                <h3>Tab {tabTime} Content</h3>
                <p>Some text here.</p>
              </div>
            )},
          </div>
        )}
      </div>
      </div>
  );
}

