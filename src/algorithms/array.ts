
export const arrayIsContain = <T = string>(array: T[], ...rest: T[]) => {
    for (const eleRest of rest) {
        let key = false
        for (const eleArr of array) {
            if (eleRest === eleArr) {
                key = true
                break
            }
        }
        if (key === false)
            return false
    }
    return true
}