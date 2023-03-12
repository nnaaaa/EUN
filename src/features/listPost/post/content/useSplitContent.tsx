import { INameEntity } from 'models';
import { IPost } from "models/post";
import { useMemo } from 'react';

type IDisplayEntity = Partial<INameEntity> & {
    word: string
}


export const useSplitContent = (post: IPost) => {
    const { content, contentNER } = post

    const splittedContent = useMemo(() => {
        const array: IDisplayEntity[] = []
        const entities = contentNER

        const aggregateEntities: INameEntity[] = []

        let isMatching = false
        let startPos = entities?.[0]?.start || 0
        for (let i = 0; i < entities.length - 1; i++) {
            const curEntity = entities[i]
            const nextEntity = entities[i + 1]

            if (curEntity.end === nextEntity.start && curEntity.entity === nextEntity.entity) {
                // phần tử áp cuối thì tính là đã kết thúc
                // ex: [0, 2, 1, 1] thì khi đến 1 tại vị trí thứ 2 là kết thúc
                if (i === entities.length - 2) {
                    aggregateEntities.push({
                        ...curEntity,
                        start: startPos,
                        end: nextEntity.end,
                    })
                    continue
                }
                else {
                    isMatching = true
                }
            }
            else {
                isMatching = false
            }

            if (!isMatching) {
                aggregateEntities.push({
                    ...curEntity,
                    start: startPos,
                    end: curEntity.end,
                })

                startPos = nextEntity.start
            }
        }

        let seekingStart = 0
        for (const entity of aggregateEntities) {
            const entityTarget = content.slice(entity.start, entity.end)
            // console.log(content.slice(seekingStart, entity.start))
            array.push({
                word: content.slice(seekingStart, entity.start)
            })

            seekingStart = entity.end

            // console.log(entityTarget)
            array.push({
                ...entity,
                word: entityTarget,
            })
        }
        // console.log(array)

        return array
    }, [content, contentNER])

    return { splittedContent }
}