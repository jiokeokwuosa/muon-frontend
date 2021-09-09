import React, {ChangeEvent, useRef, useState} from 'react';
import {IPerson} from './interfaces';

interface Person{
  firstName:string;
  lastName:string;
}

interface Props {
  text:string;
  ok?:boolean;
  i?:number;
  fn?:()=>string;//a function that returns string, put void if it returns nothing eg handleChange
  obj?:{
    f1:string
  };
  person?:Person;
  anotherPerson:IPerson
}

interface TextNode {
 text:string
}

const TextField: React.FC<Props> =({ok})=> {
  const [count, setCount] = useState<number | boolean>(5)
  const [text, setText] = useState<string>('Welcome')
  const [objText, setObjText] = useState<TextNode>({text:'welcome'})
  const inputRef = useRef(null)
  setCount(false)
  const handleChange = (event:ChangeEvent<HTMLInputElement>):void =>{
    //this function has a return type of void because it is not returning anything
    if(event.target.name ==="firstName"){
      setText(event.target.value)
    }else{
      setCount(Number(event.target.value))
    }
  }
  return (
  
    <div className="Amyclpp">
        <input ref={inputRef} type="text" name="firstName" onChange={handleChange}/>
        <input type="number" name="count" onChange={handleChange}/>
        {ok}
    </div>
  );
}

export default TextField;
