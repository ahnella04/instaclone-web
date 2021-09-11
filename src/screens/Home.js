import { gql, useQuery } from "@apollo/client";
import { logUserOut } from "../apollo";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGEMENT, PHOTO_FRAGMENT } from "../fragments";

export const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGEMENT}
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