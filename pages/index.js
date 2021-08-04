// npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
// please run yarn watch && cs

import Head from "next/head";
import wrapper from "../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { countPlusAction } from "../reducers/count";
import { SizedBox } from "../utils/layout";

function Home() {
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
      <div className="root">
        <div className="header">
          <div className="header__title-section">
            <div className="header__title">Nodennect</div>
          </div>
          <div className="header__menu-section">
            <div className="header__menu_item-1">홈</div>
            <div className="header__menu_item-2">회사</div>
            <div className="header__menu_item-3">채용</div>
            <div className="header__menu_item-4">블로그</div>
          </div>
        </div>
        <SizedBox height="40px" />
      </div>
    </>
  );
}

export default wrapper.withRedux(Home);
