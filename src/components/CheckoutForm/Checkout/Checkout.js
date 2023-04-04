import React, { useEffect, useState } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import PickupInfo from '../PickupInfo';
import PaymentInfo from '../PaymentInfo';
import useStyles from './styles';

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    console.log('Order is ')
    console.log(order)
    const classes = useStyles();
    const steps = ['Pickup Info', 'Payment Details'];

    const [checkoutToken, setCheckoutToken] = useState(null);
    const [pickupInfo, setpickupInfo] = useState({});
    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1);
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);
    
    // To generate token when checkout process start
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token);

            } catch (error) {
                console.log(error);
            }
        }
        generateToken();
    }, []);


    const next = (data) => {
        setpickupInfo(data);

        nextStep();
    };

    const Form = () => activeStep === 0 
    ? <PickupInfo next={next} /> 
    : <PaymentInfo pickupInfo={pickupInfo} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />;
    
    let Confirmation = () => (order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your order, {order.customer.firstname} {order.customer.lastname}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Your order will be ready in 15 minutes</Typography>
                <Typography variant="subtitle2"><b>Store Address:</b> 2311 Baltimore Avenue, Cincinnati, OH 45069</Typography>
                <Typography variant="subtitle2"><b>Order ref:</b> {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="Button">Place Another Order</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
        )
    );

    if(error) {
        Confirmation = () => (
        <>
        <Typography vairant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="Button">Back to Home</Button>
        </>
        );
    }
    
    
    return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
  )
}

export default Checkout;
