import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  
  state = {
    response: [],
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(data => this.setState({ response: data.results }, () => 
            { console.log("data", this.state.response),
            console.log(typeof(this.state.response), this.state.response.map(x=>x.name).toString(",") )}  ))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/fruit');
    const body = await response.json();
    console.log("body", body);

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    const arr = ["Foo",2,3,"Bar"];
    //const [ response, setFruit] = useState('');

    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
        <h1>Something</h1>
        <ul className="list">{arr.map(el => <li key={el}>{el}</li>)}</ul>
        <div><table>
          <thead><tr><th>ID</th><th>Name</th><th>Color</th></tr></thead>
          <tbody>
          {this.state.response.map(row => 
          <tr key={"r"+row.id}>
            <td key={row.id}>{row.id}</td>
            <td key={row.name}>{row.name}</td>
            <td key={row.color}>{row.color}</td></tr>
              )}
          </tbody>
          </table></div>
      </div>
    );
  }
}

export default App;
