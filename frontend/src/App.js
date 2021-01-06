import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/LandingPage/Header';
import SmallMenu from './components/LandingPage/SmallMenu';
import Home from './components/LandingPage/Home';
import Register from './components/RegisterPage/Register';
import Login from './components/LoginPage/Login';
import UploadVideo from './components/UploadVideoPage/UploadVideo'

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          {/* <Route path="/search/:searchTerm">
            <div className="app__page">
              <SmallMenu />
              <SearchPage /> 
            </div>
          </Route> */}

          <Route path="/video/upload">
            <div className="app__page">
              <UploadVideo /> 
            </div>
          </Route>

          <Route path="/user/register">
            <div className="app__page">
              <Register />
            </div>
          </Route>

          <Route path="/user/login">
              <div className='app__page'>
                <Login />
              </div>
          </Route>

          {/* <Route path="/video/:videoId">
                <VideoPage />
          </Route> */}
          
          <Route path="/">
            <div className="app__page">
              <SmallMenu />
              <Home /> 
            </div>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
