import classnames from "classnames";
import Link from "next/link";

export default function DashboardMenu({
  menu,
  activeMenuItem,
  onMenuItemClick,
}) {
  return (
    <div className="DashboardMenu">
      <ul>
        {menu.map((item) => (
          <li key={item} onClick={() => onMenuItemClick(item)}>
            <p
              className={classnames({
                "DashboardMenu-active-menu-item": activeMenuItem === item,
              })}
            >
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
