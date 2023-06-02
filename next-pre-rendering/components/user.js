function User({ user }) {
    return (
        <>
            <p>{user.name}</p>
            <p>{user.email.toLowerCase()}</p>
        </>
    )
}

export default User