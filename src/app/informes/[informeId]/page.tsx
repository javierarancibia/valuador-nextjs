'use client'

import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React, { useEffect } from 'react'

const Informe = ({ params }: { params: { informeId: string } }) => {
    useEffect(() => {
        params && fetch(`/api/reports?informeId=${params.informeId}`)
    },[ params ])

    return (
        <DefaultLayout>
            <div>Informe: { params.informeId }</div>
        </DefaultLayout>
    )
}
export default Informe;
