import PhonebookBox from './containers/PhonebookBox';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PhonebookForm from './containers/PhonebookForm';


function App() {
  return (
    <Routes>
      <Route path="/" element={<PhonebookBox />}/>
      <Route path="/add" element={<PhonebookForm/>}/>
    </Routes>
      );
}

      export default App;
