import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import { 
    CountdownContainer, 
    HomeContainer, 
    FormContainer, 
    Separator, 
    StartCountdownButton, 
    TaskInput, 
    MinutesAmountInput 
} from "./styles";

const newCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'O ciclo deve ser de no máximo 60 minutos'),
})

export function Home() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCicleFormValidationSchema), 
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchema>

    function handleCreateNewCicle(data: NewCycleFormData) {
        console.log(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                    id="task" 
                    list="task-suggestions"
                    placeholder="Dê um nome para o seu projeto" 
                    {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Tarefa 1" />
                        <option value="Tarefa 2" />
                        <option value="Tarefa 3" />
                        <option value="Tarefa 4" />
                    </datalist>

                    <label htmlFor="">durante</label>
                    <MinutesAmountInput 
                    type="number" 
                    id="minutesAmount" 
                    placeholder="00" 
                    step={5}
                    min={5}
                    max={60}
                    {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}