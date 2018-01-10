import React from 'react';
import {Button} from 'react-bootstrap';
import styled from 'styled-components';
import ResponseModal from './ResponseModal'
import gql from "graphql-tag"
import {graphql} from 'react-apollo';

const Wrapper = styled.div`
  textarea {
    overflow: hidden;
  }
`;

const query = gql`query getAccounts {
      accounts {
        accounts {
          companyName
          id      
          idAccount
        }
        errors {     
          message    
        }
      }    
    }`;

class Requester extends React.PureComponent {

  state = {
    inputValue: 'query accounts {\n' +
    '    accounts {\n' +
    '      companyName\n' +
    '      id' +
    '      idAccount\n' +
    '    }' +
    '    errors{' +
    '     message' +
    '    }\n' +
    '  }',
    showModal: false
  };

  sendRequest = () => {
    this.setState({showModal: true});
  };
  handleChange = (evt) => {
    this.setState({inputValue: evt.target.value});
  };

  handleClose = () => {
    this.setState({showModal: !this.state.showModal});
  };

  render() {
    const {data} = this.props;
    return (
      <Wrapper>
        <div>
          <textarea rows={10} cols={60} value={this.state.inputValue} onChange={this.handleChange}/>
        </div>
        <Button bsStyle="success" onClick={this.sendRequest}>SEE ANSWER</Button>
        <ResponseModal show={this.state.showModal} onClose={this.handleClose}
                       response={'successful answer'}/>
      </Wrapper>
    )
  }
}

export default graphql(query)(Requester);
