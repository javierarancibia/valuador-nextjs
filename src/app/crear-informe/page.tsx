'use client'

import React from 'react'
import SelectGroupTwo from '../../components/SelectGroup/SelectGroupTwo';
import { useForm, FormProvider } from "react-hook-form"
import { useSession } from 'next-auth/react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { useRouter } from 'next/navigation'

type Inputs = {
    property: string
    reference: string
}

const ReportFormModal = () => {
    const { formState: { errors } } = useForm<Inputs>()
    const { data: session, status } = useSession();
    const router = useRouter()

    // Form
    const methods = useForm<Inputs>()
    const onSubmit = async (data: Inputs) => {
        if (status !== 'authenticated') {
            alert('You must be logged in to create a report.');
            return;
        }
    
        const response = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    
        const res = await response.json();
        if (response.ok) {
            router.push(`/informes/${res.reportId}`)
        } else {
            alert(`Error: ${res.error}`);
        }
    }
      
    return (
        <DefaultLayout>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormProvider {...methods} >
                    <h3 className="font-medium text-black dark:text-white">
                        Crea un informe
                    </h3>
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full">
                                <SelectGroupTwo />
                            </div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Ingresa nombre referencial (opcional)
                            </label>
                            <input
                                placeholder="Ingresa la dirección"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                {...methods.register("reference")}
                            />
                        </div>
                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Crear Informe
                        </button>
                    </div>
                </FormProvider>
            </form>
        </DefaultLayout>
    )
}
export default ReportFormModal;