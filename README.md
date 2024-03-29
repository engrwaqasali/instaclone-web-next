# Instagram clone Web
![background](https://velog.velcdn.com/images/nuo/post/178c01fb-8990-4d24-a989-093c029889ed/image.png)

- **Github Repository URL** <br/> https://github.com/GyuJae/instaclone-web-next
- **BackEnd Github Repository URL** <br/>https://github.com/GyuJae/instagramclone_backend
- **Native App Repository URL** <br/> https://github.com/GyuJae/instaclone-native

## 🏠 사이트 기능 소개

### SSR(NextJS) + Apollo Client

- NextJS를 이용하여 Graphql API를 SSR 하였다.
- SSR로 인해 path 이동 로딩시간이 길어져 NextJS Router 기능을 이용하여 route 이동시 로딩 화면을 보여주었다.
``` ts
import Router from 'next/router';

Router.events.on('routeChangeStart', () => isRouteLoadingVar(true));
Router.events.on('routeChangeComplete', () => isRouteLoadingVar(false));
```

### Iron Session + Auth 

- login 시 jwt token을 iron session에 저장하여 SSR에서 AUTH 기능을 사용하였다.
```ts
export const getServerSideProps: GetServerSideProps = withSsrSession(async ({ req, query }) => {
  if (!req.session.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }

  return addApolloState(apolloClient, {
    props: {},
  });
})
```

### Apllo Cache
- Apollo Cache를 이용하여 cache에 저장된 데이터를 수동으로 조작하여 서버와의 통신 없이 실시간으로 데이터를 변경 또는 추가하였다. 

```ts
const [toggleLikeMutate, { loading, error }] = useMutation<IToggleLikeMutation, IToggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        input: {
          postId,
        },
      },
      update: (cache, { data }) => {
        if (data?.toggleLike.ok) {
          const POST_ID = `PostEntity:${postId}`;
          cache.modify({
            id: POST_ID,
            fields: {
              isLiked(prev) {
                return !prev;
              },
              likeCount(prev) {
                if (isLiked) {
                  return prev - 1;
                }
                return prev + 1;
              },
            },
          });
        }
      },
    }
  );
```