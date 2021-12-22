import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@mui/styles'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import styled from 'styled-components'

const Image = styled.img``
const Icon = styled(FontAwesomeIcon)`
    width: 80% !important;
    height: 80%;
    position: absolute;
    left: 0;
    top: 0;
    color: #a5a7aa;
`

const css = makeStyles({
    wrapper: {
        height: (props: any) => (props.height ? props.height : '65%'),
        width: (props: any) => (props.width ? props.width : '90%'),
    },
})
var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
}

interface IPreviewImagesProps {
    images: string[] | undefined
    width?: string | number
    height?: string | number
}

export default function PreviewImages(props: IPreviewImagesProps & Settings) {
    const { images, width, height } = props
    const style = css({ width, height })
    if (!images) return <></>

    return (
        <Slider
            {...settings}
            {...props}
            className={style.wrapper}
            prevArrow={
                <button>
                    <Icon icon={faAngleLeft} />
                </button>
            }
            nextArrow={
                <button>
                    <Icon icon={faAngleRight} />
                </button>
            }
            // beforeChange={setIndex ? (oldIdx, newIdx) => setIndex(newIdx) : () => {}}
        >
            {images.map((image, i) => (
                <Image src={image} key={i} />
            ))}
        </Slider>
    )
}
