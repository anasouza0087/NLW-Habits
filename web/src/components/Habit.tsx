interface HabitProps {
    completed: number
}

export function Habit(props: HabitProps) {
    return (
        <div className="bg-yellow-900">Hábitos completados do dia: {props?.completed}</div>
    )
}