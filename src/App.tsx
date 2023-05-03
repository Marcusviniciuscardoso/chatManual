import './App.css';
import React, {useState} from 'react';

export default function App() {
  const [openContent, setOpencontent] = useState(false)
  const [openWindow, setOpenwindow] = useState(false)
  const [tabTime, setTabtime] = useState(1)
  const chooseTab = (number: Number) => {
    setTabtime(number)
} 
return (
  <div className="App">
      {(!openContent && !openWindow)&&(
         <button onClick={setOpencontent}>ÍCONE</button>
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
        <div className="card-content">
          <h2>Manual-word</h2>
          <p className="card-content-id">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum facilisis
            augue at ornare. Suspendisse ac faucibus nulla. Donec bibendum turpis eget erat interdum
            bibendum. Donec purus ante, malesuada quis sapien non, volutpat finibus sapien. 
            Suspendisse malesuada, augue id laoreet tincidunt, nisl urna feugiat enim, sit 
            amet convallis diam felis at odio. Pellentesque sed tincidunt justo, et eleifend mi. 
            Integer consequat luctus sem at vulputate. Ut in dolor lorem. Nullam accumsan est rhoncus ante vulputate venenatis. 
            Sed faucibus orci sollicitudin pellentesque vehicula. Pellentesque risus metus, lobortis a
            t metus eu, vulputate ultricies nunc. Fusce tempor sem non dapibus faucibus.
          </p>
        </div>
        <div className="card-chat">
          <h2 className="card-content-h2">Tirar Dúvidas com IA</h2>
          <form>
            <input type="text" placeholder="Insira dúvida aqui" className="card-chat-input"/>
            <input value="Enviar" type="submit"/>
          </form>
       </div>
        </div>
        )}
        {(openWindow)&&(
          <div className='windowTab'>
              <div className="tab">
                <button style={{backgroundColor: `${(tabTime === 1) ? 'white':''}`}} className="tablinks" onClick={()=>chooseTab(1)}>File</button>
                <button style={{backgroundColor: `${(tabTime === 2) ? 'white':''}`}} className="tablinks" onClick={()=>chooseTab(2)}>Home</button>
                <button style={{backgroundColor: `${(tabTime === 3) ? 'white':''}`}} className="tablinks" onClick={()=>chooseTab(3)}>Insert</button>
              </div>
            {(tabTime != null )&&(
              <div style={{backgroundColor:'white'}} id="tabNumber" className="tabcontent">
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

