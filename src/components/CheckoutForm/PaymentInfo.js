import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentInfo = ({ pickupInfo, checkoutToken, backStep, onCaptureCheckout, nextStep }) => {
  const handleSubmit = async (e, elements, stripe) => {

    //Prevents website from refreshing after clicking submit button
    e.preventDefault();

    //Handle errors
    if(!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    if(error) {
      console.log('[error]', error);
    } else {
      const orderData =  {
        line_items: checkoutToken.line_items,
        customer: { firstname: pickupInfo.firstName, lastname: pickupInfo.lastName, phonenumber: pickupInfo.phoneNumber, email: pickupInfo.email },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      };
      
      //(!orderData.customer.email) ? orderData.customer.email = 'tavin.singh21@outlook.com' : orderData.customer.email;

      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style = {{ display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="outlined" onClick={backStep}>Back to Pickup Info</Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                    Pay { checkoutToken.subtotal.formatted_with_symbol }
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentInfo;
