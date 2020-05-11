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
    // link.integrity = 'sha384-y1lKqffK5z+ENzddmGIfP3bcMRobxkjDt/9lyPAvV9H3JXbJYxCSD6L8TdyRMCGM';
    // link.crossorigin = 'anonymous';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.7.0/adyen.js';
    script.async = true;
    // script.integrity = 'sha384-aRaL1/W2ASAwZpEWmiHJJAhcc5h+pwDywrocWjla8oCSJaMlY4MC2hOPvAaOcOCq';
    // script.crossorigin = 'anonymous';
    script.onload = this.initAdyenCheckout; // Wait until the script is loaded before initiating AdyenCheckout
    document.body.appendChild(script);
  }

  initAdyenCheckout() {
    const configuration = {
      locale: 'en_US',
      environment: 'test',
      originKey: API_KEY,
      paymentMethodsResponse: paymentMethodsSample,
      amount: {
        value: 1000,
        currency: "USD"
      }
  };

  // You can add AdyenCheckout to your list of globals and then delete the window reference:
    // const checkout = new AdyenCheckout(configuration);
    const checkout = new window.AdyenCheckout(configuration);

    // If you need to refer to the dropin externaly, you can save this inside a variable:
    // const dropin = checkout.create...
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
    // const { data, isLoading } = this.state;

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