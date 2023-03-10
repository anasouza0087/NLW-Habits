import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateRangeDates } from "../utils/generate-range-dates"
import { HabitDay } from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateRangeDates()

const minimumSummaryDates = 18 * 7
const amountOfDaysToFill = minimumSummaryDates - summaryDates.length

type Summary = Array<{
    id: string,
    date: Date,
    amount: number,
    completed: number
}>

export const SummaryTable = () => {

    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {
        api.get('summary').then(response => {
            setSummary(response?.data)
        })
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map(day => {
                    return (
                        <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">
                            {day}
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summary.length > 0 && summaryDates.map(date => {
                    const dayinSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                    })
                    return (
                        <HabitDay
                            date={date}
                            amount={dayinSummary?.amount}
                            defaultCompleted={dayinSummary?.completed}
                        />
                    )
                }
                )}
                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map(() => {
                    return <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
                })}
            </div>
        </div>
    )
}