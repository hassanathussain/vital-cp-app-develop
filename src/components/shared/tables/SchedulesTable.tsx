import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

import Status from '../status'

import { ScheduleTableProps } from 'models/tables'
import { Column } from 'models/columns'
import JobRowActions from '../../pages/jobs-dashboard/job-row-actions/JobRowActions'
import dayjs from 'dayjs'

export interface JobSchedule {
  activityId: number
  jobId: number
  status: string
  startDate: string
  canEditDeleteActivity: boolean
}

export interface IServiceProvider {
  serviceProviderUserId: number
  serviceProviderFirstName: string
  serviceProviderLastName: string
}
function SchedulesTable<T extends JobSchedule>(props: ScheduleTableProps<T>) {
  const {
    rowData,
    columnData,
    setJobViewInfo,
    setIsDetailView,
    setIsEditMode,
    setJobNotice,
    setActivityList,
  } = props
  const [page, setPage] = React.useState(0)

  return (
    <>
      <Paper sx={{ width: '100%', boxShadow: 'none' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              <TableRow sx={{ backgroundColor: '#fafafa' }}>
                {columnData.map((column: Column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
            <TableBody>
              {rowData.map((row: T) => {
                const handleRowClick = (e: any) => {
                  e.stopPropagation()
                  setIsDetailView(true)
                  setIsEditMode(false)
                  setJobViewInfo({
                    jobId: row.jobId,
                    activityId: row.activityId,
                    viewMode: 'event',
                    enterInEditMode: false,
                    canEdit: row.canEditDeleteActivity,
                    canCancel: row.canEditDeleteActivity,
                  })
                }
                return (
                  <TableRow
                    className={`row`}
                    id={String(row.activityId)}
                    hover
                    role="checkbox"
                    onClick={handleRowClick}
                    tabIndex={-1}
                    key={row.activityId}
                    sx={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    {columnData?.map((column: Column) => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      const value = row[column.id]
                      const isWithenTwoDays = dayjs(row.startDate).isAfter(
                        dayjs().add(2, 'day'),
                        'hour',
                      )

                      if (column.id === 'actions') {
                        return (
                          <TableCell
                            key={row.activityId + column.id}
                            align={column.align}
                            className="action"
                            sx={{ paddingRight: '2px' }}
                          >
                            <JobRowActions
                              status={row.status}
                              setIsEditMode={setIsEditMode}
                              activityId={row.activityId}
                              jobId={row.jobId}
                              setJobViewInfo={setJobViewInfo}
                              isRecurring={rowData.length > 1}
                              setIsDetailView={setIsDetailView}
                              canEdit={row.canEditDeleteActivity}
                              canCancel={row.canEditDeleteActivity}
                              setActivityList={setActivityList}
                              setJobNotice={setJobNotice}
                            />
                          </TableCell>
                        )
                      } else if (column.id === 'status') {
                        return (
                          <TableCell
                            key={row.activityId + column.id}
                            align={column.align}
                          >
                            <Status status={value} />
                          </TableCell>
                        )
                      } else if (column.id === 'serviceProvider') {
                        return (
                          <TableCell
                            key={row.activityId + column.id}
                            align={column.align}
                          >
                            {value?.map((row: IServiceProvider, i: number) => {
                              return (
                                <div key={i}>
                                  {' '}
                                  {`${row.serviceProviderFirstName} ${row.serviceProviderLastName}`}
                                </div>
                              )
                            })}
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell
                            key={row.activityId + column.id}
                            align={column.align}
                            sx={{
                              fontSize: '14px',
                              lineHeight: '20px',
                              fontWeight:
                                column.id === 'requestTitle' ? 'bold' : '',
                              padding: '10px 16px',
                            }}
                          >
                            {value}
                          </TableCell>
                        )
                      }
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}
export default SchedulesTable
