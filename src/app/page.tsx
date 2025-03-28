'use client'
import { MagnifyingGlassCircleIcon, PlayCircleIcon, StopCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
import {DndContext,useDroppable,useDraggable} from '@dnd-kit/core';

import "react-contexify/dist/ReactContexify.css";
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { SortableContext } from '@dnd-kit/sortable';
const MENU_ID = "menu-id";
//TODO: https://codesandbox.io/p/sandbox/react-grid-dnd-example-ph8cqs?file=%2Fsrc%2Findex.js%3A66%2C22-66%2C51
function GridItem({item,i,f}:{item:{id: number; img: string; tags: string[]},i:Number,f:any}){
  const {attributes, listeners,setNodeRef} = useDraggable({
    id: 'unique-id-'+ i.toString(),
  });
  const src = 'img/' + item.img + '.png';
  return (
   <div {...attributes}>
  <div className="grid-item">
   <div  className="grid-item-content" style={{
     display:'flex',
     flexDirection:'column',
   
   }}> 
   <div style={{
                display:'flex',
                flexDirection:'row',
       justifyContent:"space-between",
       padding:5,
       width:'100%'
   }}>
     <div>{i.toString()}</div>
   <div onClick={f}>x</div>
     </div>
     <div>
   <img src={src} style={{
   width:200
  }}></img></div></div></div></div>) 
}
export default function Home() {
  const {setNodeRef} = useDroppable({
    id: 'unique-id-container',
  });


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
    setItems([]);
  }
  const close = ()=> {
    setItems([]);
  }
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="logo-container">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                alt=""
                src="logo2.png"
                style={{width:200}}
              />
            </a>
          </div>
        </nav>

      </header>
      <div  style={{margin:'0 auto', width:1000 }}>

      <div className='textarea-container'>
      <p>Escuchando: {listening ? 'on' : 'off'}</p>
      <textarea 
      value={transcript} // ...force the input's value to match the state variable...
    />
      </div>

    <div className="button-container" >
    <PlayCircleIcon onClick={startListening} className='action-button'/>
      <StopCircleIcon onClick={SpeechRecognition.stopListening}  className='action-button' />
      <MagnifyingGlassCircleIcon  onClick={f}  className='action-button' />
      <TrashIcon  className='action-button' onClick={clear}/>
    </div>
    <br/>
    <div style={{display:'flex'}}>
    {/* <GridContextProvider onChange={onChange}> */}
    <DndContext>
     <SortableContext items={items}>
    {items.length == 0 ? <div/> : (
<div className='main-picto-container'>
  
  <div className="grid-item"><XMarkIcon className='action-button' onClick={close}/></div>

    <div className="picto-container" ref={setNodeRef}>
    {items.map((item, i) => {     
          return (<GridItem item={item} i={i} f={()=>{
            const itemsClone = Array.from(items);
            itemsClone.splice(i,1);
            setItems(itemsClone)
            
          }}/>) 
        })}
      </div>
      </div>
    )}
      </SortableContext> 
    </DndContext>


    </div>

    </div>

    </div>
  );
}
