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
  console.log("opaaa", currentAnswer)
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
         <button className="myCard" onClick={()=>{
          setOpencontent(true) 
        }}>ÍCONE</button>
      )}
     {(openContent)&&(
      <div className="card">
        <div className="card2">
        <div id="card-content" >
          <div className="smart-guide-header">
            <p>SmartGuide</p>
            <img alt="smartGuide-logo" src="/assets/imagem.jpeg"  style={{ width: '50px', height: '50px'}}/>
          </div>
        </div>
        <div className="card-main">
          <div className="card-option">
            <div className="card-option-content">
              <button className="card-option-button">Inserir</button>
              <button className="card-option-button">Formatar</button>
              <button className="card-option-button">Design</button>
              <button className="card-option-button">Ferramentas</button>
            </div>
          </div>
          <div classname="card-info">
            <div className="card-info-content">
              <img alt="smartGuide-logo" src="/assets/imagem.jpeg"  style={{ width: '150px', height: '150px'}}/>
              <h5 style={{textAlign: 'center'}}>O SmartGuide é seu manual de
              auxílio para o LibreOffice Writer.</h5>
            </div>
          </div>
          <div className="card-chat">
            <div>
              <h5>Não encontrou sua resposta ? Pergunte ao chat</h5>
              <div className="card-chat-input">
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
              <div className="card-chat-output">
                {currentQuestion && (
                  <div className="answer-section">
                    <p className="answer">{currentAnswer}</p>
                    <div className="copy-icon">
                      <i className="fa-solid fa-copy"></i>
                    </div>
                  </div>
                )}
              </div>
              <div className="card-doubt">
                <div className="card-doubt-title">
                 <h5 style={{margin: 0}}>Registro de pesquisas</h5>
                </div>
                <div className="card-doubt-links">
                  <li className="custom-li" style={{margin: 0}} >Onde formatar o parágrafo ?</li>
                  <li className="custom-li" style={{margin: 0}}>Como colocar número da página ?</li>
                  <li className="custom-li" style={{margin: 0}}>Qual o atalho para localizar um elemento ?</li>
                </div>
              </div>
            </div>
          </div>
         </div>
        </div>
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
      )}
      </div>
  );
}

