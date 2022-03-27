import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <main>
        <nav>
            <Link to="/">Market cap</Link> | { " "}
            <Link to="/converter">Converter</Link> | { " "}
            <Link to="/about">About</Link> | { " "}
        </nav>
        <section>
            <Outlet />
        </section>
    </main>
  )
}
