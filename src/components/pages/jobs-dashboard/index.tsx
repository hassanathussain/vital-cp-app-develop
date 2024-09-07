import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Button from 'shared/button'
import AddIcon from 'shared/icons/AddIcon'
import DefaultTable from 'shared/tables/DefaultTable'
import Input from 'shared/input'

import FilterGroup from './job-row-actions/FilterGroup'
import {
  StyledLabel,
  FlexDashboard,
  TableMargin,
  FilterMargin,
} from './jobDashboard.styled'
import PageLoader from 'shared/page-loader'
import NoJobs from './NoJobs'
import JobsError from './JobsError'
import { useTranslation } from 'react-i18next'
import { columns, getFilters } from 'constants/jobDashboard'
import Footer from '../../footer/Footer'
import { useJobTypeData } from 'hooks/jobs/useJobTypeData'
import { useLanguages } from 'hooks/dropdowns/useLanguages'
import { useTimeZoneOptions, useTimeZones } from 'hooks/dropdowns/useTimeZones'
import Navbar from '../../navbar'
import dayjs, { Dayjs, isDayjs } from 'dayjs'

import isBetween from 'dayjs/plugin/isBetween'
import { JobActivities, useJobActivities } from 'hooks/jobs/useJobActivities'
import { UseQueryResult } from 'react-query'
import JobView, { JobViewProps } from '../job-details/JobView'
import { useJobActivityStatuses } from 'hooks/jobs/useJobAvtivityStatuses'
import { useCountries } from 'hooks/dropdowns/useCountries'
import { useJobTypes } from 'hooks/dropdowns/useJobTypes'
import { useStates } from 'hooks/dropdowns/useStates'

import { useVideoServices } from 'hooks/dropdowns/useVideoServices'
import JobNoticeModal from 'shared/modals/JobNoticeModal'
import { IActivity } from './delete-hook'
import { AnimatePresence, motion } from 'framer-motion'
import IconButton from '@mui/material/IconButton'
import XIcon from 'shared/icons/XIcon'
import NewJobModal from 'shared/modals/NewJobModal'
import { AbsoluteFullPageWrapper } from '../new-request/newRequest.styled'

