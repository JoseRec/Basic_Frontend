import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="bg-slate-600">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Administrador de Productos
          </h1>
        </div>
      </header>

      <main className="mt-6 sm:mt-10 mx-auto max-w-6xl p-4 sm:p-10 bg-white shadow">
        <Outlet />
      </main>
    </>
  );
}
