import React from 'react'
import Select from 'react-select'
import {makeStyles} from '@material-ui/styles'

const css = makeStyles({
  wrapper: {
    marginLeft: 9,
    width: 120,
    padding: 2,
  },
})

export const options = [
  {value: 'public', label: '🌏 public'},
  {value: 'friend', label: '👨‍👧‍👧 friend'},
  {value: 'private', label: '🔒 private'},
]

export default function SelectMode({mode, setMode}) {
  const style = css()
  return (
    <Select
      className={style.wrapper}
      value={mode}
      onChange={(value) => setMode(value)}
      options={options}
    />
  )
}
