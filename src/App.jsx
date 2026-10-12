import { useRef, useState } from "react";
import "./App.css";

const data = {
  "TODO": ["Task 1 Need to start", "Tast 2 Should start", "Task 3 should start"],
  "In-Progress": [
    "Task 1 is in Progress",
    "Task 2 is in Progress",
    "Task 3 is is Progress",
  ],
  "Done": ["Task 1 is Done", "Task 2 is Done", "Task 3 is Done"],
  "Completed":["Task 1 is Complete", "Task 2 is Complete", "Task 3 is Complete"]
};

function App() {
  const [todoData, setTodoData] = useState(data);
  const dragItem = useRef()
  const dragContainer = useRef()

 const containerClasses = {
  "TODO": "grey",
  "In-Progress": "yellow",
  "Done": "green",
  "Completed": "green_Complete"
};

  const handleDragStart = (e, item, container) => {
    dragItem.current = item
    dragContainer.current = container
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrag = (e, targetContainer) => {
    const item = dragItem.current
    const sourceContainer = dragContainer.current

    if(sourceContainer === targetContainer) return

    setTodoData(prev => ({
      ...prev,
      [sourceContainer]: prev[sourceContainer].filter(i => i !== item),
      [targetContainer]: [...prev[targetContainer], item]
    }))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          {Object.keys(todoData).map((container, index) => {
            return (
              <div 
                  onDrop={(e) => handleDrag(e, container)} 
                  onDragOver={handleDragOver} 
                  className="todo_container" 
                  key={index}>
                <h1 className="container_heading">{container}</h1>
                {todoData[container].map((item, idx) => {
                  return (
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, item, container)}
                      onDragEnd={(e) => handleDragEnd(e)}
                      className={`${containerClasses[container] || ""} container_item`}
                      key={idx}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    
    </>
  );
}

export default App;
