import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { IUser } from "models/user"


function UserRole(props: IUser) {
    return <></>
    // const 
    // if (friend.isFriend)
    //     return <FontAwesomeIcon icon={faCheckCircle} size="md" color="green" />

    // if (friend.isInviting) return <Typography color="secondary">Inviting</Typography>

    // if (friend.isInvited)
    //     return (
    //         <Button
    //             variant="outlined"
    //             onClick={() => accept(friend)}
    //             color="primary"
    //             size="small"
    //         >
    //             accept
    //         </Button>
    //     )

    // return (
    //     <IconButton size="small" onClick={() => addFriend(friend)}>
    //         <FontAwesomeIcon icon={faPlus} size="xs" />
    //     </IconButton>
    // )
}

export default UserRole
