import React, { useEffect, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { api } from '../lib/axios'
import dayjs from 'dayjs'

interface HabitListProps {
    date: Date
    OnCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string,
        title: string,
        created_at: string
    }>,
    completedHabits: string[]
}

export const HabitList = ({ date, OnCompletedChanged }: HabitListProps) => {

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    const isDateInPast = dayjs(date)
        .endOf('day')
        .isBefore(new Date())

    const handleToggleHabits = async (habitId: string) => {
        const isHabitPreviouslyCompleted = habitsInfo!.completedHabits.includes(habitId)
        let completedHabits: string[] = []

        await api.patch(`/habits/${habitId}/toggle`)

        if (isHabitPreviouslyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }
        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        })

        OnCompletedChanged(completedHabits.length)
    }

    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString(),
            }
        }).then(response => setHabitsInfo(response?.data))
    }, [])


    return (
        <div className='mt-6 flex flex-col gap-3'>
            {habitsInfo?.possibleHabits?.map(habit => {
                return (
                    <Checkbox.Root
                        key={habit?.id}
                        className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
                        checked={habitsInfo.completedHabits.includes(habit?.id)}
                        disabled={isDateInPast}
                        onCheckedChange={() => handleToggleHabits(habit.id)}
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                            <Checkbox.Indicator >
                                <Check size={20} className='text-white' />
                            </Checkbox.Indicator>
                        </div>
                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                            {habit?.title}
                        </span>
                    </Checkbox.Root>
                )
            })}
        </div>
    )
}