import { View, Text } from "react-native";
import TableInfo from "./TableInfo";
export default function TrainingPointsAnalyst() {

    const data = [
        {key: "Điểm sinh viên tự chấm", value: '75'},
        {key: "Điểm tham gia sự kiện", value: '5'},
        {key: "Điểm tham gia CLB", value: '3'},
        {key: "Điểm tham gia NCKH", value: '0'},
        {key: "Điểm học tập", value: '14'},
    ]


    return (
        <View>
            <TableInfo data={data} />
        </View>
    )
}
