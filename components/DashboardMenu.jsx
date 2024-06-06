import { useState } from "react";
import classnames from "classnames";
import Link from "next/link";

export default function DashboardMenu({ menu }) {
  const [activeMenuItem, setActiveMenuItem] = useState("Home");

  return (
    <div className="DashboardMenu">
      <ul>
        {menu.map((item) => (
          <li key={item}>
            <p
              className={classnames({
                "DashboardMenu-active-menu-item": activeMenuItem === item,
              })}
            >
              {item === "Home" ? <Link href="/">Home</Link> : item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
