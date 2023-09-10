import styled from "styled-components";
import * as Yup from "yup";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useFormik } from "formik";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import FormRow from "../../ui/FormRow";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onModalClose }) {
  const { id: editId } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const formik = useFormik({
    initialValues: isEditSession
      ? cabinToEdit
      : {
          name: "",
          maxCapacity: "",
          regularPrice: "",
          discount: 0,
          description: "",
          image: "",
        },

    onSubmit: isEditSession
      ? (newCabinData) => {
          // const updated = { ...newCabinData, editId };
          mutateToEdit(newCabinData);
          onModalClose?.();
        }
      : (values) => {
          mutateToAdd(values);
          formik.resetForm();
          onModalClose?.();
        },

    //form validation
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .max(20, "Name Must be 20 Characters or less"),
      maxCapacity: Yup.number()
        .required("maxium Capacity is required")
        .min(1, "maxium capacity should be at least 1 person"),
      regularPrice: Yup.number()
        .required("Regular price is required")
        .min(100, "Regular price should be at least $100"),
      discount: Yup.number(),
      description: Yup.string(),
      image: Yup.string().url().required("Must contain an image"),
    }),
  });

  const { isCreating, mutateToAdd } = useCreateCabin();
  const { isEditing, mutateToEdit } = useEditCabin();
  return (
    <Form
      onSubmit={formik.handleSubmit}
      type={onModalClose ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor='name'>
          {formik.errors.name && formik.touched.name ? (
            <Error>{formik.errors.name}</Error>
          ) : (
            "Cabin Name"
          )}
        </Label>
        <Input
          type='text'
          id='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='maxCapacity'>
          {formik.errors.maxCapacity && formik.touched.maxCapacity ? (
            <Error>{formik.errors.maxCapacity}</Error>
          ) : (
            "Maximum capacity"
          )}
        </Label>
        <Input
          type='number'
          id='maxCapacity'
          value={formik.values.maxCapacity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='regularPrice'>
          {" "}
          {formik.errors.regularPrice && formik.touched.regularPrice ? (
            <Error>{formik.errors.regularPrice}</Error>
          ) : (
            "Regular Price"
          )}
        </Label>
        <Input
          type='number'
          id='regularPrice'
          value={formik.values.regularPrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='discount'>
          {" "}
          {formik.errors.discount ? (
            <Error>{formik.errors.discount} </Error>
          ) : (
            "Discount"
          )}
        </Label>
        <Input
          type='number'
          id='discount'
          value={formik.values.discount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='description'>
          {" "}
          {formik.errors.description ? (
            <Error>{formik.errors.description}</Error>
          ) : (
            "Description for Website"
          )}
        </Label>
        <Textarea
          type='number'
          id='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>
          {formik.errors.image && formik.touched.image ? (
            <Error>{formik.errors.image}</Error>
          ) : (
            "Cabin Photo"
          )}
        </Label>
        <FileInput
          // type='file'
          id='image'
          accept='image/*'
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onModalClose?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing} type='submit'>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
