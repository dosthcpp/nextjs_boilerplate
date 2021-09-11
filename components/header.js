const Header = ({ setState }) => {
  return (
    <div className="header">
      <div className="header__title-section">
        <img
          src={require("../public/logo.png")}
          width="100"
          style={{
            WebkitFilter: "invert(100%)",
            filter: "invert(100%)",
          }}
        />
      </div>
      <div className="header__menu-section">
        <div
          className="header__menu_item-1"
          onClick={(e) => {
            setState(0);
          }}
        >
          홈
        </div>
        <div
          className="header__menu_item-2"
          onClick={(e) => {
            setState(1);
          }}
        >
          회사
        </div>
        <div className="header__menu_item-3">채용</div>
        <div className="header__menu_item-4">블로그</div>
      </div>
    </div>
  );
};

export default Header;
