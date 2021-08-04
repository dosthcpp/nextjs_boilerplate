// npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
// please run yarn watch && cs

import Head from "next/head";
import wrapper from "../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { countPlusAction } from "../reducers/count";
import { ColumnCentered, SizedBox } from "../utils/layout";
import "../public/style.css";

function Home() {
  const logoPlaceholder = () => (
    <img src={require("../public/seoul_logo.png")} width="100" />
  );

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
      </Head>
      <div className="root">
        <div className="section-1">
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
          <SizedBox height="200px" />
          <div className="column-centered">
            <div className="slogan">자료가 지식이 될 때까지</div>
            <SizedBox height="30px" />
            <div className="slogan__sub">
              Nodennect는 지식 관리의 새로운 패러다임을 제시합니다. 흩어져있던
              자료가 가치 있는 지식이 될 때까지, 여러분이 원하는 방식으로 자료를
              관리하고, 손쉽게 문서를 작성해보세요.
            </div>
            <SizedBox height="50px" />
            <div className="registerbox">
              <div className="registerbox__email">
                <div
                  contentEditable={true}
                  placeholder={"이메일을 입력하세요"}
                  className="registerbox__email-placeholder"
                ></div>
              </div>
              <div className="registerbox__button">베타 가입</div>
            </div>
            <SizedBox height="50px" />
            <div className="registerbox__warning">
              본 양식을 제출함으로써 귀하는 당사로부터 뉴스, 이벤트, 업데이트
              등을 포함한 마케팅 관련 정보를 수신하는데 동의하게 됩니다.
            </div>
            <SizedBox height="50px" />
            <video
              src={require("../public/lorem.mp4")}
              loop
              muted
              autoPlay
              width="95%"
              height="100%"
            />
            <SizedBox height="50px" />
            <div className="slogan__p">
              Nodennect는 수많은 connector들과 함께하고 있습니다.
            </div>
            <SizedBox height="50px" />
          </div>
          <div className="row-centered">
            {logoPlaceholder()}
            {logoPlaceholder()}
            {logoPlaceholder()}
            {logoPlaceholder()}
            {logoPlaceholder()}
          </div>
          <SizedBox height="200px" />
        </div>
        <div className="section-2">
          <div className="column-centered">
            <SizedBox height="200px" />
            <div className="explanation-1">
              <div className="explanation-1__description-section">
                <div className="explanation-1__description">
                  클릭 한 번으로 웹 문서를 내 자료에
                </div>
                <div className="explanation-1__description_sub">
                  Nodennect의 웹 클리퍼를 활용해 한 번의 클릭으로 웹 문서와
                  동영상을 수집하고 정리해보세요.
                </div>
              </div>
              <video
                className="explanation-1__video"
                src={require("../public/lorem.mp4")}
                loop
                muted
                autoPlay
              />
            </div>
            <SizedBox height="250px" />
            <div className="explanation-2">
              <video
                className="explanation-2__video"
                src={require("../public/lorem.mp4")}
                loop
                muted
                autoPlay
              />
              <div className="explanation-2__description-section">
                <div className="explanation-2__description">
                  자료 조회와 문서작성을 한 화면에서
                </div>
                <div className="explanation-2__description_sub">
                  관련성 있는 자료를 이어주는 백링크 기능을 통해 자료 간의
                  연결고리를 확인하고, 자료를 파도타기하듯 탐색해보세요.
                </div>
              </div>
            </div>
            <SizedBox height="250px" />
            <div className="explanation-3">
              <div className="explanation-3__description-section">
                <div className="explanation-3__description">
                  자료 간의 관계를 한 눈에
                </div>
                <div className="explanation-3__description_sub">
                  관련성 있는 자료를 이어주는 백링크 기능을 통해 자료 간의
                  연결고리를 확인하고, 자료를 파도타기하듯 탐색해보세요.
                </div>
              </div>
              <video
                className="explanation-3__video"
                src={require("../public/lorem.mp4")}
                loop
                muted
                autoPlay
              />
            </div>
            <SizedBox height="250px" />
            <div className="explanation-4">
              <video
                className="explanation-4__video"
                src={require("../public/lorem.mp4")}
                loop
                muted
                autoPlay
              />
              <div className="explanation-4__description-section">
                <div className="explanation-4__description">자료 추천 기능</div>
                <div className="explanation-4__description_sub">
                  작성 중인 문서에 맞춤화된 자료 추천 기능을 통해 생각의 폭을
                  확장하고, 정보의 종합과 활용에 온전히 몰입해보세요.
                </div>
              </div>
            </div>
            <SizedBox height="250px" />
            <div className="explanation-5">
              <div className="explanation-5__description-section">
                <div className="explanation-5__description">통합 검색 기능</div>
                <div className="explanation-5__description_sub">
                  이메일, 드라이브, 클라우드 등을 아우르는 통합 검색 기능을 통해
                  흩어져있던 자료들을 한눈에 확인하세요.
                </div>
              </div>
              <video
                className="explanation-5__video"
                src={require("../public/lorem.mp4")}
                loop
                muted
                autoPlay
              />
            </div>
            <SizedBox height="250px" />
          </div>
        </div>
      </div>
    </>
  );
}

export default wrapper.withRedux(Home);
