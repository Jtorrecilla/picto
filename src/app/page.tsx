'use client'
import { MagnifyingGlassCircleIcon, PlayCircleIcon, PrinterIcon, StopCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
import { toPng } from 'html-to-image';

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
   <div className="grid-item" {...attributes}>
  <div >
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
  const [popup,setPopup] = useState(false);

  const [items,setItems] = useState<{ id: number; img: string; tags: string[]; }[]>([]);
  const pictures = [
    // {id:1,img:'',tags:['mujer','madre','mama']},
    // {id:2,img:'',tags:['padre','papa','hombre']},
    {id:3,img:'niño',tags:['niño','peque','nen','petit','petitó']},
    {id:4,img:'niña1',tags:['niña','peque','nena','petit','petitona']},
    {id:5,img:'niña2',tags:['niña','peque','nena','petit','petitona']},
    {id:6,img:'niña3',tags:['niña','peque','nena','petit','petitona']},
    {id:7,img:'parque1',tags:['parque','columpios','parc','gronxadors']},
    {id:8,img:'parque2',tags:['parque','columpios','parc','gronxadors']},
    {id:9,img:'dormir1',tags:['dormir','sueño','cama','son','llit']},
    {id:10,img:'dormir2',tags:['dormir','sueño','cama','son','llit']},
    {id:11,img:'hospital',tags:['hospital'] },
    {id:12,img:'hospita2',tags:['hospital'] },
    {id:13,img:'medico',tags:['médico','medico','doctor','metge','metge']},
    {id:14,img:'comer1',tags:['comer','cenar','desayunar','merendar','dinar','sopar','esmorzar','berenar']},
    {id:15,img:'comer2',tags:['comer','cenar','desayunar','merendar','dinar','sopar','esmorzar','berenar']},
    {id:16,img:'comer3',tags:['comer','cenar','desayunar','merendar','dinar','sopar','esmorzar','berenar']},
    {id:17,img:'comprar1',tags:['comprar','compras','compres','merendar']},
    {id:18,img:'comprar2',tags:['comprar','compras','desayunar','merendar']},
    {id:19,img:'jugar1',tags:['jugar','joc','diversió','esport','lleure']},
    {id:20,img:'jugar2',tags:['jugar','joc','diversió','esport','lleure']},
    {id:21,img:'jugar3',tags:['jugar','joc','diversió','esport','lleure']},
    {id:22,img:'jugar4',tags:['jugar','joc','diversió','esport','lleure']},
    {id:23,img:'jugar5',tags:['jugar','joc','diversió','esport','lleure']},
    {id:24,img:'jugar6',tags:['jugar','joc','diversió','esport','lleure']},
    {id:25,img:'estudiar1',tags:['estudiar','aprender','libro','colegio','estudi','aprenentatge','llibre','escola']},
    {id:26,img:'estudiar2',tags:['estudiar','aprender','libro','colegio','estudi','aprenentatge','llibre','escola']},
    {id:27,img:'correr1',tags:['correr','ejercicio','salud','esport','exercici','córrer','salut']},
    {id:28,img:'correr2',tags:['correr','ejercicio','salud','esport','exercici','córrer','salut']},
    {id:29,img:'correr3',tags:['correr','ejercicio','salud','esport','exercici','córrer','salut']},
    {id:30,img:'correr4',tags:['correr','ejercicio','salud','esport','exercici','córrer','salut']},
    {id:31,img:'dibujar1',tags:['dibujar','arte','creatividad','art','creativitat','llapis','paper']},
    {id:32,img:'cocinar1',tags:['cocinar','comer','receta','fuego','cuina','menjar','recepta','foc']},
    {id:33,img:'cocinar2',tags:['cocinar','comer','receta','fuego','cuina','menjar','recepta','foc']}

    
  ]
  const elementRef = useRef(null);

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
    setPopup(true);

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
    setPopup(false);
  }
  const htmlToImageConvert = () => {
    if (elementRef){
      if(elementRef.current){

      toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "mipictokids.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  };
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

      {popup ? <div/> : (
        <div>

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
</div>
      )}


    <div style={{display:'flex'}}>
    {/* <GridContextProvider onChange={onChange}> */}
    <DndContext>
     <SortableContext items={items}>
    {!popup ? <div/> : (
<div className='main-picto-container'>
  
  <div className="popup-toolbar">
    <XMarkIcon className='action-button' onClick={close}/>
    <PrinterIcon onClick={htmlToImageConvert} className='action-button'/>

    </div>

    <div className="picto-container" ref={elementRef}>
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
