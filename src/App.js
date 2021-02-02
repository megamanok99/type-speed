import React from 'react';
import Ready from './components/Ready';

const text=[
  'Интервьюер интервента интервьюировал',
  'Скороговорун скороговорил скоровыговаривал',
  'Пакет под попкорн',
  'Волховал волхв в хлеву с волхвами',
  'У Сени и Сани в сенях сом с усами',
  'Сачок зацепился за сучок',
  'Ценит цеп косец по косовице'
]
function isCorrect(str1,str2){
  return new RegExp('^'+str1).test(str2);
}
function randomSentence(str){
  return text[Math.ceil(Math.random()*text.length)-1].split(' ')
 }
let time,finalTime;
function App() {
  const [words,setWords]=React.useState(randomSentence());
  const [started,setStarted]=React.useState(false);
  const [isError,setIsError]=React.useState(false);
  const [ready,setReady]=React.useState(false);
  const [inputValue,setInputValue]=React.useState('');
  const start=()=>{
    
    setStarted(true);
    time= new Date();
  }
 const newStart=()=>{
  
  setReady(false);
  setStarted(true);
  setWords(randomSentence());
  time= new Date();
 }
  const handleChangeInput=(e)=>{
    let value= e.target.value.trim();
    if(value===words[0]){
      setWords(words.slice(1));
      value='';
      setIsError(false);
    }

    if(!value){
      setIsError(false);
    }
    if(!isCorrect(value,words[0])){
      setIsError(true);
    }
    
    

    setInputValue(value);
    

    
   
  }
  React.useEffect(()=>{
    if(words.length===0){
      setReady(true);
      setStarted(false);
      finalTime= new Date();
    }
  },[words])

  



  return (
   
     <div className="app ">
      
        {ready ? <Ready time={time} finalTime={finalTime} newStart={newStart}/>:
        !started ?(
          <button type="button" className="btn btn-primary btn-lg" 
          onClick={start}>Начать</button>
        
       )
         :(
           <div className="center">
           <h1 className={`display-4 mb-4 ${isError? 'error':''}`}>{words[0]} </h1>
           <div className="input-group-lg">
              <input type="text" 
              value={inputValue}
              onChange={handleChangeInput}
              className="form-control" 
              placeholder="Введите слово"
              />
           </div>
           </div>
         )
        }
    
       
      

     </div>

     
    
     
      
      
   
  );
}

export default App;
