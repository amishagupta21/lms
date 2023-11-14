import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [timer, setTimer] = useState(0);
  const [questionData, setQuestionData] = useState([
    { text: 'What is the name of king of Delhi in 1880?', options: ['Name 1', 'Name 2', 'Name 3', 'Name 4'], selectedOption: null, startTime: 0 },
    { text: 'What is the name of king of Delhi in 1990?', options: ['Name 1', 'Name 2', 'Name 3', 'Name 4'], selectedOption: null, startTime: 0 },
    { text: 'What is the name of king of Delhi in 1700?', options: ['Name 1', 'Name 2', 'Name 3', 'Name 4'], selectedOption: null, startTime: 0 },
  ]);
  const [selectedOptions, setSelectedOptions] = useState(Array(questionData.length).fill(null));
  const [intervalId, setIntervalId] = useState(null);

 
  const handleOptionSelect = (questionIndex, optionIndex) => {
    setQuestionData((prevData) => {
      const updatedData = prevData.map((question, index) => {
        if (index === questionIndex && question.selectedOption === null) {
          const startTime = timer; // Capture the start time when the option is selected
          return {
            ...question,
            selectedOption: optionIndex,
            startTime: startTime,
          };
        }
        return question;
      });
      return updatedData;
    });

    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[questionIndex] = optionIndex;
      return updatedOptions;
    });
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    setIntervalId(interval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    clearInterval(intervalId);
    alert(`Total time taken for all questions: ${timer} seconds`);

    questionData.forEach((question, questionIndex) => {
      const timeElapsed = question.startTime !== undefined ? question.startTime : 0;
      alert(`Time when checkbox clicked for Question ${questionIndex + 1}: ${timeElapsed} seconds`);
    });
  };

  


  return (
    <div className="App">
      <div className='sideBar'>
        <p>Sidebar</p>
      </div>
      <div className='mainContainer'>
        <div className='navbar'>
          <p>Navbar</p>
        </div>
        <div className='assignmentContainer'>
          <p>Create Assignment</p>
          <div className='timer'>
            <p>{`Timer: ${timer} seconds`}</p>
          </div>
          <div className='borderLine'></div>
          <div className='questionsContainer'>
            <div className='headingContainer'>
              <p>Questions</p>
              <button>Add Question</button>
            </div>
            {questionData.map((question, questionIndex) => (
              <div key={questionIndex} className='questions'>
                <div className='questionsTag'>
                  <p>{`Question ${questionIndex + 1}`}</p>
                  <button>Edit</button>
                </div>
                <div className='question'>
                  <p>{question.text}</p>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className='option'>
                      <input
                        type='checkbox'
                        checked={selectedOptions[questionIndex] === optionIndex}
                        onChange={() => handleOptionSelect(questionIndex, optionIndex)}
                      />
                      <label>{`${String.fromCharCode(97 + optionIndex)}. ${option}`}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className='buttonContainer'>
              <button onClick={handleSave}>Save</button>
              <button>Back</button>
              <button>Publish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
