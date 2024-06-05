'use client'

import React, { useEffect } from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Header from '@/components/ReportForm/Header'
import { useQuery } from '@tanstack/react-query'

interface ArgumentType {
    informeId: string
}

const Informe = ({ params }: { params: { informeId: string } }) => {
    const getReport = async (params: ArgumentType) => {
        const response = await fetch(`/api/reports?informeId=${params.informeId}`)
        const res = await response.json()
        return res
    }
    const { data } = useQuery({ queryKey: ['report', params], queryFn: () => getReport(params) })
    data && console.log(data)

    useEffect(() => {

        return () => {
            console.log("unmounting");
        };
    }, []);

    if (data) {
        return (
            <DefaultLayout>
                <Header />
            </DefaultLayout>
        )
    }
}
export default Informe;
