import { useEffect, useMemo, useState } from 'react'

interface IBlockingSpam {
    checkerTime: number
    limitMessagePerCheckerTime: number
    blockingTime: number
}

export const useBlockingSpam = (
    checkerTime: number = 10000,
    messageAmount: number = 20
) => {
    const blockingSpam = useMemo<IBlockingSpam>(
        () => ({
            //blockingTime must be less than checkerTime.
            //Any error algorithm because this values equal !!
            blockingTime: checkerTime / 2,
            limitMessagePerCheckerTime: messageAmount,
            checkerTime: checkerTime,
        }),
        []
    )
    const [countCurSpam, setCountCurSpam] = useState<number>(0)
    const [timeToAllow, setTimeToAllow] = useState<number>(0)
    const [isAllow, setAllow] = useState<boolean>(true)
    useEffect(() => {
        const checkerTimeout = setInterval(() => {
            if (!isAllow) return
            setCountCurSpam((prev) => {
                //nếu chưa vượt qua mức cho phép thì tiếp tục cho chat
                if (prev < blockingSpam.limitMessagePerCheckerTime) return 0
                else {
                    setAllow(false)
                    //tăng phần trăm của thời gian từ lúc cấm chat đến lúc cho phép chat
                    let percentTimeout = setInterval(() => {
                        setTimeToAllow((pre) => {
                            return pre + 1
                        })
                    }, blockingSpam.blockingTime / 100)
                    // ngưng việc cấm và set mọi thứ về ban đầu
                    setTimeout(() => {
                        clearTimeout(percentTimeout)
                        setAllow(true)
                        setTimeToAllow(0)
                        setCountCurSpam(0)
                    }, blockingSpam.blockingTime)
                }
                return prev
            })
        }, blockingSpam.checkerTime)
        return () => {
            clearTimeout(checkerTimeout)
        }
    }, [blockingSpam])
    return {
        isAllow,
        timeToAllow,
        setCountCurSpam: () => setCountCurSpam((pre) => pre + 1),
    }
}

const focus = async () => {
    // await updateDocument('rooms', id, {
    //     composing: firebase.firestore.FieldValue.arrayUnion(myUid),
    // })
}
const blur = async () => {
    // await updateDocument('rooms', id, {
    //     composing: firebase.firestore.FieldValue.arrayRemove(myUid),
    // })
}
