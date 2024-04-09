import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState(''); // 현재 입력된 값 
  const [todosCount, setTodosCount] = useState(0); // 할 일 개수
  const [todos, setTodos] = useState([]); // 할 일 목록
  const [completedTodos, setCompletedTodos] = useState([]); // 완료된 할 일 목록

  // 엔터 키를 눌렀을 때 실행되는 함수
  function enterPress(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      const newTodo = { id: todosCount, content: event.target.value }; //할 일 객체 생성
      setTodos([...todos, newTodo]); // 할 일을 목록에 추가
      setTodosCount(todosCount + 1); // 할 일 개수 증가
      setInputValue(''); // 입력값 초기화
    }
  };

  // 완료된 할 일로 이동하는 함수
  function moveToCompleted(id) {
    const completedTodo = todos.find(todo => todo.id === id); // 완료된 할 일 찾기
    setCompletedTodos([...completedTodos, completedTodo]); // 완료된 할 일 목록에 추가
    setTodos(todos.filter(todo => todo.id !== id)); // 완료된 할 일을 할 일 목록에서 제거
  }

  // 해낸 일 제거 함수
  function deleteCompleted(id) {
    setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
  }

  return (
    <div className="background">
      <div className='main'>
        <Maintitle />
        <div className="title_Line"></div>
        <MainInput enterPress={enterPress} inputValue={inputValue} setInputValue={setInputValue} />
        <div className="ListWrapper_wrapper">
          <ListWrapper todos={todos} moveToCompleted={moveToCompleted} />
          <ListWrapper_did completedTodos={completedTodos} deleteCompleted={deleteCompleted} />
        </div>
      </div>
    </div>
  )
}

function Maintitle() {
  return (
    <div className="title">
      <h1>UMC Study Plan</h1>
    </div>
  )
}

function MainInput({ enterPress, inputValue, setInputValue }) {
  return (
    <div>
      <input
        className='input'
        placeholder='    UMC 스터디 계획을 작성해보세요!'
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyPress={(event) => enterPress(event)}
      />
    </div>
  )
}

function ListWrapper({ todos, moveToCompleted }) {
  return (
    <div className='list'>
      <div className='list_title'>해야 할 일</div>
      <ul className='list_text'>
        {todos.map(todo => (
          <TodoList key={todo.id} todo={todo} moveToCompleted={moveToCompleted} />
        ))}
      </ul>
    </div>
  )
}

function TodoList({ todo, moveToCompleted }) {
  return (
    <li className="TodoList">
      <h1 className="TodoList_value">{todo.content}</h1>
      <button className='TodoList_button' onClick={() => moveToCompleted(todo.id)}>완료</button>
    </li>
  )
}

function ListWrapper_did({ completedTodos, deleteCompleted }) {
  return (
    <div className='list'>
      <div className='list_title'>해낸 일</div>
      <ul className='list_text'>
        {completedTodos.map(todo => (
          <TodoList_did key={todo.id} todo={todo} deleteCompleted={deleteCompleted} />
        ))}
      </ul>
    </div>
  )
}

function TodoList_did({ todo, deleteCompleted }) {
  return (
    <li className="TodoList">
      <h1 className="TodoList_value">{todo.content}</h1>
      <button className='TodoList_button' onClick={() => deleteCompleted(todo.id)}>삭제</button>
    </li>
  )
}

export default App;