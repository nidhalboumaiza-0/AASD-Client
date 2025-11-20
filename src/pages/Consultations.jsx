import ConsultationsTable from '@/components/custom/data-tables/consultations-table'
import { Typography } from 'antd'
import React from 'react'

const Consultations = () => {
  return (
    <div>
        <Typography.Title level={3}>Mes Consultations</Typography.Title>
        <ConsultationsTable />
    </div>
  )
}

export default Consultations