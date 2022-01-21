import { IMuiFbPhotoGridImage, MuiFbPhotoGrid } from 'mui-fb-photo-grid'
import { useMemo } from 'react'

interface IDisplayGridImages {
    images: string[]
    title: string
}

export default function DisplayGridImages(props: IDisplayGridImages) {
    const images = useMemo<IMuiFbPhotoGridImage[]>(
        () =>
            (props.images as string[]).map((image) => ({
                title: props.title,
                img: image,
                imgThumbnail: image,
            })),
        [props]
    )

    return images.length ? (
        <MuiFbPhotoGrid images={images} reactModalStyle={{ overlay: { zIndex: 2000 } }} />
    ) : (
        <></>
    )
}
