import React from 'react'
import SelectGroupTwo from '../SelectGroup/SelectGroupTwo';
import { useForm, SubmitHandler } from "react-hook-form"
import { useSession } from 'next-auth/react';

type Inputs = {
    property: string
    reference: string
}

const ReportFormModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const { data: session, status } = useSession();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (status !== 'authenticated') {
            alert('You must be logged in to create a report.');
            return;
        }
    
        const response = await fetch('/api/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, email: session?.user?.email }),
        });
    
        const res = await response.json();
        if (response.ok) {
            alert('Report created successfully!');
        } else {
            alert(`Error: ${res.error}`);
        }
    }
      
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-medium text-black dark:text-white">
                Crea un informe
            </h3>
            <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full">
                        {/* <SelectGroupTwo /> */}
                        <input
                            placeholder="Ingresa la dirección"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            {...register("property")}
                        />
                    </div>
                </div>
                <div className="mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Ingresa nombre referencial (opcional)
                    </label>
                    <input
                        placeholder="Ingresa la dirección"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        {...register("reference")}
                    />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Crear Informe
                </button>
            </div>
        </form>
    )
}
export default ReportFormModal;