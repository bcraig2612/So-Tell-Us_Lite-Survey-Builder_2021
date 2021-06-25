import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const Header = () => {
  const [account, setAccount] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    let localAccount = localStorage.account;
    localAccount = JSON.parse(localAccount);
    setAccount(localAccount);
  }, []);
  return (
    <>
      <div className="form-text">
        Welcome,&nbsp;
        <Link to="/account-details">
          {account.firstName} {account.lastName}
        </Link>
      </div>
    </>
  );
};

export default Header;
