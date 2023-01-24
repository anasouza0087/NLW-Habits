import React, { useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from "phosphor-react"
import { FormEvent } from 'react'
import { api } from '../lib/axios'

const availableWeekDays = [
    'Domingo', 'Segunda-Feira',
    'Terça-Feira', 'Quarta-Feira',
    'Quinta-Feira', 'Sexta-Feira',
    'Sábado'
]

export const NewHabitForm = () => {

    const [title, setTitle] = useState("")
    const [weekDays, setWeekDays] = useState<number[]>([])

    const createNewHabit = async (e: FormEvent) => {
        debugger
        e.preventDefault()

        if (!title || weekDays.length === 0) {
            return
        } else {
            await api.post('habits', {
                title,
                weekDays
            })
            setTitle("")
            setWeekDays([])
        }
    }

    const handleToggleWeekDay = (weekDay: number) => {
        if (weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
            setWeekDays(weekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]
            setWeekDays(weekDaysWithAddedOne)
        }
    }

    return (
        <form
            className="w-full flex flex-col mt-6"
            onSubmit={createNewHabit}
        >
            <label
                htmlFor="title"
                className="font-semibold leading-tight"
            >
                Qual seu comprometimento?
            </label>

            <input
                type='text'
                id="title"
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
                placeholder="Exercicios, dormir bem, treinar, etc"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                autoFocus
            />

            <label
                htmlFor="title"
                className="font-semibold leading-tight mt-4"
            >
                Qual a recorrência?
            </label>

            <div className='mt-3 flex flex-col gap-2'>
                {availableWeekDays.map((weekDay, idx) => {
                    return (
                        <Checkbox.Root
                            className='flex items-center gap-3 group focus:outline-none'
                            checked={weekDays.includes(idx)}
                            onCheckedChange={() => handleToggleWeekDay(idx)}
                        >
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                                <Checkbox.Indicator >
                                    <Check size={20} className='text-white' />
                                </Checkbox.Indicator>
                            </div>
                            <span className='text-white leading-tight '>
                                {weekDay}
                            </span>
                        </Checkbox.Root>
                    )
                })}
            </div>

            <button
                type="submit"
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}

