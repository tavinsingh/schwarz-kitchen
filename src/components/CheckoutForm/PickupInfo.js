import React, {useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import FormInput from './FormInput';

const PickupInfo = ( {checkoutToken} ) => {
    const methods = useForm();

    return (
        <>
            <Typography variant="h6" gutterBottom>Pick Up Order</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First Name' />
                        <FormInput required name='lastName' label='Last Name' />
                        <FormInput required name='phoneNumber' label='Phone Number' />
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default PickupInfo
