import { ResponsiveLine } from '@nivo/line'
import React from 'react'

import { formatCurrency, parseAndFormatDate } from '../lib/helpers'

export const Chart = ({ data: { data, tickValues }, interval }) => (
  <ResponsiveLine
    axisBottom={{
      format: (value) => parseAndFormatDate(value, false),
      tickPadding: interval === 'all' ? 0 : 8,
      tickSize: 0,
      tickValues
    }}
    axisLeft={null}
    colors="#059669"
    crosshairType="x"
    data={[
      {
        data,
        id: 'data'
      }
    ]}
    enableGridX={false}
    enableGridY={false}
    enablePoints={false}
    enableSlices="x"
    lineWidth={1}
    margin={{
      bottom: interval === 'all' ? 8 : 32,
      left: 8,
      right: 8,
      top: 8
    }}
    theme={{
      fontFamily: 'inherit'
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
