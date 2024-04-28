import { useState, useEffect, useRef } from 'react'

import './App.css'

document.title = "Todo App";
const App = () => {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || ["Walk the dog", "Eat Breakfast", "Complete Homework"]);
    const [newTasks, setNewTasks] = useState("");
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })), 1000);
        return () => clearInterval(timer);
    }, [tasks]);

const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setNewTasks(e.target.value);
    };
    const addTask = () => {
        if (newTasks.trim() !== "") {
            setTasks(t => [...t, newTasks]);
            setNewTasks("");
        }
        inputRef.current.focus();
    };
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        window.alert('You Deleted a Task');
        window.alert('Press OK');

    }
    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }





    return (
        <div className="to-do-list font-mono text-neutral-200">
            <div className='text-zinc-500 text-4xl tracking-widest hover:text-zinc-400 ' style={{position: 'absolute', top: 40, left: 60}}>
                {time}
                </div>
            <h1>TODO LIST</h1>
            <div className="justify-between items-center flex mt-4 mb-6">
                <input title='Write your input task' className=" mt-4 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-zinc-400 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" id="inputtask" placeholder="Enter a Task..." ref={inputRef} value={newTasks} onChange={handleInputChange} />
                <button title='Add task' className="text-neutral-400 mt-2 ml-2 rounded-lg font-xs text-xs py-1 px-6 " onClick={addTask}>Add Task</button>
            </div>

            <ol>
                {tasks.map((task, index) => {
                    return <li className="mt-2 items-center flex" key={index}><span>{task}</span>
                        <button  title='Delete current task' className="bg-red-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg ml-2 justify-between" onClick={() => deleteTask(index)}>Delete</button>
                        <button title='Move this up' className="bg-cyan-500 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg ml-2 justify-between hover:placeholder-shown:" onClick={() => moveTaskUp(index)}>👆🏻</button>
                        <button title='Move this down' className="bg-emerald-900 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg ml-2 justify-between" onClick={() => moveTaskDown(index)}>👇🏼</button>

                    </li>
                })

                }

            </ol><br />

        </div>
    )
};


export default App;

