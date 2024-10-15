import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivities(){
    const { data: todayActivities, isLoading } = useQuery({
        queryKey: ['todayActivities'],
        queryFn: getStaysTodayActivity
    })
    return {todayActivities, isLoading}
}