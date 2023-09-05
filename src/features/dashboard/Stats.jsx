import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
// icon, title, value, color
function Stats({ bookings, confirmedStays, cabins, numDays }) {
  const numBookings = bookings?.length || 0;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const numConfirmedStays = confirmedStays?.length || 0;
  const numCabins = cabins.length;
  const occupancyRate =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numCabins * numDays) || 0;

  return (
    <>
      <Stat
        title='Bookings'
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        color='blue'
      />
      <Stat
        title='Sales'
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color='green'
      />
      <Stat
        title='Check ins'
        value={numConfirmedStays}
        color='indigo'
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title='occupancy rate'
        value={Math.round(occupancyRate * 100) + "%"}
        color='yellow'
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
