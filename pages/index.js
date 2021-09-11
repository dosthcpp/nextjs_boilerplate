// npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
// please run yarn watch && cs

import Head from "next/head";
import Image from "next/image";
import logo from "../public/logo.png";
import logo_kised from "../public/logo_kised.jpeg";
import logo_kibo from "../public/logo_kibo.jpg";
import logo_ecti from "../public/logo_ecti.png";
import professor from "../public/professor.jpeg";
import wrapper from "../store/configureStore";
import { useRouter } from "next/dist/client/router";
import Footer from "../components/footer";
import styled from "styled-components";
import { Column, SizedBox } from "../utils/layout";
import user from "../public/static/image/user.png";
import "../public/style.css";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import $ from "jquery";

const ImageContainer = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
`;

function Home() {
  const router = useRouter();

  const arrLength = 15;

  const boxRef = useRef(null);
  const dotRef = useRef(null);
  const [dotPos, setDotPos] = useState(-310);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [reviewRefs, _] = useState([createRef(), createRef(), createRef()]);
  const [language, setLanguage] = useState("english");
  const [mainMenuIdx, setMainMenuIdx] = useState(1);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const reviewContent = [
    "Dingo는 정말 놀라운 제품이에요. 제 모든 자료들을 한번에 살펴볼 수 있고, 복잡하게 탭을 왔다갔다 할 필요 없이 업무에 집중할 수 있어서 좋아요.",
    "Dingo가 지난 몇달 간 이뤄온 성과는 상상을 초월합니다. 이 제품이 굉장한 파급력을 가져올 것이라 믿어 의심치 않아요.",
    "여기저기 흩어진 자료 때문에 고민이었는데 백링크 기능 덕분에 큰 도움을 받았어요. 자료 추천 기능도 정말 기대되네요! Dingo의 지식 관리 체계는 제 시간과 노력을 상당히 절약해줬어요.",
  ];

  const originalIdx = [...Array(15).keys()].map((idx) => (
    <div
      key={idx}
      className={`opinionbox-pagination-number-${idx + 1}`}
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        setCurIdx(idx + 1);
        onTapIdx(idx + 1);
      }}
    >
      {idx + 1}
    </div>
  ));
  const [opinionIdx, setOpinionIdx] = useState(originalIdx);
  const [curIdx, setCurIdx] = useState(1);

  const logoPlaceholder = () => (
    <img src={require("../public/seoul_logo.png")} width="100" />
  );

  const review = (idx) => (
    <div
      className={`review-${idx} ${
        moveLeft ? "move-left" : moveRight ? "move-right" : ""
      }`}
      ref={reviewRefs[idx]}
    >
      <div className="review-quotationmark">
        <span>"</span>
        <span>"</span>
      </div>
      <div className="review-content">{reviewContent[idx]}</div>
      <SizedBox height="30px" />
      <div className="review-tag">
        <div className="review-tag-name-section">
          <div className="review-tag-name-icon">
            <img src={user} width="35px"></img>
          </div>
          <SizedBox width="10px" />
          <div className="review-tag-name-column">
            <div className="review-tag-name">Doyeon Baek</div>
            <SizedBox height="5px" />
            <div className="review-tag-name-sub">Nodennect 대표이사</div>
          </div>
        </div>
      </div>
    </div>
  );

  const block = (start, end) => {
    for (let i = start; i <= end; ++i) {
      $(`.opinionbox-pagination-number-${i}`).css("display", "block");
      $(`.opinionbox-pagination-number-${i}`).css("color", "#646463");
    }
  };

  const nonify = (start, end) => {
    for (let i = start; i <= end; ++i) {
      $(`.opinionbox-pagination-number-${i}`).css("display", "none");
    }
  };

  const insertDots = (arr, i, idx) => {
    arr.splice(
      i,
      0,
      <div
        className={`opinionbox-pagination-number-threedots-${idx}`}
        style={{ display: "block" }}
      >
        ...
      </div>
    );
  };

  const renderDots = useCallback(
    (idx) => {
      let i = idx;
      for (
        ;
        i < arrLength &&
        !(
          $(`.opinionbox-pagination-number-${i}`).css("display") === "block" &&
          $(`.opinionbox-pagination-number-${i + 1}`).css("display") === "none"
        );
        ++i
      );
      if (i < arrLength - 1) {
        block(1, i);
        const arr = Array.from(originalIdx);
        arr.splice(
          i,
          0,
          <div className={`opinionbox-pagination-number-threedots-1`}>...</div>
        );
        setOpinionIdx((_) => arr);
      }
    },
    [arrLength, setOpinionIdx]
  );

  const onTapIdx = useCallback(
    (idx) => {
      const arr = Array.from(originalIdx);

      const setVisible = () => {
        insertDots(arr, 15, 2);

        block(1, 1);
        nonify(2, idx - 2);
        block(idx - 1, idx + 1);
        nonify(idx + 2, 15);
        block(15, 15);
      };

      if (idx >= 1 && idx <= 5) {
        block(1, 6);
        nonify(7, 12);
        block(13, 15);

        insertDots(arr, 6, 1);
        setOpinionIdx((_) => arr);
      } else if (idx == 6) {
        insertDots(arr, idx - 2, 1);
        setVisible();

        setOpinionIdx((_) => arr);
      } else if (idx > 6 && idx <= 11) {
        insertDots(arr, 1, 1);
        setVisible();

        $(`.opinionbox-pagination-number-threedots-2`).css("display", "block");
      } else if (idx >= 12 && idx <= 15) {
        insertDots(arr, 2, 1);

        block(1, 1);
        nonify(2, 10);
        block(11, 15);

        $(`.opinionbox-pagination-number-threedots-2`).css("display", "none");
      }
    },
    [arrLength, setOpinionIdx]
  );

  const renderContents = (idx) => {
    switch (idx) {
      case 0:
        return (
          <div className="home">
            <div className="section-2">
              <SizedBox height="200px" />
              <div className="column-centered">
                <div className="slogan">자료가 지식이 될 때까지</div>
                <SizedBox height="30px" />
                <div className="slogan__sub">
                  Nodennect는 지식 관리의 새로운 패러다임을 제시합니다.
                  흩어져있던 자료가 가치 있는 지식이 될 때까지, 여러분이 원하는
                  방식으로 자료를 관리하고, 손쉽게 문서를 작성해보세요.
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
                  본 양식을 제출함으로써 귀하는 당사로부터 뉴스, 이벤트,
                  업데이트 등을 포함한 마케팅 관련 정보를 수신하는데 동의하게
                  됩니다.
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
            <div className="section-3">
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
                    <div className="explanation-4__description">
                      자료 추천 기능
                    </div>
                    <div className="explanation-4__description_sub">
                      작성 중인 문서에 맞춤화된 자료 추천 기능을 통해 생각의
                      폭을 확장하고, 정보의 종합과 활용에 온전히 몰입해보세요.
                    </div>
                  </div>
                </div>
                <SizedBox height="250px" />
                <div className="explanation-5">
                  <div className="explanation-5__description-section">
                    <div className="explanation-5__description">
                      통합 검색 기능
                    </div>
                    <div className="explanation-5__description_sub">
                      이메일, 드라이브, 클라우드 등을 아우르는 통합 검색 기능을
                      통해 흩어져있던 자료들을 한눈에 확인하세요.
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
            <div className="section-4">
              <SizedBox height="300px" />
              <div className="review-section">
                <span className="review-title">사용 후기</span>
                <span className="review-title_">_</span>
              </div>
              <SizedBox height="100px" />
              <div className="review-box" ref={boxRef}>
                <SizedBox height="80px" />
                <div className="review-item">
                  <div className="review-array">
                    {review(0)}
                    {review(1)}
                    {review(2)}
                  </div>
                </div>
                <SizedBox height="40px" />
                <div className="review-pagination">
                  <div className="review-pagination-dot"></div>
                  <SizedBox width="5px" />
                  <div className="review-pagination-dot"></div>
                  <SizedBox width="5px" />
                  <div className="review-pagination-dot"></div>
                  <div
                    className={`review-pagination-dot-small`}
                    ref={dotRef}
                  ></div>
                </div>
                <SizedBox height="50px" />
                <p className="arrow_enclosure-left">
                  <i
                    className="arrow left"
                    onClick={() => {
                      if (reviewIdx > 0 && !isBtnDisabled) {
                        reviewRefs[reviewIdx - 1].current.style.display =
                          "block";
                        const posX =
                          reviewRefs[reviewIdx].current.offsetLeft -
                          boxRef.current.offsetLeft;
                        reviewRefs[reviewIdx - 1].current.style.position =
                          "absolute";
                        reviewRefs[reviewIdx - 1].current.style.left = `-${
                          posX * 2 + reviewRefs[reviewIdx].current.offsetWidth
                        }px`;
                        // -310, -50, 210
                        setDotPos(dotPos - 260);
                        dotRef.current.style.transition = "transform 1s";
                        setMoveRight(true);
                        setIsBtnDisabled(true);
                        setTimeout(() => {
                          setMoveRight(false);
                          reviewRefs[reviewIdx].current.style.display = "none";
                          reviewRefs[reviewIdx - 1].current.style.left = null;
                          reviewRefs[reviewIdx - 1].current.style.position =
                            null;
                          setReviewIdx(reviewIdx - 1);
                          setIsBtnDisabled(false);
                        }, 1000);
                      }
                    }}
                  ></i>
                </p>
                <p className="arrow_enclosure-right">
                  <i
                    className="arrow right"
                    onClick={() => {
                      if (reviewIdx < 2 && !isBtnDisabled) {
                        reviewRefs[reviewIdx + 1].current.style.display =
                          "block";
                        const posX =
                          reviewRefs[reviewIdx].current.offsetLeft -
                          boxRef.current.offsetLeft;
                        reviewRefs[reviewIdx + 1].current.style.position =
                          "absolute";
                        reviewRefs[reviewIdx + 1].current.style.right = `${
                          posX * 2
                        }px`;
                        setDotPos(dotPos + 260);
                        dotRef.current.style.transition = "transform 1s";
                        setMoveLeft(true);
                        setIsBtnDisabled(true);
                        setTimeout(() => {
                          setMoveLeft(false);
                          reviewRefs[reviewIdx].current.style.display = "none";
                          reviewRefs[reviewIdx + 1].current.style.right = null;
                          reviewRefs[reviewIdx + 1].current.style.position =
                            null;
                          setReviewIdx(reviewIdx + 1);
                          setIsBtnDisabled(false);
                        }, 1000);
                      }
                    }}
                  ></i>
                </p>
              </div>
              <SizedBox height="100px" />
            </div>
            <div className="section-5">
              <SizedBox height="250px" />
              <div className="opinion-section">
                <div className="opinion-main-title">
                  여러분의 의견을 들려주세요
                </div>
                <SizedBox height="50px" />
                <div className="opinionbox">
                  <div className="opinionbox-column">
                    <div className="opinionbox-comment">
                      <div
                        contentEditable={true}
                        placeholder={"코멘트를 남겨주세요"}
                        className="opinionbox-comment-placeholder"
                      ></div>
                    </div>
                    <SizedBox height="10px" />
                    <div className="opinionbox-row">
                      <div className="opinionbox-name">
                        <input
                          className="opinionbox-name-placeholder"
                          placeholder="이름"
                        />
                      </div>
                      <SizedBox width="8px" />
                      <div className="opinionbox-email">
                        <input
                          className="opinionbox-email-placeholder"
                          placeholder="이메일 주소"
                        ></input>
                      </div>
                      <SizedBox width="8px" />
                      <div className="opinionbox-btn">Comment</div>
                    </div>
                    <SizedBox height="60px" />
                    <div className="opinionbox-update">
                      최신 업데이트 소식을 확인하세요. {">"}
                    </div>
                  </div>
                  <SizedBox width="30px" />
                  <div className="opinionbox-column">
                    <div className="opinionbox-comment-item">
                      <div className="opinionbox-comment-item-title">
                        최병규
                      </div>
                      <SizedBox height="10px" />
                      <div className="opinionbox-comment-item-content">
                        포털사이트에 오픈되어 있는 원하는 정보는 수집이
                        가능한가요? 예를 들어 업체 정보, 부동산 정보 등 엑셀
                        파일로 저장 가능한가요?
                      </div>
                    </div>
                    <SizedBox height="15px" />
                    <div className="opinionbox-comment-item">
                      <div className="opinionbox-comment-item-title">
                        장유진
                      </div>
                      <SizedBox height="10px" />
                      <div className="opinionbox-comment-item-content">
                        문서별로 자료를 정리하고 한눈에 볼수 있다는 부분이 너무
                        편해요! 계속 좋은 제품 기대할게요!
                      </div>
                    </div>
                    <SizedBox height="15px" />
                    <div className="opinionbox-comment-item">
                      <div className="opinionbox-comment-item-title">유비</div>
                      <SizedBox height="10px" />
                      <div className="opinionbox-comment-item-content">
                        에버노트 쓰고 있는데 앞으로 타입드만 쓸것 같아요
                      </div>
                    </div>
                    <SizedBox height="15px" />
                    <div className="opinionbox-comment-item">
                      <div className="opinionbox-comment-item-title">
                        김민지
                      </div>
                      <SizedBox height="10px" />
                      <div className="opinionbox-comment-item-content">
                        타입드 사용하고 문서작성 과정이 훨씬 단축된 것 같아요.
                      </div>
                    </div>
                    <SizedBox height="15px" />
                    <div className="opinionbox-comment-item">
                      <div className="opinionbox-comment-item-title">Teddy</div>
                      <SizedBox height="10px" />
                      <div className="opinionbox-comment-item-content">
                        Best way to power up my document {"&"} research work.
                        Look forward to official version 1.0
                      </div>
                    </div>
                    <SizedBox height="15px" />
                    <div className="opinionbox-pageNo">{`#${curIdx}`}</div>
                    <SizedBox height="10px" />
                    <div className="opinionbox-pagination">{opinionIdx}</div>
                  </div>
                </div>
              </div>
              <SizedBox height="150px" />
            </div>
            <div className="section-6">
              <SizedBox height="200px" />
              <div className="submitform-title">
                문서를 넘어선 지식의 창조, Dingo.
              </div>
              <SizedBox height="50px" />
              <div className="submitform">
                <div className="submitform__email">
                  <div
                    contentEditable={true}
                    placeholder={"이메일을 입력하세요"}
                    className="submitform__email-placeholder"
                  ></div>
                </div>
                <div className="submitform__button">베타 가입</div>
              </div>
              <SizedBox height="20px" />
              <div className="submitform-sub">
                이 양식을 제출함으로써 귀하는 뉴스, 이벤트, 업데이트 등을
                포함하여 당사로부터 마케팅 관련 전자 통신을 수신하는 데
                동의합니다.
              </div>
              <SizedBox height="200px" />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <SizedBox height="80px" />
            <div className="image_section">
              <ImageContainer>
                <Image
                  className="image_section__logo"
                  src={logo}
                  width="162"
                  height="26"
                  quality="100"
                />
              </ImageContainer>
              <SizedBox height="120px" />
              <div className="image_section__text">
                {language == "korean"
                  ? "우리의 고객들이 어디에서든 우리를 만나고 경험할 수 있도록."
                  : "Experience and meet with us, Wherever You Go."}
              </div>
            </div>
            <SizedBox height="300px" />
            <div className="image_section__partners">
              {language == "korean" ? "파트너" : "Our Partners"}
            </div>
            <SizedBox height="50px" />
            <div className="image_section__partners-list">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                <Image
                  className="image_section__logo-kised"
                  src={logo_kised}
                  onClick={() => {
                    const win = window.open(
                      "https://www.kised.or.kr/",
                      "_blank"
                    );
                    win.focus();
                  }}
                  width="100"
                  height="50"
                  quality="100"
                />

                <SizedBox height="15px" />
                {language == "korean" ? (
                  <div></div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <div>Korea Institute of Startup</div>
                    <div>and Entrepreneurship Development</div>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                <Image
                  className="image_section__logo-kibo"
                  src={logo_kibo}
                  onClick={() => {
                    const win = window.open(
                      "https://www.kised.or.kr/",
                      "_blank"
                    );
                    win.focus();
                  }}
                  width="100"
                  height="40"
                  quality="100"
                />

                <SizedBox height="15px" />
                {language == "korean" ? (
                  <div></div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <div>Technology Guarantee Fund</div>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                <Image
                  className="image_section__logo-ecti"
                  src={logo_ecti}
                  onClick={() => {
                    const win = window.open(
                      "https://www.kised.or.kr/",
                      "_blank"
                    );
                    win.focus();
                  }}
                  width="100"
                  height="50"
                  quality="100"
                />
                <SizedBox height="15px" />
                {language == "korean" ? (
                  <div></div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <div>Korea Association of</div>
                    <div>Kindergarten Teachers</div>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                <Image
                  className="image_section__logo-user"
                  src={professor}
                  onClick={() => {
                    const win = window.open(
                      "https://www.kised.or.kr/",
                      "_blank"
                    );
                    win.focus();
                  }}
                  width="70"
                  height="70"
                  quality="100"
                />
                <SizedBox height="15px" />
                {language == "korean" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <div>충남대학교 경상대학</div>
                    <div>홍은영 연구교수</div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <div>Sophie Hong</div>
                    <div>Research Professor</div>
                    <div>Ph.D. Chungnam Nat'l University</div>
                  </div>
                )}
              </div>
            </div>
            <SizedBox height="100px" />
          </div>
        );
      case 2:
        return (
          <div className="contact_section">
            <SizedBox height="100px" />
            <div className="contact_section__align-column">
              <div className="contact_section__title">Contact us</div>
              <div className="contact_section__align-row">
                <div className="contact_section__align-column-1">
                  <div className="contact_section__align-column-1-1">
                    <div className="contact_section__corporate">Corporate</div>
                    <SizedBox height="10px" />
                    <div className="contact_section__divider" />
                    <SizedBox height="10px" />
                    <div className="contact_section__corporate-sub-1">
                      +82 (0)2 6091 1755
                    </div>
                    <div className="contact_section__corporate-sub-2">
                      contact@nodennect.com
                    </div>
                  </div>
                  <SizedBox height="20px" />
                  <div className="contact_section__align-column-1-2">
                    <div className="contact_section__address">Address</div>
                    <SizedBox height="10px" />
                    <div className="contact_section__divider" />
                    <SizedBox height="10px" />
                    <div className="contact_section__address-sub-1">
                      10F-114, 428, Seoulleung-ro,
                    </div>
                    <div className="contact_section__address-sub-2">
                      Gangnam-gu, Seoul, Republic of Korea
                    </div>
                  </div>
                  <SizedBox height="20px" />
                  <div className="contact_section__align-column-1-3">
                    <div className="contact_section__office-hours">
                      Office Hours
                    </div>
                    <SizedBox height="10px" />
                    <div className="contact_section__divider" />
                    <SizedBox height="10px" />
                    <div className="contact_section__office-hours-sub-1">
                      Monday - Friday
                    </div>
                    <div className="contact_section__office-hours-sub-2">
                      10:30 am - 5:30 pm KST
                    </div>
                  </div>
                  <SizedBox height="20px" />
                </div>
                <div className="contact_section__align-column-2">
                  <div>
                    <div className="contact_section__email-title">
                      Question Type
                    </div>
                    <SizedBox height="10px" />
                  </div>
                  <input
                    className="contact_section__email"
                    placeholder="name@email.com"
                  ></input>
                  <div>
                    <div className="contact_section__email-title">
                      First name
                    </div>
                    <SizedBox height="10px" />
                  </div>
                  <input
                    className="contact_section__email"
                    placeholder="name@email.com"
                  ></input>
                  <div>
                    <div className="contact_section__email-title">
                      Last name
                    </div>
                    <SizedBox height="10px" />
                  </div>
                  <input
                    className="contact_section__email"
                    placeholder="name@email.com"
                  ></input>
                  <div>
                    <div className="contact_section__email-title">E-mail</div>
                    <SizedBox height="10px" />
                  </div>
                  <input
                    className="contact_section__email"
                    placeholder="name@email.com"
                  ></input>
                </div>
                <div className="contact_section__align-column-3">
                  <div>
                    <div className="contact_section__email-title">
                      Question and Comment
                    </div>
                    <SizedBox height="10px" />
                  </div>
                  <input
                    className="contact_section__email"
                    placeholder="name@email.com"
                  ></input>
                  <SizedBox height="50px" />
                  <div className="contact_section__align-column-group">
                    <div className="contact_section__align-row-start">
                      <input
                        type="checkbox"
                        className="contact_section__chkbx"
                      ></input>
                      <SizedBox width="10px" />
                      <div className="contact_section__additional-info">
                        추가적인 정보를 제공하겠습니다.
                      </div>
                    </div>
                    <SizedBox height="50px" />
                    <button className="contact_section__send-btn">전송</button>
                    <SizedBox height="80px" />
                    <div className="contact_section__additional-info">
                      이 양식을 제출하면 사용 약관 및 개인 정보 보호 정책에
                      동의하는 것입니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  // useEffect(() => {
  //   dotRef.current.style.transform = `translate(${dotPos}%, -50%)`;
  // }, [dotPos]);

  useEffect(() => {
    let arr = [];
    for (var i = 0; i < 15; ++i) {
      arr.push((i + 1).toString());
    }
    setOpinionIdx((_) => {
      return arr;
    });
  }, []);

  useEffect(() => {
    renderDots(curIdx);
  }, [renderDots]);

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
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="root">
        {/* <div className="section-1">
          <Header setState={setMainMenuIdx} />
        </div> */}
        {renderContents(mainMenuIdx)}
      </div>
      <Footer language={language} setState={setLanguage} />
    </>
  );
}

export default wrapper.withRedux(Home);