function JobDashboard() {
  const { t } = useTranslation()
  const [jobViewInfo, setJobViewInfo] = useState<JobViewProps | null>(null)
  const [jobViewOpen, setJobViewOpen] = useState(false)
  const activityStatuses = useJobActivityStatuses()
  const jobTypeData = useJobTypeData()
  const videoServiceProvider = useVideoServices()
  const languages = useLanguages()
  const timeZones = useTimeZoneOptions()
  const timeZoneData = useTimeZones()
  const jobTypes = useJobTypes()
  const countryOptions = useCountries()
  const stateOptions = useStates()
  dayjs.extend(isBetween)
  const filters = getFilters(
    activityStatuses?.data?.map((el) => el.status) || [],
    jobTypeData?.data?.map((el) => el.name) || [],
  )
  //this needs to be updted to support new filter types
  const [filterValues, setFilterValues] = useState<any>([
    undefined,
    undefined,
    undefined,
  ])

  const jobs: UseQueryResult<JobActivities[], unknown> = useJobActivities()
  const [searchValue, setSearchValue] = useState('')
  const [isTableView, setIsTableView] = useState(true)
  const [rows, setRows] = useState<JobActivities[]>(jobs.data ? jobs.data : [])

  const [showJobNoticeModal, setShowJobNoticeModal] = React.useState(false)
  const [activityList, setActivityList] = React.useState<IActivity[] | null>(
    null,
  )
  const [newJobModal, setNewJobModal] = useState<{
    show: boolean
    jobId: number | null
  }>({
    show: false,
    jobId: null,
  })
  const recentlyCreated = window.localStorage.getItem('recentlyCreated')
  const recentJobId: number | null = recentlyCreated
    ? JSON.parse(recentlyCreated).jobId
    : null
  if (recentJobId && !newJobModal.show) {
    setNewJobModal({ show: true, jobId: recentJobId })
  }

  const [page, setPage] = React.useState(0)
  useEffect(() => {
    if (jobs.data) {
      setRows(jobs?.data)
    }
  }, [jobs.status, jobs.data])
  const isInRange = (range: string, target: string) => {
    if (target.length > 12) {
      target = target.slice(0, 12)
    }

    const today = new Date()
    const targetDate = new Date(target)

    //this needs to be updted to support new filter types
    const getDateFromRangeString = (selection: string) => {
      switch (selection) {
        case 'Next 7 days':
          return new Date(new Date().setDate(new Date().getDate() + 7))
        case 'Last 7 days':
          return new Date(new Date().setDate(new Date().getDate() - 7))
        case 'Next 30 days':
          return new Date(new Date().setDate(new Date().getDate() + 30))
        case 'Last 30 days':
          return new Date(new Date().setDate(new Date().getDate() - 30))
        case 'Last Quarter':
          return new Date(new Date().setDate(new Date().getDate() - 120))
        case 'Last Year':
          return new Date(new Date().setDate(new Date().getDate() - 365))
        default:
          return new Date()
      }
    }

    //this needs to be updted to support new filter types
    const comparisonDate = getDateFromRangeString(range)
    if (comparisonDate < today) {
      if (targetDate <= today && targetDate >= comparisonDate) {
        return true
      }
    } else {
      if (targetDate >= today && targetDate <= comparisonDate) {
        return true
      }
    }
    return false
  }
  const isSameType = (types: string[], rowType: string): boolean => {
    if (types.includes(rowType)) {
      return true
    } else {
      return false
    }
  }
  const today = dayjs().set('day', dayjs().get('day') - 1)
  const filterdRows = rows
    .filter((row) => {
      if (filterValues.every((el: any) => el === undefined)) {
        if (row.activityStatus !== 'Cancelled') {
          if (row.activityStatus !== 'Complete') {
            if (
              row.requestTitle
                .toUpperCase()
                .includes(searchValue.toUpperCase()) ||
              row.serviceRequestType
                .toUpperCase()
                .includes(searchValue.toUpperCase()) ||
              row.activityStatus
                .toUpperCase()
                .includes(searchValue.toUpperCase()) ||
              row?.activityServiceProvider
                ?.toUpperCase()
                .includes(searchValue.toUpperCase())
            ) {
              if (dayjs(row.activityStartDate).isAfter(today, 'day')) {
                return true
              }
            }
          }
        }
        return
      }
      if (
        row.requestTitle.toUpperCase().includes(searchValue.toUpperCase()) ||
        row.serviceRequestType
          .toUpperCase()
          .includes(searchValue.toUpperCase()) ||
        row.activityStatus.toUpperCase().includes(searchValue.toUpperCase()) ||
        row?.activityServiceProvider
          ?.toUpperCase()
          .includes(searchValue.toUpperCase())
      ) {
        if (Array.isArray(filterValues[0]) && isDayjs(filterValues[0][1])) {
          if (
            filterValues[0] === undefined ||
            (dayjs(row.activityStartDate.toString()).isBetween(
              filterValues[0][0],
              filterValues[0][1],
              'day',
            ) &&
              (filterValues[1] === undefined ||
                filterValues[1].includes(row.activityStatus)) &&
              (filterValues[2] === undefined ||
                filterValues[2].includes(row.serviceRequestType)))
          ) {
            return true
          }
        } else if (
          (filterValues[0] === undefined ||
            isInRange(filterValues[0], row.activityStartDate.toString())) &&
          (filterValues[1] === undefined ||
            filterValues[1].includes(row.activityStatus)) &&
          (filterValues[2] === undefined ||
            isSameType(filterValues[2], row.serviceRequestType))
        )
          return true
      }
    })
    .sort((a, b) => {
      return dayjs(a.activityStartDate).isBefore(dayjs(b.activityStartDate))
        ? -1
        : 1
    })
  // throttling the filter functionality to avoid unecessary high level tree re-renders
  if (jobs.status === 'success' && rows.length === 0) {
    return <NoJobs />
  }
  if (jobs.status === 'error')
    //eslint-disable-next-line
    //@ts-ignore
    return <JobsError statusCode={jobs?.error?.response?.status} />
  if (jobs.status === 'loading') return <PageLoader />
  return (
    <AbsoluteFullPageWrapper>
      <FlexDashboard>
        <div>
          <StyledLabel>
            <Input
              value={searchValue}
              setValue={(e: any) => {
                setSearchValue(e.target.value)
                setPage(0)
              }}
              fontSize="16px"
              backgroundColor="#e9eaea"
              placeholder={t('Search')}
              size="lg"
              padding="10px 40px"
            />
          </StyledLabel>
          <FilterMargin>
            <FilterGroup
              filters={filters}
              values={filterValues}
              setValues={setFilterValues}
            />
          </FilterMargin>
        </div>
        <Link to={'add-new-request'} style={{ textDecoration: 'none' }}>
          <Button
            variant="primary"
            fontSize="16px"
            size="lg"
            overrideHover="#00a297"
          >
            <AddIcon />
            <span>{t('Create New Request')}</span>
          </Button>
        </Link>
      </FlexDashboard>
      <TableMargin>
        {jobs.status === 'success' && isTableView && (
          <DefaultTable
            filterValues={filterValues}
            setJobViewOpen={setJobViewOpen}
            setJobViewInfo={setJobViewInfo}
            rowData={filterdRows}
            columnData={columns}
            page={page}
            setPage={setPage}
            paginated={true}
            setJobNotice={setShowJobNoticeModal}
            setActivityList={setActivityList}
          />
        )}{' '}
        <JobNoticeModal
          handleConfirm={(e: any) => {
            e.stopPropagation()
            setShowJobNoticeModal(false)
          }}
          handleCancel={(e: any) => {
            e.stopPropagation()
            setShowJobNoticeModal(false)
          }}
          showModal={showJobNoticeModal}
          setJobViewOpen={setJobViewOpen}
          setJobViewInfo={setJobViewInfo}
          data={activityList}
        />
      </TableMargin>
      <div style={{ paddingTop: '100px' }}>
        <Footer />
      </div>
      {jobViewOpen && jobViewInfo && (
        <JobView
          jobId={jobViewInfo.jobId}
          activityId={jobViewInfo.activityId}
          viewMode={jobViewInfo.viewMode}
          enterInEditMode={jobViewInfo.enterInEditMode}
          canEdit={jobViewInfo.canEdit}
          canCancel={jobViewInfo.canCancel}
          setIsOpen={setJobViewOpen}
          setJobViewInfo={setJobViewInfo}
          setJobNotice={setShowJobNoticeModal}
          setActivityList={setActivityList}
        />
      )}{' '}
      <AnimatePresence>
        {newJobModal.show && (
          <NewJobModal
            modalProps={newJobModal}
            setModalProps={setNewJobModal}
            setJobViewOpen={setJobViewOpen}
            setJobViewInfo={setJobViewInfo}
          />
        )}
      </AnimatePresence>
    </AbsoluteFullPageWrapper>
  )
}

export default JobDashboard
