import React from 'react';
import {Button} from 'react-bootstrap';
import styled from 'styled-components';
import ResponseModal from './ResponseModal'
import gql from "graphql-tag"
import {withApollo} from 'react-apollo';

const Wrapper = styled.div`
  textarea {
    overflow: hidden;
  }
  > button {
    margin-right:5px;
  }
`;

const getAccountQuery = `query getAccounts {
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

const getSmsOperatorsQuery = `query getSmsOperators {
      smsOperators {
        smsOperators {
          id      
          operator
          network
        }
        errors {     
          message    
        }
      }    
    }`;

class Requester extends React.PureComponent {

  state = {
    inputValue: `query getSmsOperators {
      smsOperators {
        smsOperators {
          id      
          operator
          network
        }
        errors {     
          message    
        }
      }    
    }`,
    showModal: false,
    answer: ""
  };

  sendRequest = (query, resolver, responseKey) => {
    this.setState({inputValue: query});
    this.props.client.query({
      query: gql`${query}`,
      context: {
        headers: {
          "graphql-resolver": resolver
        }
      }
    }).then(response => {
      this.setState({answer: response.data[responseKey][responseKey]});
    });

    this.setState({showModal: true});
  };

  getAccountsRequest = () => {
    this.sendRequest(getAccountQuery, "com.clx.bossbe.graphql.account.resolver.RootQueryResolver", "accounts")
  };

  getSmsOperatorsRequest = () => {
    this.sendRequest(getSmsOperatorsQuery, "com.clx.bossbe.graphql.smsoperator.resolver.RootQueryResolver", "smsOperators")
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
          <textarea disabled rows={10} cols={60} value={this.state.inputValue} onChange={this.handleChange}/>
        </div>
        <Button bsStyle="success" onClick={this.getAccountsRequest}>get accounts</Button>
        <Button bsStyle="success" onClick={this.getSmsOperatorsRequest}>get sms operators</Button>
        <ResponseModal show={this.state.showModal} onClose={this.handleClose} response={this.state.answer}
        />
      </Wrapper>
    )
  }
}

export default withApollo(Requester);
