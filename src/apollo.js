import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client"
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};

export const logUserOut = (token) => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
};

export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
};

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: localStorage.getItem(TOKEN)
        } // 여기 이 새로운 headers는 localStorage의 TOKEN이 될 거임
    } // Request의 header인 headers라는 객체 리턴
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
// Cache는 Apollo가 한 번 가져온 정보를 기억하게 해서 매번 같은 정보를 가져오지 않도록 함
// Apollo는 local 환경에 정보를 저장해 놓는데 이게 홈페이지를 수정할 때마다 매번 정보를 가져오는 것을 막아줌

