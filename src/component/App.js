import './style/style.css'
import Home from './Home'
import Nav from './Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
        {/* <Nav /> */}
      </div>
    </Router>
  );
}

export default App;
