import { ResponsiveLine } from '@nivo/line'
import React from 'react'

import { formatCurrency, parseAndFormatDate } from '../lib/helpers'

export const Chart = ({ data }) => (
  <ResponsiveLine
    axisBottom={null}
    axisLeft={null}
    colors="#059669"
    data={[
      {
        data,
        id: 'data'
      }
    ]}
    enableCrosshair={false}
    enableGridX={false}
    enableGridY={false}
    enablePoints={false}
    enableSlices="x"
    lineWidth={1}
    margin={{
      bottom: 8,
      left: 8,
      right: 8,
      top: 8
    }}
    sliceTooltip={({ slice }) => (
      <div className="bg-emerald-200 text-center p-3">
        <div className="font-semibold">{slice.points[0].data.yFormatted}</div>
        <div className="text-sm">{slice.points[0].data.xFormatted}</div>
      </div>
    )}
    useMesh
    xFormat={(value) => parseAndFormatDate(value)}
    yFormat={(value) => formatCurrency(value)}
    yScale={{
      max: 'auto',
      min: 'auto',
      type: 'linear'
    }}
  />
)
