import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';

const PickupInfo = ( { next } ) => {
    const methods = useForm();

    return (
        <>
            <Typography variant="h6" gutterBottom>Pick Up Order</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data }))}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First Name' />
                        <FormInput required name='lastName' label='Last Name' />
                        <FormInput required name='email' label='Email' />
                        {/* <FormInput required name='phoneNumber' label='Phone Number' /> */}
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default PickupInfo;
