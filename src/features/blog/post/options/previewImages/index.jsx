import SilderImages from 'components/slider'
import {Typography} from '@material-ui/core'
import {useState} from 'react'

export default function PreviewImages({images}) {
  const [index, setIndex] = useState(0)
  return (
    <div style={{width: '100%', overflow: 'hidden'}}>
      <SilderImages images={images} setIndex={setIndex} />
      <div>
        {images.length > 0 && (
          <Typography color="textSecondary">
            {index + 1}/{images.length}
          </Typography>
        )}
      </div>
    </div>
  )
}
