import { useAppSelector } from 'states/hooks'
import Result from './result'

interface IProps {}

function ListResult(props: IProps) {
    const { current, loading, error } = useAppSelector((state) => state.search)
    const user = useAppSelector((state) => state.user.current)
    
    if (loading || error || !user) return <></>
    return (
        <>
            {current.map((stranger, index) => (
                <Result key={'searchResult' + index} stranger={stranger} user={user}/>
            ))}
        </>
    )
}
export default ListResult
