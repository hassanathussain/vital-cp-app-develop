import React, { Dispatch, SetStateAction } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { JobViewProps } from '../job-details/JobView'

interface ICalProps {
  events: any[]
  setJobViewOpen: Dispatch<SetStateAction<boolean>>
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
}
const JobCalendar = (props: ICalProps) => {
  const { setJobViewOpen, setJobViewInfo } = props
  const handleRowClick = (event: any) => {
    const extendedProps = event.event._def.extendedProps
    setJobViewOpen(true)
    setJobViewInfo({
      jobId: extendedProps.jobId,
      activityId: extendedProps.activityId,
      viewMode: 'event',
      enterInEditMode: false,
      canEdit: true,
      canCancel: true,
    })
  }
  return (
    <div
      style={{ backgroundColor: 'darkgrey', padding: '10%', margin: '20px' }}
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={props.events}
        eventContent={renderEventContent}
        eventClick={handleRowClick}
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
export default JobCalendar
