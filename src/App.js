import Home from './Home';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePost from './CreatePost';
import PostDetail from './PostDetail';

function App() {

  return (
    // wrap everything in Router component
    <Router>
      <div>
        <Navbar />
        <div className="container-fluid bg-light h-80">
          <div className="row">
            <div className="col-3 bg-white vh-80">
              {/* This is the div for ad / links */}
              {/* <h4 className='p-2'>Left</h4> */}
            </div>
            <div className="col-6 bg-white h-scroll">
              <Switch>
                <Route exact path={"/"}>
                  <Home />
                </Route>
                <Route path={"/new"}>
                  <CreatePost />
                </Route>
                <Route path={"/post/:id"}>
                  <PostDetail />
                </Route>
              </Switch>
            </div>
            <div className="col-3 bg-white vh-80">
              {/* This is the div for ad / links */}
              {/* <h4 className='p-2'>Right</h4> */}
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
