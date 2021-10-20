import {useEffect} from "react";
import axios from "axios";

function SignUpSuccess(props) {


    useEffect(() => {
        const search = props.location.search
        const userData = new URLSearchParams(search)
        axios.post("api/signin", {
            email: userData.get("email"),
            password: userData.get("password"),
        })
            .then(function (response) {
                localStorage.setItem("userToken", response.data.token)
            });
    }, [props]);

    if (localStorage.getItem("userToken") !== undefined) {
        return window.location.href = `/lobby`
    }

    return (
        <div>
            Signed up successfully.
        </div>
    );
}

export default SignUpSuccess;