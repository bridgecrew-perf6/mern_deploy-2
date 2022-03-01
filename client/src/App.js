import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NewAuthor from './components/NewAuthor';
import Author from './components/Author';
import EditAuthor from './components/EditAuthor';
import Details from './components/Details';


function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
          <Route exact  path={'/'}>
            <Author/>
          
          </Route>
          <Route exact path={'/new'}>
            <NewAuthor />
          </Route>
          <Route exact path={'/edit/:id'}>
            <EditAuthor/>
          </Route>
          <Route exact path={'/details/:id'}>
            <Details/>
          </Route>
          
        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
