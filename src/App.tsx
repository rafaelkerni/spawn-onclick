import { useState } from 'react';
import './App.css'

function App() {
  const [circles, setCircles] = useState<HTMLElement[]>([]);
  const [OldCircles, setOldCircles] = useState<HTMLElement[]>([]);
  const [circleCounter, setCircleCounter] = useState<number>(0);

  const drawCircle = (x: number, y: number ) => setCircles(prevState => {
    setCircleCounter(circleCounter+1);
    const newCircle = (
      <div 
          key={circleCounter} 
          className="circle" 
          style={{ 
              left: x, 
              top: y, 
              backgroundColor: `#${((1<<24)*Math.random()|0).toString(16)}`  
          }}>
        {circleCounter}
      </div>)
    
    return [...prevState, newCircle]
  })

  const handleMouseClick = (event:any) => {
    if(event.target.id === 'container'){
      drawCircle(event.clientX, event.clientY)
    }
  };  

  const undo = () => {
    setOldCircles(prevState => [...prevState, circles[circles.length - 1]]);
    setCircles(prevState => prevState.slice(0, -1));
  }

  const redo = () => {
    setCircles(prevState => [...prevState, OldCircles[OldCircles.length - 1]]);
    setOldCircles(prevState => prevState.slice(0, -1));
  }

  const clear = () => {
    setCircles([]);
    setOldCircles([]);
    setCircleCounter(0);
  }

  return (
      <div id="container" className="container" onClick={handleMouseClick}>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={clear}>Clear</button>
          {circles && circles.map((circle: HTMLElement) => circle)}
      </div>
  )
}

export default App
