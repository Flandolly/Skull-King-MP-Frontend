import {useEffect} from 'react'
import axios from 'axios'

function SignUpSuccess(props) {

    useEffect(() => {
        const userData = props.location.state.userData
        console.log(userData)
        axios.post("http://127.0.0.1:8080/api/signin", {
            email: userData.email,
            password: userData.password
            })
            .then(function (response) {
                console.log(response)
                localStorage.setItem("token", response.data.token)
            })
    }, [props])

    return (
        <div>
            Signed up successfully.
        </div>
    )
}

export default SignUpSuccess