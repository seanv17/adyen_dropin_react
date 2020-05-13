import React, { Component } from 'react';
import ReactDOM from "react-dom";
import paymentMethodsSample from './paymentMethodsSample.json';
import './styles.css';

const API_KEY = 'AQEyhmfxK4zJbBZDw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZiniYHPZ+YtXG9dYfNdwN0H8QwV1bDb7kfNy1WIxIIkxgBw==-uA2G0DS73SlmB4EHi/YNndhli7KlCMjXHbMmm8stboc=-djvcdM2gNHq9dSvC';
const MERCHANT_ACCOUNT = 'TestAccountNY';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethods: [],
      isLoading: true
    };
    this.initAdyenCheckout = this.initAdyenCheckout.bind(this);
  }

  getPaymentMethods() {
    fetch('https://checkout-test.adyen.com/v52/paymentMethods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-API-key': API_KEY  
      },
      body: JSON.stringify({
        "merchantAccount": MERCHANT_ACCOUNT,
        "countryCode": "US",
        "shopperLocale": "en-US",
        "amount": {
          "currency": "USD",
          "value": 1000
        }
      })
    }
    )
      .then((response) => response.json())
      .then((json) => { 
        this.setState({ response: json.paymentMethods });
      })
      .catch((error) => console.error(error));
  }

  componentDidMount() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.7.0/adyen.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.7.0/adyen.js';
    script.async = true;
    script.onload = this.initAdyenCheckout; // Wait until the script is loaded before initiating AdyenCheckout
    document.body.appendChild(script);
  }

  initAdyenCheckout() {
    const configuration = {
      locale: 'en-US',
      environment: 'test',
      originKey: API_KEY,
      paymentMethodsResponse: paymentMethodsSample,
      amount: {
        value: 1000,
        currency: "USD"
      }
    };
    
    const state = {
      isValid: true,
      data: {
        paymentMethod: {
          type: "scheme",
          encryptedCardNumber: "adyenjs_0_1_18$k7s65M5V0KdPxTErhBIPoMPI8HlC..",
          encryptedExpiryMonth: "adyenjs_0_1_18$p2OZxW2XmwAA8C1Avxm3G9UB6e4..",
          encryptedExpiryYear: "adyenjs_0_1_18$CkCOLYZsdqpxGjrALWHj3QoGHqe+..",
          encryptedSecurityCode: "adyenjs_0_1_18$XUyMJyHebrra/TpSda9fha978+..",
          holderName: "S. Hopper"
        }
      }
    };

    const checkout = new window.AdyenCheckout(configuration);

    checkout
      .create("dropin", {
        onSubmit: (state, dropin) => {
          dropin.setStatus("loading");
          // makePaymentCall(state.data).then...
        },
        onAdditionalDetails: (state, dropin) => {
          // makeDetailsCall(state.data).then...
        }
      })
      .mount('#dropin-container');
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">Hello World</header>

        <div className="paymentMethods">
          <button onClick={this.getPaymentMethods}> Get Payment Methods </button>
        </div>

        <div id="dropin-container"/></div>
    )
  }
}

export default App;