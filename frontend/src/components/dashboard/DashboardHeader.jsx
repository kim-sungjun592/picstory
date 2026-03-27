import React from 'react'
import Button from '@/components/ui/Button'
const DashboardHeader = () => {
  return (
     <div className="dashboard-header">
          <h2>새 메모를 작성하세요</h2>
          <Button text="새 메모 작성" className="primary" icons/>
        </div>
  )
}

export default DashboardHeader