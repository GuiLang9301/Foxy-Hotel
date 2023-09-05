import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("status");
  //filter
  if (filteredValue === null || filteredValue === "all") {
  }
  const filter =
    filteredValue === null || filteredValue === "all"
      ? null
      : {
          value: filteredValue,
          field: "status",
        };

  //sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = {
    field: field,
    direction: direction,
  };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBookings(filter, sortBy),
    queryKey: ["bookings", filter, sortBy],
  });

  return { bookings, isLoading, error };
}
