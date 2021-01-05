import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/LandingPage/Header';
import SmallMenu from './components/LandingPage/SmallMenu';
import Register from './components/RegisterPage/Register';
import Login from './components/LoginPage/Login';

function App() {
  return (
    <Router>
      <Header />
      <SmallMenu />
        {/* <Register />
        <Navbar /> */}
        {/* <Switch> */}
          {/* <Route path="/search/:searchTerm">
            <div className="app__page">
              <SmallMenu />
              <SearchPage /> 
            </div>
          </Route> */}

          {/* <Route path="/video/upload">
            <div className="app__page">
              <UploadVideoPage /> 
            </div>
          </Route> */}

          <Route path="/user/register">
              <Register />
          </Route>

          <Route path="/user/login">
                <Login />
          </Route>

          {/* <Route path="/video/:videoId">
                <VideoPage />
          </Route> */}
          
          {/* <Route path="/">
            <div className="app__page">
              <SmallMenu />
              <Home /> 
            </div>
          </Route> */}
        {/* </Switch>       */}
      </Router>
  );
}

export default App;
