import { useId } from "react";
import { Outlet, NavLink } from "react-router-dom";

import { paths } from "../../Configs";

import * as S from "./styles";

const Layout = () => {
  const id = useId();

  return (
    <S.Main>
      <header>
        <h1 id={id}>Hi there 👋</h1>
      </header>

      <nav>
        <S.UnorganizedList>
          <li>
            <NavLink aria-label="navigate to gallery" to={paths.home.path}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink aria-label="navigate to user" to={paths.user.path}>
              User
            </NavLink>
          </li>
        </S.UnorganizedList>
      </nav>

      <S.Section aria-labelledby={id}>
        <Outlet />
      </S.Section>
    </S.Main>
  );
};

export default Layout;
