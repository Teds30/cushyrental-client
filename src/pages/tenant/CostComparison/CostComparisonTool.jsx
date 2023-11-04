import React, { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ComparisonToolContextProvider } from '../../../context/comparison-tool-context'

const CostComparisonTool = () => {
    return (
        <div>
            <ComparisonToolContextProvider>
                <Outlet />
            </ComparisonToolContextProvider>
        </div>
    )
}

export default CostComparisonTool
