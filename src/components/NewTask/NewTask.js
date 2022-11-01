import useGowtham from '../Custom/Gowtham';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading,error,twoWays:sendTask}= useGowtham();

  const createTask=(taskText,taskdata)=>{

    const generatedId = taskdata.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTask({url:'https://react-http-f7479-default-rtdb.firebaseio.com/task.json'},{
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      }
    },createTask.bind(null,taskText)
    )};

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
