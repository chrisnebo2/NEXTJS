import User from "../components/user";

function UserLlist({ users }) {
    return (
        <>
            <h1>List of Users</h1>
            {
                users.map(user => (
                    <div key={user.id}>
                        <User user={user}/>
                    </div>
                ))
            }
        </>
    )
}

export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()

    return {
        props: {
            users: data
        }
    }
}

export default UserLlist