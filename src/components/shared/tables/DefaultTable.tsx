import React, { useEffect, useMemo } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

import Status from '../status'

import { DefaultTableProps } from 'models/tables'
import { Column } from 'models/columns'
import JobRowActions from '../../pages/jobs-dashboard/job-row-actions/JobRowActions'
import TablePagination from './TablePagination'
import dayjs from 'dayjs'

function DefaultTable<
  T extends {
    activityId: number
    jobId: number
    isRecurring: boolean
    activityStatus: string
    activityStartDate: string
    canEditDeleteActivity: boolean
  },
>(props: DefaultTableProps<T>) {
  const {
    rowData,
    columnData,
    paginated,
    setJobViewInfo,
    setJobViewOpen,
    filterValues,
    setJobNotice,
    setActivityList,
    page,
    setPage,
  } = props
  const rowsPerPage = 8
  useEffect(() => {
    setPage(0)
  }, [filterValues])
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }
  //make a date 2 days from now
  const twoDaysFromNow = dayjs().add(2, 'day')

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
              {rowData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: T) => {
                  const handleRowClick = (e: any) => {
                    e.stopPropagation()
                    setJobViewOpen(true)
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
                      sx={{
                        cursor: 'pointer',
                        textDecoration: 'none',
                        maxHeight: '60px',
                      }}
                    >
                      {columnData?.map((column: Column) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const value = row[column.id]

                        if (column.id === 'actions') {
                          return (
                            <TableCell
                              key={row.activityId + column.id}
                              align={column.align}
                              className="action"
                              sx={{ paddingRight: '2px' }}
                            >
                              <JobRowActions
                                canEdit={row.canEditDeleteActivity}
                                canCancel={row.canEditDeleteActivity}
                                jobId={row.jobId}
                                status={row.activityStatus}
                                activityId={row.activityId}
                                setJobViewInfo={setJobViewInfo}
                                setJobViewOpen={setJobViewOpen}
                                isRecurring={row.isRecurring}
                                setJobNotice={setJobNotice}
                                setActivityList={setActivityList}
                              />
                            </TableCell>
                          )
                        } else if (column.id === 'activityStatus') {
                          return (
                            <TableCell
                              key={row.activityId + column.id}
                              align={column.align}
                            >
                              <Status status={value} />
                            </TableCell>
                          )
                        } else if (
                          column.id === 'serviceProvider' ||
                          column.id === 'consumerName'
                        ) {
                          const getTrimmedRows = (rows: string[]): string[] => {
                            if (rows.length > 3) {
                              return [...rows.slice(0, 3), '...']
                            } else {
                              return rows
                            }
                          }
                          const rows = value?.split ? value?.split(',') : []
                          const formatedRows = getTrimmedRows(rows)
                          return (
                            <TableCell
                              key={row.activityId + column.id}
                              align={column.align}
                              sx={{
                                maxHeight: '60px',
                                height: '60px',
                                overflowX: 'hidden',
                                overflowY: 'hidden',
                                scrollbarWidth: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                              }}
                            >
                              {formatedRows?.map((row: string, i: number) => {
                                return <div key={i}> {row}</div>
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
              {emptyRows > 0 && (
                <tr style={{ height: 82 * emptyRows }}>
                  <td colSpan={3} />
                </tr>
              )}
            </TableBody>
          </Table>
          {paginated && rowData.length > rowsPerPage && (
            <TablePagination
              count={rowData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
            />
          )}
        </TableContainer>
      </Paper>
    </>
  )
}
export default DefaultTable
