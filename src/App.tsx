import './App.css';
import React, {useState} from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


export default function App() {
  const [openContent, setOpencontent] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const getButtonid = () =>{
    document.getElementById("card-chat-button")?.click()
  }

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
      {(!openContent)&&(
         <button className="myCard" onClick={()=>{
          setOpencontent(true) 
        }}>ÍCONE</button>
      )}
     {(openContent)&&(
      <div className="card">
        <div className="card2">
        <div id="card-content" >
          <div className="smart-guide-header">
            <h1 style={{fontFamily: 'Paytone One, sans-serif', color: '#0FB06C', margin: '10px 0 0 0'}}>SmartGuide</h1>
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
            <div className="card-chat-content">
              <h5 style={{textAlign: 'start', marginLeft: '15px'}}>Não encontrou sua resposta ? Pergunte ao chat</h5>
              <div className="card-chat-input">
                <textarea
                    className="card-chat-textarea"
                    placeholder="Digite sua pergunta"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                  >
                  </textarea>
                  <button id="card-chat-button" style={{display: 'none'}} onClick={() => generateResponse(currentQuestion)}>
                    Resposta
                  </button>
                  <FontAwesomeIcon icon={faChevronRight} className='card-chat-icon' onClick={getButtonid} />
              </div>
              <div className="card-chat-img-output">
                <img alt="smartGuide-logo" src="/assets/logo-open-ai.png" style={{ width: '25px', height: '20px'}}></img>
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
      </div>
      )}
      </div>
  );
}

