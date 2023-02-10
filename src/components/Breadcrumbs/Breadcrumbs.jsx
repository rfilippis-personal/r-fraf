import React from "react";
import { Link, useMatches } from "react-router-dom";
import { Breadcrumb } from "rsuite";
import { FaHome } from "react-icons/fa";

const NavLinkAs = React.forwardRef((props, ref) => {
  const { to, as, children, ...rest } = props;
  return (
    <Link to={to} as={as} {...rest}>
      {children}
    </Link>
  );
});

function Breadcrumbs() {
  let matches = useMatches();
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));
  return (
    <Breadcrumb>
      <Breadcrumb.Item
        icon={<FaHome />}
        as={NavLinkAs}
        to="/"
        active={crumbs.length === 0}
      >
        <FaHome className="fa-align" />
        <span>Home</span>
      </Breadcrumb.Item>
      {crumbs.map((crumb, index) => {
        return (
          <Breadcrumb.Item
            key={index}
            to={crumb.props.to}
            active={index === crumbs.length - 1}
            as={NavLinkAs}
          >
            {crumb.props.children}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
    // <ol>
    //   {crumbs.map((crumb, index) => {
    //     return <li key={index}>{crumb}</li>;
    //   })}
    // </ol>
  );
}

export default Breadcrumbs;
