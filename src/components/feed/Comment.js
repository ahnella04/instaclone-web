import React from "react";
import sanitizeHtml from "sanitize-html";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";

const CommentContainer = styled.div`
    margin-bottom: 7px;
`;

const CommentCaption = styled.span`
    margin-left: 10px;
    a {
        background-color: inherit;
        color: ${props => props.theme.accent};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

function Comment({ author, payload }) {
    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <CommentCaption>{payload.split(" ").map((word, index) => 
            /#[\w]+/.test(word) ? 
            <React.Fragment>
                <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment> : 
                <React.Fragment key={index}>{word}</React.Fragment>
            )}</CommentCaption>
        </CommentContainer>
    )
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired
}

export default Comment;