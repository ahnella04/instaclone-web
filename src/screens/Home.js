import { gql, useQuery } from "@apollo/client";
import { logUserOut } from "../apollo";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

export const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            id
            user {
                username
                avatar
            }
            file
            caption
            likes
            comments {
                id
                user {
                    username
                    avatar
                }
                payload
                isMine
                createdAt
            }
            commentNumber
            createdAt
            isMine
            isLiked
        }
    }
`;

function Home() {
    const { data } = useQuery(FEED_QUERY);
    // console.log(data);
    return (
        <div>
            <PageTitle title="Home" />
            {data?.seeFeed?.map(photo => <Photo key={photo.id} {...photo} />)}
            <button onClick={() => logUserOut()}>Log out</button>
        </div>
    );
}

export default Home;