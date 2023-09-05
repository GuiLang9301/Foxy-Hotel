import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: mutateToEditSetting, isLoading: isUpdating } = useMutation({
    mutationFn: (newSettings) => updateSetting(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("New settings has been successfully updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutateToEditSetting, isUpdating };
}
