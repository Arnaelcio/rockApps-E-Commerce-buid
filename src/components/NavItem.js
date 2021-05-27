import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NavItem({ label, icon, link }) {
  if (!!link) {
    return (
      <li>
        <a name={link.name} target="_blank" rel="noreferrer" href={link.href}>
          <span>
            {!!icon && <FontAwesomeIcon icon={icon} />}
            {!!label && label}
          </span>
        </a>
      </li>
    );
  }
  return (
    <li>
      <span>
        {!!icon && <FontAwesomeIcon icon={icon} />}
        {!!label && label}
      </span>
    </li>
  );
}
