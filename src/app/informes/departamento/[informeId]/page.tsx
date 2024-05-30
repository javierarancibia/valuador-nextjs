'use client'

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Header from '@/components/ReportForm/Header'
import React, { useEffect } from 'react'

interface ArgumentType {
    informeId: string
}

const Informe = ({ params }: { params: { informeId: string } }) => {
    const getReport = async (params: ArgumentType) => {
        const response = await fetch(`/api/reports?informeId=${params.informeId}`)
        const res = await response.json()
        console.log("ressss", res);
        return res
    }

    useEffect(() => {
        params && getReport(params)
    },[ params ])

    return (
        <DefaultLayout>
            {/* <div>Informe: { params.informeId }</div> */}
            <Header />
            {/* <Breadcrumb /> */}
        </DefaultLayout>
    )
}
export default Informe;
