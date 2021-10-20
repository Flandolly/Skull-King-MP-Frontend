import {useEffect, useState} from "react";
import axios from "axios";

function SignUpSuccess(props) {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const search = props.location.search
        const userData = new URLSearchParams(search)
        axios.post("api/signin", {
            email: userData.get("email"),
            password: userData.get("password"),
        })
            .then(function (response) {
                setToken(response.data.token);
            });
    }, [props]);

    if (token) {
        // return <Redirect to={{
        //     pathname: "/lobby",
        //     state: {token}
        // }}/>;
        return window.location.href = `/lobby?token=${token}`
    }

    return (
        <div>
            Signed up successfully.
        </div>
    );
}

export default SignUpSuccess;