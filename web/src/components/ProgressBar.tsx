interface ProgressBarProps {
    progress: number
}


export const ProgressBar = (props: ProgressBarProps) => {
    return (
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
            <div
                className='h-3 rounded-xl bg-violet-600'
                role="progressbar"
                aria-aria-valuenow={props.progress}
                aria-label='Progresso de Hábitos'
                style={{ width: `${props.progress}%` }}
            />
        </div>
    )
}

