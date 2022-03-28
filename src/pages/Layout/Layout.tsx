import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";

export const Layout = () => {
  return (
      <main>
        <NavBar />
        <section>
          <Outlet />
        </section>
      </main>
  )
}
