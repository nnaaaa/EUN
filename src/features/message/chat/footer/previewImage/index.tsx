import styled from 'styled-components'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { makeStyles } from '@mui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'


const Image = styled.img`
`
const Icon = styled(FontAwesomeIcon)`
    width:100% !important;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    color: #a5a7aa;
`

const css = makeStyles({
    wrapper: {
        height: 'min-content',
        width: '80%',
    },
    paging: {
        width: '100%',
        height: 0,
        paddingTop: '100%',
        objectFit: 'cover',
    },
})
var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
}

export default function PreviewImages({ images }: { images: string[] | undefined}) {
    const style = css()

    if (!images) return <></>

    return (
        <Slider
            {...settings}
            className={style.wrapper}
            prevArrow={<button><Icon icon={faAngleLeft}/></button>}
            nextArrow={<button><Icon icon={faAngleRight}/></button>}
            // beforeChange={setIndex ? (oldIdx, newIdx) => setIndex(newIdx) : () => {}}
        >
            {images.map((image, i) => (
                <Image src={image} key={i} />
            ))}
        </Slider>
    )
}
