import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import {
  getBasketDetails,
  setBasketDetails,
} from '../../../features/basketDetails';
import TextEditor from '../../Common/TextEditor';

const validationSchema = yup.object({
  name: yup
    .string('Enter your Basket Name')
    .required('Basket Name is required'),
  symbol: yup
    .string('Enter your Basket Symbol')
    .required('Basket Symbol is required'),
  // description: yup
  //   .string('Enter your Description')
  //   .max(1000, 'Must be 1000 characters or less')
  //   .required('Description is required'),
});

const MyTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 10px;
  }
`;

const StepTwo = ({ setActiveStep }) => {
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const { basketDetails } = useSelector(getBasketDetails);
  useEffect(() => {
    setDescription('' || basketDetails.description);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: basketDetails.name || '',
      symbol: basketDetails.symbol || '',
      //description: '' || basketDetails.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const allValues = { ...values, description };
      dispatch(setBasketDetails({ basketData: allValues }));
      setActiveStep(2);
    },
  });

  return (
    <Grid>
      <form onSubmit={formik.handleSubmit}>
        <Grid mt={3}>
          <MyTextField
            id="name"
            name="name"
            label="Basket Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid mt={3}>
          <MyTextField
            id="symbol"
            name="symbol"
            fullWidth
            label="Basket Symbol"
            value={formik.values.symbol}
            onChange={formik.handleChange}
            error={formik.touched.symbol && Boolean(formik.errors.symbol)}
            helperText={formik.touched.symbol && formik.errors.symbol}
          />
        </Grid>

        <Grid mt={3}>
          <TextEditor
            name="description"
            placeholder="Basket Description"
            value={description}
            onChange={setDescription}
          />
        </Grid>
        <Grid mt={3} display={'flex'} justifyContent={'space-between'}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setActiveStep(0)}
          >
            Back{' '}
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Next
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default StepTwo;
