import Head from "next/head";
import wrapper from "../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { countPlusAction } from "../reducers/count";

function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <>
      <Head>
        <title>Test</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <div>안녕 Next.js!</div>
      카운트: {count}
      <div
        onClick={() => {
          dispatch(countPlusAction());
        }}
      >
        +1
      </div>
    </>
  );
}

export default wrapper.withRedux(Home);
