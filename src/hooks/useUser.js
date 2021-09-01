import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
    query me {
        me {
            id
            username
            avatar
        }
    }
`;

function useUser() {
    const hasToken = useReactiveVar(isLoggedInVar);
    const { data } = useQuery(ME_QUERY, {
        skip: !hasToken
    });
    // console.log(data, error);
    useEffect(() => {
        if (data?.me === null) {
            // console.log("there is a token on localStorage but the token did not wotk on the backend");
            logUserOut();
        }
    }, [data]);
    return { data };
}

export default useUser;