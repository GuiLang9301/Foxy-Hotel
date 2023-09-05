import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

const Label = styled.label`
  font-weight: 500;
`;
function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerRoom,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { mutateToEditSetting, isUpdating } = useUpdateSettings();

  function handleUpdate(e, field) {
    const { value } = e.target;
    console.log(value);
    if (!value) return;
    mutateToEditSetting({ [field]: value });
  }
  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Label>Minimum nights/booking</Label>
        <Input
          type='number'
          id='minBookingLength'
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Label>Maximum nights/booking</Label>

        <Input
          type='number'
          id='maxBookingLength'
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Label>Maximum guests/booking</Label>

        <Input
          type='number'
          id='maxGuestPerRoom'
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestPerRoom")}
          defaultValue={maxGuestPerRoom}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Label>Breakfast price</Label>

        <Input
          type='number'
          id='breakfastPrice'
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
