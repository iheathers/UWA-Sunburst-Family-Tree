"use client";

import { useEffect, useState, React } from "react";
import Link from "next/link";
import { AiOutlineSetting } from "react-icons/ai";
import { BiRefresh, BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
import styles from "./ChartTitle.module.css";

const ChartTitle = () => {
  const router = useRouter();
  const handleRefreshClick = () => {
    window.location.reload();
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("jwtToken");
    router.push("/login");
  };

  //   const userAccessPermissions = "VIEW_CHART_ONLY";
  const userAccessPermissions = "ADMIN";
  //   const userAccessPermissions = localStorage.getItem("accessPermissions"); //may be later we can use this to show/hide buttons

  const requiredPermission = "ADMIN";

  const [showUserlistButton, setShowUserlistButton] = useState(false);

  useEffect(() => {
    if (userAccessPermissions === requiredPermission) {
      setShowUserlistButton(true);
    } else {
      setShowUserlistButton(false);
    }
  }, [userAccessPermissions]);

  return (
    <div className={styles.singleline}>
      <div className={styles.title}>
        <h1>Family Tree</h1>
      </div>

      <div className={styles.titlebuttons}>
        {showUserlistButton && (
          <Link href="/usermaintanence">
            <button className={styles.ionbutton}>
              <AiOutlineSetting />
            </button>
          </Link>
        )}
        <button className={styles.ionbutton} onClick={handleRefreshClick}>
          <BiRefresh />
        </button>
        <button className={styles.ionbutton} onClick={handleLogoutClick}>
          <BiLogOut />
        </button>
      </div>
    </div>
  );
};

export default ChartTitle;
