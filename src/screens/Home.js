import { gql, useQuery } from "@apollo/client";
import { logUserOut } from "../apollo";
import Photo from "../components/feed/Photo";

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
            {data?.seeFeed?.map(photo => <Photo key={photo.id} {...photo} />)}
            <button onClick={() => logUserOut()}>Log out</button>
        </div>
    );
}

export default Home;