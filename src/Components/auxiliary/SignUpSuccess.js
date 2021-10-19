import {useEffect, useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

function SignUpSuccess(props) {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const userData = props.location.state.userData;
        axios.post("api/signin", {
            email: userData.email,
            password: userData.password
        })
            .then(function (response) {
                setToken(response.data.token);
            });
    }, [props]);

    if (token) {
        return <Redirect to={{
            pathname: "/lobby",
            state: {token}
        }}/>;
    }

    return (
        <div>
            Signed up successfully.
        </div>
    );
}

export default SignUpSuccess;