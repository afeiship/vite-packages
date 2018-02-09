import './dev.scss';
import ReactAntForm from './main';

/*===example start===*/

// install: npm install afeiship/react-ant-form --save
// import : import ReactAntForm from 'react-ant-form'

class App extends React.Component{
  state = {

  };

  constructor(props){
    super(props);
    window.demo = this;
    window.refs = this.refs;
    window.rc = this.refs.rc;
  }

  render(){
    return (
      <div className="hello-react-ant-form">
        <ReactAntForm ref='rc' />
    </div>
    );
  }
}
/*===example end===*/

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
