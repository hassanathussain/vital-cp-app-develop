import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import InputMask from 'react-input-mask'
import { ThemeContext } from 'styled-components'
import {
  OptionUnstyled,
  PopperUnstyled,
  SelectUnstyled,
  selectUnstyledClasses,
  SelectUnstyledProps,
} from '@mui/base'
import { optionUnstyledClasses } from '@mui/base/OptionUnstyled'
import { styled } from '@mui/system'

interface ITimePickerProps {
  time: Dayjs
  setTime: (time: Dayjs | null) => void
  setError?: (error: string | undefined) => void
}

function NewTimePicker(props: ITimePickerProps) {
  const { time, setTime, setError } = props
  const themeContext = React.useContext(ThemeContext)
  const [timeOfDay, setTimeOfDay] = React.useState<'AM' | 'PM'>(
    time?.hour() >= 12 ? 'PM' : 'AM',
  )
  const [inputVal, setInputVal] = React.useState(time?.format('hh:mm'))
  const [error, setErrorState] = React.useState(false)

  React.useEffect(() => {
    if (time) {
      if (time.hour() > 12 && parseInt(inputVal.split(':')[0]) > 12) {
        setInputVal(time?.format('HH:mm'))
      } else {
        setInputVal(time?.format('hh:mm'))
        setTimeOfDay(time?.hour() >= 12 ? 'PM' : 'AM')
      }
      if (setError) setError(undefined)
      setErrorState(false)
    }
  }, [time])

  const handleTimeOfDayChange = (value: string) => {
    setTimeOfDay(value as 'AM' | 'PM')
    if (time?.hour() < 12 && value === 'PM') {
      setTime(time.add(12, 'hour'))
    }
    if (time?.hour() >= 12 && value === 'AM') {
      setTime(time.subtract(12, 'hour'))
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
    const [hours, minutes] = e.target.value.split(':').map((elem) => {
      if (elem.replace('_', '').length !== 2) return -1
      else return parseInt(elem)
    })
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      setTime(null)
      setErrorState(true)
      return
    } else {
      if (setError) setError(undefined)
      setErrorState(false)

      const newTime = dayjs()
        .set('hour', hours)
        .set('minute', minutes)
        .set('second', 0)

      if (newTime?.isValid()) {
        if (newTime.hour() === 0 && newTime.minute() === 0) {
          setTime(newTime)
          return
        }

        if (newTime.hour() === 12 && timeOfDay === 'AM') {
          setTime(newTime.hour(0))
          return
        } else if (newTime.hour() === 12 && timeOfDay === 'PM') {
          setTime(newTime)
          return
        } else if (newTime.hour() < 12 && timeOfDay === 'PM') {
          setTime(newTime.hour(newTime.hour() + 12))
          return
        } else if (newTime.hour() >= 13 && timeOfDay === 'AM') {
          setTimeOfDay('PM')
          setTime(newTime)
          return
        } else {
          setTime(newTime)
        }
      } else {
        setTime(null)
      }
    }
  }
  const stylesInput = {
    width: '55px',
    border: 'none',

    backgroundColor: 'transparent',
    outline: 'none',
    ':focus-visable': {
      outline: '1px solid blue',
      color: 'red',
    },
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          border: '1px solid #d9d9d9',
          justifyContent: 'space-evenly',
          borderRadius: '8px',
          width: '110px',
          height: '26px',
          fontSize: '16px',
          padding: '6px 12px',
          caretColor: themeContext?.colors?.brandPrimary,
        }}
      >
        <InputMask
          value={inputVal}
          placeholder="HH:MM"
          mask="99:99"
          onChange={handleChange}
          style={{ ...stylesInput, color: error ? '#ba1a1a' : '#000000' }}
        />
        <div
          style={{
            width: '1px',
            height: '40px',
            backgroundColor: '#d9d9d9',
          }}
        ></div>
        <CustomSelect
          value={timeOfDay}
          onChange={(e, newValue) => {
            e?.preventDefault()
            if (newValue === null) return
            handleTimeOfDayChange(newValue)
          }}
        >
          <StyledOption value="AM">AM</StyledOption>
          <StyledOption value="PM">PM</StyledOption>
        </CustomSelect>
      </div>
    </>
  )
}

export default NewTimePicker

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
}

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
}

const StyledButton = styled('button')(
  ({ theme }) => `
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  text-align: left;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
border:none;
  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    font-size: 1.5em;
    padding-top: 2px;
  }
  `,
)
const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
)
const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`

const StyledListbox = styled('ul')(
  ({ theme }) => `
  padding: 6px;
  margin: 6px 0;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === 'dark' ? grey[900] : grey[200]
  };
  `,
)

function CustomSelect(props: SelectUnstyledProps<string>) {
  const slots: SelectUnstyledProps<string>['slots'] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  }

  return <SelectUnstyled {...props} slots={slots} />
}
