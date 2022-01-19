import className from './styles.module.scss'
import { useMemo } from 'react'


const Earth = () => {
    const earthSizeHalf = Number(className.earthSize) / 2

    const points = useMemo(() => {
        const list: number[] = []
        for (let i = 1; i < 50; ++i) list.push(i)
        return list
    },[])
    return (
        <div className={className.wrapper}>
            {points.map((num) => {
                const theta = (num / points.length) * 120
                const delta = (num / points.length) * Math.PI
                const x = earthSizeHalf * Math.cos(delta) * Math.cos(theta) + earthSizeHalf //+200 to center our sphere in our 3D world
                const y = earthSizeHalf * Math.cos(delta) * Math.sin(theta) + earthSizeHalf //+200 to center our sphere in our 3D world
                const z = earthSizeHalf * Math.sin(delta)
                return (
                    <div
                        key={'earth front'+num}
                        className={className.point}
                        style={{
                            transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                        }}
                    />
                )
            })}
            {points.map((num) => {
                const theta = (num / points.length) * 120
                const delta = (num / points.length) * Math.PI
                const x = -earthSizeHalf * Math.cos(delta) * Math.cos(theta) + earthSizeHalf //+200 to center our sphere in our 3D world
                const y = -earthSizeHalf * Math.cos(delta) * Math.sin(theta) + earthSizeHalf //+200 to center our sphere in our 3D world
                const z = -earthSizeHalf * Math.sin(delta)
                return (
                    <div
                        key={'earth back'+num}
                        
                        className={className.point}
                        style={{
                            transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                        }}
                    />
                )
            })}
        </div>
    )
}
export const Orbit:React.FC = ({children}) => {
    return (
        <div className={className.orbit}>
            {children}
        </div>
    )
}

export default Earth
