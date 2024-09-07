import React from 'react'

import { IFormProps } from 'models/jobDashboard'

import DataCardRowForm from './DataCardRowForm'
import { VerticalGroup } from 'styles/styledComponents/containers'
import { useFormikContext } from 'formik'
import { IJobExtendedData } from 'hooks/jobs/dynamicForms/useServiceSubTypeFields'
import { viewModes } from '../../job-details/JobView'
import { t } from 'i18next'

interface IProps {
  label: string
  forms: IFormProps[]
  isEditMode: boolean
  viewMode: viewModes
  jobId: number
  activityId: number
}
function DataCardRow(props: IProps) {
  const { label, forms, isEditMode, viewMode, jobId, activityId } = props
  const formik = useFormikContext()
  interface IValues {
    address1: string
    address2: string
    city: string
    state: number
    zipCode: string
    country: number
    serviceType: number
    repeats: number
    jobExtendedData: IJobExtendedData[]
  }
  const values = formik.values as IValues

  const dynamicLabelList = values?.jobExtendedData.map((field) => field.label)

  if (label === 'On' && values.repeats !== 2) return null
  if (label === 'Repeats' && !isEditMode) return null
  if (label === 'Every' && (!isEditMode || values.repeats === 0)) return null
  if (label === 'End date' && values.repeats === 0) return null
  if (label === 'On' && !isEditMode) return null

  return (
    <div style={{ margin: '8px 0px' }}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div style={{ width: '180px' }}>
          {label === 'dynamic' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isEditMode && viewMode !== 'event' ? '20px' : '25px',
              }}
            >
              {dynamicLabelList.map((el) => (
                <label
                  key={el}
                  style={{
                    fontWeight: 600,
                    fontSize: '14px',
                    color: 'rgba(0, 0, 0, 0.6)',
                    margin:
                      isEditMode && viewMode !== 'event' ? '18px 0px' : '',
                  }}
                >
                  {t(el)}
                </label>
              ))}
            </div>
          ) : (
            <label
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {label}
            </label>
          )}
        </div>
        <VerticalGroup>
          {forms?.map((form, i) => {
            return (
              <DataCardRowForm
                placeholder={form.placeholder}
                name={form.name}
                label={form.label}
                type={form.type}
                options={form?.options}
                key={i}
                isEdit={form.isEdit}
                selectValue={form.selectValue}
                disabled={form.disabled}
                jobId={jobId}
                activityId={activityId}
                viewMode={viewMode}
              />
            )
          })}
        </VerticalGroup>
      </div>
    </div>
  )
}

export default DataCardRow
