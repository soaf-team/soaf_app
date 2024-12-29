import { token } from "constants/token";
import { StyleSheet, View, Text } from "react-native";
import { getDateStatus } from "utils";

type CalendarProps = {
  currentDate: Date;
  render: (day: Date, index: number, isToday: boolean) => JSX.Element;
};

export const Calendar = ({ currentDate, render }: CalendarProps) => {
  const today = new Date();

  const getMonthMatrix = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const matrix = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let week = Array(firstDayOfMonth).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(year, month, day));
      if (week.length === 7 || day === daysInMonth) {
        matrix.push(week);
        week = [];
      }
    }
    return matrix;
  };

  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
  const COLUMNS = 7;

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        {/* Weekday headers */}
        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((day) => (
            <View key={day} style={styles.weekdayCell}>
              <Text style={styles.weekdayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar days */}
        <View style={styles.daysContainer}>
          {getMonthMatrix()
            .flat()
            .map((day, index) => {
              const isToday = day && getDateStatus(day, today) === "today";
              return (
                <View key={index} style={styles.dayCell}>
                  {render(day, index, isToday)}
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  calendar: {
    width: "100%",
    gap: 8,
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
  },
  weekdayText: {
    color: token.colors.gray200,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    marginBottom: 4,
    alignItems: "center",
  },
});
