export type BorderTiles = number[]

export interface Sensor {
    x: number
    y: number
    type: 'pure' | 'hit' | 'miss'
}

export type SensorTiles = Sensor[]
