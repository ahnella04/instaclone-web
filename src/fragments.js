import { gql } from "@apollo/client";


export const PHOTO_FRAGMENT = gql`
    fragment PhotoFragment on Photo {
        id
        file
        likes
        commentNumber
        isLiked
    }
`;

export const COMMENT_FRAGEMENT = gql`
    fragment CommentFragment on Comment {
        id
        user {
            username
            avatar
        }
        payload
        isMine
        createdAt
    }
`;