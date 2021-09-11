import { SizedBox } from "../utils/layout";
import Select from "react-select";

const Footer = ({ language, setState }) => {
  return (
    <div className="footer">
      <SizedBox height="50px" />
      <div className="footer-row">
        <div className="footer-column">
          <div className="footer-menu-0-title">
            {language == "korean" ? "소개" : "About us"}
          </div>

          <div className="footer-menu-0-divider" />
          <SizedBox height="10px" />
          <div className="footer-menu-0-1">
            {language == "korean" ? "기업정보" : "Company"}
          </div>
          <div className="footer-menu-0-2">
            {language == "korean" ? "스토리" : "Story"}
          </div>
          <div className="footer-menu-0-3">
            {language == "korean" ? "채용 정보" : "Career"}
          </div>
          <div className="footer-menu-0-4">
            {language == "korean" ? "제품" : "Products"}
          </div>
        </div>
        <SizedBox width="35px" />
        <div className="footer-column">
          <div className="footer-menu-1-title">
            {language == "korean" ? "더 보기" : "More"}
          </div>
          <div className="footer-menu-1-divider" />
          <SizedBox height="10px" />
          <div className="footer-menu-1-1">
            {language == "korean" ? "블로그" : "Blog"}
          </div>
          <div className="footer-menu-1-2">
            {language == "korean" ? "정책" : "Legal"}
          </div>
          <div
            className="footer-menu-1-3"
            onClick={() => {
              setMainMenuIdx(2);
            }}
          >
            {language == "korean" ? "문의하기" : "Contact us"}
          </div>
        </div>
      </div>
      <SizedBox height="50px" />
      <div className="footer-options">
        <Select
          onChange={(e) => {
            setState(e.value);
          }}
          defaultValue={{ value: "english", label: "English" }}
          className="footer-option"
          options={[
            { value: "english", label: "English" },
            { value: "korean", label: "한국어" },
          ]}
          classNamePrefix="select"
        />
        <SizedBox width="30px" />
        <img
          style={{
            cursor: "pointer",
          }}
          src={require("../public/logo_facebook.png")}
          width="20"
          onClick={() => {
            const win = window.open("", "_blank");
            win.focus();
          }}
        />
        <SizedBox width="20px" />
        <img
          style={{
            cursor: "pointer",
          }}
          src={require("../public/logo_youtube.png")}
          width="20"
          onClick={() => {
            const win = window.open("", "_blank");
            win.focus();
          }}
        />
        <SizedBox width="20px" />
        <img
          style={{
            cursor: "pointer",
          }}
          src={require("../public/logo_medium.png")}
          width="20"
          onClick={() => {
            const win = window.open("", "_blank");
            win.focus();
          }}
        />
      </div>
      <SizedBox height="50px" />
      <div className="footer-copyright">
        Copyright © Nodennect Inc. All rights reserved.
      </div>
      <SizedBox height="30px" />
    </div>
  );
};

export default Footer;
