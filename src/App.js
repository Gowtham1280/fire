import React, {useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useGowtham from './components/Custom/Gowtham';

function App() {

  const [tasks, setTasks] = useState([]);

    console.log('hi');
   const {isLoading,error,twoWays:fetchTasks}= useGowtham();

  useEffect(() => {

    const transformedtasks= taskObj=>{
      const loadedTasks = [];
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    fetchTasks({url:'https://react-http-f7479-default-rtdb.firebaseio.com/task.json'},transformedtasks);

  }, [fetchTasks]);

  console.log('endi bro idi');
  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };
  
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
