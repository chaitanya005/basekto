import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Grid, TextField } from '@mui/material';
import { useTheme } from '@mui/material';
import styled from '@emotion/styled';
import {
  getBasketDetails,
  setBasketDetails,
} from '../../../features/basketDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

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

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const QuillNoSSRWrap = styled(QuillNoSSRWrapper)`
  border-radius: 10px;
  border: ${(props) =>
    props.variant == 'light'
      ? '1.5px solid #00281a !important'
      : '1.5px solid #B0FFE2 !important;'};

  .ql-toolbar.ql-snow {
    border: none !important;
  }

  .ql-container.ql-snow {
    border: none !important;
  }

  & .ql-editor {
    min-height: 8rem;
  }

  & .ql-editor.ql-blank:focus::before {
    content: '';
    text-align: center;
  }

  & > .ql-container > .ql-editor.ql-blank::before {
    color: ${(props) =>
      props.variant == 'dark' ? '#B0FFE2 !important' : '#0b754e !important;'};
    font-weight: 500;
    font-size: 1rem;
    font-family: Work Sans;
    font-style: normal;
  }

  & .ql-toolbar.ql-snow {
    border-bottom: ${(props) =>
      props.variant == 'dark'
        ? '1.5px solid #B0FFE2 !important'
        : '1.5px solid #00281a !important'};
  }

  & .ql-toolbar .ql-stroke {
    fill: ${(props) => (props.variant == 'dark' ? 'none !important' : null)};
    stroke: ${(props) => (props.variant == 'dark' ? '#fff !important' : null)};
  }

  & .ql-toolbar .ql-fill {
    fill: ${(props) => (props.variant == 'dark' ? '#fff !important' : null)};
    stroke: ${(props) => (props.variant == 'dark' ? 'none !important' : null)};
  }

  & .ql-toolbar .ql-picker {
    color: ${(props) => (props.variant == 'dark' ? '#fff !important' : null)};
  }

  & .ql-snow .ql-picker.ql-expanded .ql-picker-options {
    background-color: ${(props) =>
      props.variant == 'dark' ? 'black !important' : null};
  }

  & .ql-snow.ql-toolbar button.ql-active .ql-stroke{
    stroke: ${(props) => (props.variant == 'dark' ? '#06c !important' : null)};

`;

const StepTwo = ({ setActiveStep }) => {
  const [description, setDescription] = useState('');

  const Theme = useTheme();
  const currentTheme = Theme.palette.mode;

  useEffect(() => {
    setDescription('' || basketDetails.description);
  }, []);
  const dispatch = useDispatch();
  const { basketDetails } = useSelector(getBasketDetails);

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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],

      [{ color: [] }, { background: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],

      // ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'code-block',
    'list',
    'bullet',
    'indent',
    // 'link',
    // 'image',
    // 'video',
  ];

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
          <QuillNoSSRWrap
            variant={currentTheme}
            modules={modules}
            formats={formats}
            name="description"
            placeholder="Basket Description"
            value={description}
            onChange={setDescription}
            theme="snow"
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
