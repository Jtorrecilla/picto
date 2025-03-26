'use client'
import { MagnifyingGlassCircleIcon, PlayCircleIcon, StopCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import {
//   GridContextProvider,
//   GridDropZone,
//   GridItem,
//   swap,
//   move
// } from "react-grid-dnd";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu
} from "react-contexify";

import "react-contexify/dist/ReactContexify.css";
import { PaperClipIcon } from '@heroicons/react/24/outline';
const MENU_ID = "menu-id";
//TODO: https://codesandbox.io/p/sandbox/react-grid-dnd-example-ph8cqs?file=%2Fsrc%2Findex.js%3A66%2C22-66%2C51
export default function Home() {
  const swapy = useRef(null)

  const [items,setItems] = useState<{ id: number; img: string; tags: string[]; }[]>([]);
  const pictures = [
    // {id:1,img:'',tags:['mujer','madre','mama']},
    // {id:2,img:'',tags:['padre','papa','hombre']},
    {id:3,img:'niño',tags:['niño','peque']},
    {id:4,img:'niña1',tags:['niña','peque']},
    {id:5,img:'niña2',tags:['niña','peque']},
    {id:6,img:'niña3',tags:['niña','peque']},
    {id:7,img:'parque1',tags:['parque','columpios']},
    {id:8,img:'parque2',tags:['parque','columpios']},
    {id:9,img:'dormir1',tags:['dormir','sueño','cama']},
    {id:10,img:'dormir2',tags:['dormir','sueño','cama']},
    {id:11,img:'hospital',tags:['hospital'] },
    {id:12,img:'hospita2',tags:['hospital'] },
    {id:13,img:'medico',tags:['médico','medico','doctor']},
    {id:14,img:'comer1',tags:['comer','cenar','desayunar','merendar']},
    {id:15,img:'comer2',tags:['comer','cenar','desayunar','merendar']},
    {id:16,img:'comer3',tags:['comer','cenar','desayunar','merendar']},
    {id:17,img:'comprar1',tags:['comer','cenar','desayunar','merendar']},
    {id:18,img:'comprar2',tags:['comer','cenar','desayunar','merendar']},
  ]

  const f = () => {
    let items2: { id: number; img: string; tags: string[]; }[] = [];
    const words = transcript.split(' ');
    const imageAre = [];
    for(let c = 0;c < words.length; c++){
      const word = words[c];
      var found = pictures.find(a=> a.tags.includes(word));
      if (found){
        items2 = items2.concat(new Array(found))
      }
    }
    setItems(items2);
  }
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const startListening = () => SpeechRecognition.startListening({ continuous: true });


  const clear = ()=> {
    resetTranscript();
  }
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="logo.png"
                style={{width:200}}
              />
            </a>
          </div>
        </nav>

      </header>
      <div  style={{margin:'0 auto', width:1000 }}>

      <p>Microphone: {listening ? 'on' : 'off'}</p>
      
      <textarea rows={10} cols={100}
      value={transcript} // ...force the input's value to match the state variable...
    />
    <div style={{display:'flex', margin:'0 auto',width:250}}>
    <PlayCircleIcon onClick={startListening} style={{
        width:100
      }}/>
      <StopCircleIcon onClick={SpeechRecognition.stopListening} style={{
        width:100
      }}/>
      <MagnifyingGlassCircleIcon  onClick={f} style={{
        width:100
      }}  />
      <TrashIcon style={{
        width:100
      }} onClick={clear}/>
    </div>
    <br/>
    <div style={{display:'flex'}}>
    {/* <GridContextProvider onChange={onChange}> */}
    <div className="container">
    {/* <GridDropZone
          className="dropzone left"
          id="left"
          boxesPerRow={3}
          rowHeight={150}
        > */}
    {items.map((item, i) => {     
           // Return the element. Also pass key   
          const src = 'img/' + item.img + '.png';
           return (
            <div key={i}>
           <div className="grid-item">
            <div  className="grid-item-content" style={{
              display:'flex',
              flexDirection:'column'
            }}> 
            <div>
              <div>{i}</div>
            <div onClick={()=>{
              const itemsClone = Array.from(items);
              itemsClone.splice(i,1);
              setItems(itemsClone)
              
            }}>x</div>
              </div>
              <div>
            <img src={src} style={{
            width:200
           }}></img></div></div></div></div>) 
        })}
          {/* </GridDropZone> */}
      </div>
      {/* </GridContextProvider> */}

    </div>

    </div>

    </div>
  );
}
