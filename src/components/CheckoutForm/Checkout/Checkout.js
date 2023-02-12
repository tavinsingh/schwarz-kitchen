import React, { useEffect, useState } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { ScatterPlotSharp, SettingsPhoneSharp, SettingsPowerSharp } from '@material-ui/icons';
import { commerce } from '../../../lib/commerce';

import PickupInfo from '../PickupInfo';
import PaymentInfo from '../PaymentInfo';
import useStyles from './styles';

const Checkout = ( {cart} ) => {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();

    // To generate token when checkout process start
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token)

            } catch (error) {

            }
        }
        generateToken();
    }, []);

    const steps = ['Pickup Info', 'Payment Details'];
    const [activeStep, setActiveStep] = useState(0);
    const Form = () => activeStep === 0 ? <PickupInfo checkoutToken={checkoutToken} /> : <PaymentInfo />
    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )
    
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
                {activeStep === steps.length ? <Confirmation /> : <Form />}
            </Paper>
        </main>
    </>
  )
}

export default Checkout
