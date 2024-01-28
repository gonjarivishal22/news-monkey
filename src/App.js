import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

function App() {
  const [progress, setProgress] = useState(0)
  // apiKey = "process.env.REACT_APP_NEWS_API";
  const apiKey = "73001b76301545c0a2ea7fcbc1475e70"
  const showProgress = (progressParam) => {
    setProgress(progressParam)
  }
  const pageSize = 8;

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => showProgress('0')}
          height={3}
        />
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={pageSize} apiKey={apiKey} showProgress={showProgress} country="in" category="general" />}> </Route>
          <Route exact path="/business" element={<News key="business" pageSize={pageSize} apiKey={apiKey} showProgress={showProgress} country="in" category="business" />}></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} apiKey={apiKey} showProgress={showProgress} country="in" category="entertainment" />}></ Route>
          <Route exact path="/general" element={<News key="general" pageSize={pageSize} apiKey={apiKey} showProgress={showProgress} country="in" category="general" />}></Route>
          <Route exact path="/health" element={<News key="health" pageSize={pageSize} apiKey={apiKey} showProgress={showProgress} country="in" category="health" />}> </Route>
          <Route exact path="/science" element={<News key="science" pageSize={pageSize} apiKey={apiKey} showProgress={showProgress} country="in" category="science" />}> </Route>
          <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} apiKey={apiKey} showProgress={showProgress} country="in" category="sports" />}></Route>
          <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} apiKey={apiKey} showProgress={showProgress} country="in" category="technology" />}></Route> </Routes>
      </Router>
    </div>)
}


export default App;