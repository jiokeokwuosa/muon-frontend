import React, {useState} from 'react';

interface Props {
  children:(
    count:number,
    setCount:React.Dispatch<React.SetStateAction<number>>
  )=>JSX.Element | null
}

const Counter: React.FC<Props> =({children})=> {  
  const [count, setCount] = useState<number>(5) 
  return (
    <div className="Amyclpp">
        {children(count,setCount)}
    </div>
  );
}

export default Counter;
