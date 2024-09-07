import axios from 'axios'
import { useQuery } from 'react-query'
import { IOption } from 'shared/select/BasicSelect'

export interface IServiceDetails {
  id: number
  name: string
}
//These are the types of forms that are supported by dynamic form rendering
export type DynamicFormTypeOptions = 'TextBox' | 'CheckBox'

//This is the type returned when we fetch the service sub type fields.
//It includes the field type, and other importand information needed to render and validate the fields
export interface IJobExtendedData {
  extendedDataId: number
  extendedDataFieldValue: string | null
  jobServiceSubTypeID: number
  jobServiceSubTypeServiceFieldId: number
  field: {
    id: number
    fieldType: {
      id: number
      name: DynamicFormTypeOptions
    }
    defaultValue: null | string | boolean
    maxLength: number
    value?: string | boolean | null
    regexValidationExpression: null | string
    valueDataType: {
      id: number
      name: string
    }
  }
  isRequired: boolean
  isVisible: boolean
  label: string
  jobServiceSubTypeService: {
    id: number
    name: string
  }
}

//This hook will be used in the job details, and job creation form.
//based on the selected service sub type field, it will return the fields that are required for that service sub type.

export const useServiceSubTypeFields = (subTypeId: number | null) => {
  //WE omit the fields extendedDataId and extendedDataFieldValue because those are only for existing reccords, ie GET jobId will return those fields
  const fetchServiceSubTypeFields = async (
    subTypeId: number | null,
  ): Promise<
    Omit<IJobExtendedData, 'extendedDataId' | 'extendedDataFieldValue'>[]
  > => {
    const accessToken = localStorage.getItem('token')

    const res = await axios.get(
      `${process.env.API_URL}/api/v3/portal/jobServiceSubTypeServiceFields?JobServiceSubTypeId=${subTypeId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const { data } = res
    return data
  }

  return useQuery(['serviceSubTypeFields', subTypeId], () =>
    fetchServiceSubTypeFields(subTypeId),
  )
}
