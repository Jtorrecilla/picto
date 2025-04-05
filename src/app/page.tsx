'use client'
import { MagnifyingGlassCircleIcon, PlayCircleIcon, PrinterIcon, StopCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import SortableList, { SortableItem } from 'react-easy-sort'

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
import { itemsEqual } from '@dnd-kit/sortable/dist/utilities';
import React from 'react';
import { arrayMoveImmutable } from 'array-move';
import { pictures } from '../../models/picture.model';
const MENU_ID = "menu-id";
//TODO: https://codesandbox.io/p/sandbox/react-grid-dnd-example-ph8cqs?file=%2Fsrc%2Findex.js%3A66%2C22-66%2C51
function GridItem({item,i,f,showButtons = true,click = null}:{item:{id: number; img: string; tags: string[]},i:Number,f:any,showButtons:boolean,click:any}){
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
       padding:5,
       width:'100%'
   }}>
    {showButtons==true ? (<div style={{
                display:'flex',
                flexDirection:'row',
       justifyContent:"space-between",
       padding:5,
       width:'100%'
   }}><div>{i.toString()}</div>
    <div onClick={f}>x</div></div>) : (<div/>)}
     
     </div>
     <div>
   <img onClick={click} src={src} style={{
   width:200
  }}></img></div></div></div></div>) 
}
const All = React.memo((props: any) => { 

  return (<div>
    {pictures?.map((item:any, i:number) => {     
        return (<GridItem key={'p' + i.toString()} showButtons={false} item={item} i={i} click={()=>{
          props.click(item);

        }} f={null}/>) 
      })}
</div>)
});

// function All({items,click}:{items:any,click:any}){
//   const total = useMemo(() => items, [items]);

//   return (<div>
//       {total.map((item:any, i:number) => {     
//           return (<GridItem key={new Date().getMilliseconds()} showButtons={false} item={item} i={i} click={()=>{
//             click(item);

//           }} f={()=>{ 
//           }}/>) 
//         })}
//   </div>)
// }
export default function Home() {
  const [selected,setSelected] = useState(0);
  const [page1,setPage1] = useState(true);
  const [page2,setPage2] = useState(false);
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems2((array) => arrayMoveImmutable(array, oldIndex, newIndex))
  }
  const {setNodeRef} = useDroppable({
    id: 'unique-id-container',
  });
  const [popup,setPopup] = useState(false);
  const [other,setOther] = useState(false);
  const [lang,setLang]=useState('es-ES');

  const [items,setItems] = useState<{ id: number; img: string; tags: string[]; }[]>([]);
  const [items2,setItems2] = useState<{ id: number; img: string; tags: string[]; }[]>([]);
  
  const elementRef = useRef(null);
  const elementRef2 = useRef(null);

  const f = () => {
    let items3: { id: number; img: string; tags: string[]; }[] = [];
    const words = transcript.split(' ');
    console.log(words);
    const imageAre = [];
    for(let c = 0;c < words.length; c++){
      const word = words[c];
      var found = pictures.find(a=> a.tags.includes(word));
      if (found){
        items3.push(found);pictures.find(a=> a.tags.includes(word.toLocaleLowerCase()))
      }
    }
    setItems(items3);
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
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: lang });


  const clear = ()=> {
    resetTranscript();
    setItems([]);
  }
  const close = ()=> {
    setPopup(false);
  }
  const setItemClick = (item:any)=>{
    let ary = [...items2];
    console.log(ary);
ary.push( { id: (ary.length + 1) , img:item.img,tags:[]});
                  setItems2(ary);

    console.log(ary);
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
  const htmlToImageConvert2 = () => {
    if (elementRef2){
      if(elementRef2.current){

      toPng(elementRef2.current, { cacheBust: false })
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
                style={{width:150 }}
              />
            </a>
          </div>
          <div>
          <div className='global'>
          <ul>
        <li className={page1 ? 'selected' :''}><button onClick={()=>{setPage1(true);setPage2(false);}}>Modo Voz</button></li>

<li className={page2 ? 'selected' :''}>
<button onClick={()=>{setPage1(false);setPage2(true);}}>Modo selección</button>
</li>
      </ul>
      <br/>
      </div><div className='flags'>
      <ul>
        <li className={selected==0 ? 'selected' : ''}><button onClick={()=>{setLang('es-ES');setSelected(0)}}><img src="img/es.png"/></button></li>

<li className={selected==1 ? 'selected' : ''}>
<button onClick={()=>{setLang('ca-ES');setSelected(1);}}><img src="img/ca.png"/></button>
</li>
{/* <li className={selected==2 ? 'selected' : ''}>
<button onClick={()=>{setLang('en-US');setSelected(2)}}><img src="img/uk.png"/></button>
</li> */}
      </ul>
      </div>
      </div>
        </nav>

      </header>
      <div  style={{margin:'0 auto',marginTop:180, width:'100%' }}>
      
      {popup ? <div/> : (
        <div>
          {page2 ? (<div/>) : (          <div>
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
</div>)}

<br/>
{page2 ? (<div style={{width:'100vw', height:'100vh', backgroundColor:'#f0f0f0'}}>
  <div className='total-image-container' style={{
        display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',            height: 183
  }}>
  <All items={pictures} click={setItemClick}/>
       
  </div>
  <div style={{display:'block',paddingRight:50,marginTop:20,color:'black'}}>
  <div className="popup-toolbar">
    <XMarkIcon className='action-button' onClick={()=>setItems2([])}/>
    <PrinterIcon onClick={htmlToImageConvert2} className='action-button'/>

    </div>
    <div ref={elementRef2}>
  <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">

    {items2.map((item, i) => {     
          return (
            <SortableItem key={item.id} >
              <div className='item'>
              <GridItem  key={i
          } showButtons={true} click={null} item={item} i={i} f={()=>{
            const itemsClone = Array.from(items2);
            itemsClone.splice(i,1);
            setItems2(itemsClone)
            
          }}/>
              </div>
          {/*  */}
          </SortableItem>) 
        })}
        </SortableList>
      </div>
      </div>
</div>) :(<div/>)}

</div>
      )}


    <div style={{display:'flex'}}>

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



    </div>

    </div>

    </div>
  );
}
