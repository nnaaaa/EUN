import { Box, Typography } from '@mui/material'
import clsx from 'clsx'
import { IPost } from 'models/post'
import { useContext, useMemo, useState } from 'react'
import { PostContext } from '../postContext'
import { CardContent } from '../styles'
import SplitContentInteraction from './splitContentInteraction'
import { useStyles } from './styles'
import { useSplitContent } from './useSplitContent'

interface IPostContentProps {
    post: IPost
}


const PostContent = ({ post }: IPostContentProps) => {
    const styles = useStyles()
    const { content, contentNER } = post
    const { isDisplayNERContent } = useContext(PostContext)
    const { splittedContent, aggregateEntities } = useSplitContent(post)
    const mappedEntities = useMemo(() => {
        const nameEntities = aggregateEntities.map((entity) => entity.entity)
        const filterEntities = nameEntities.filter((value, index, array) => array.indexOf(value) === index)

        return filterEntities
    }, [aggregateEntities])
    const [selectedEntities, setSelectedEntities] = useState<string[]>(mappedEntities.slice(0, 1))

    if (!content) return <></>

    if (contentNER.length && isDisplayNERContent) {
        return (
            <CardContent className={styles.contentWrapper}>
                <Box mb={2}>
                    <SplitContentInteraction aggregateEntities={aggregateEntities} selectedEntities={selectedEntities} setSelectedEntities={setSelectedEntities} mappedEntities={mappedEntities}/>
                </Box>
                {splittedContent.map((entity, index) => {
                    if (!entity.entity) return entity.word
                    if (!selectedEntities.includes(entity.entity)) return entity.word

                    return (
                        <Typography className={clsx(styles.entityWord, (styles as any)[`${entity.entity}_idEntityWord`])} key={entity.word + index} component="code">
                            {entity.word}
                            <Typography className={clsx(styles.entityName, (styles as any)[`${entity.entity}_idEntityName`])} variant="button">
                                {entity.entity}
                            </Typography>
                        </Typography>
                    )
                })}
            </CardContent>
        )
    }

    return (
        <CardContent>{content}</CardContent>
    )
}

export default PostContent