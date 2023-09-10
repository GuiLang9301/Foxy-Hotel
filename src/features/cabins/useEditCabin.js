import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: mutateToEdit, isLoading: isEditing } = useMutation({
    mutationFn: (newCabinData) => editCabin(newCabinData),
    onSuccess: () => {
      toast.success("Cabin has been successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, mutateToEdit };
}
