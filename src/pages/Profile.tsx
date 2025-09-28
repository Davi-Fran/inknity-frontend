import { useAuthentication } from '../contexts/AuthContext'

const Profile = () => {
    const { loggedUser } = useAuthentication()

    return (
        <h1>{loggedUser?.email}</h1>
    )
}

export default Profile