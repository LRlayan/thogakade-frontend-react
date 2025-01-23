import { createBrowserRouter, RouterProvider } from "react-router"
import "./App.css"
import { RootLayout } from "./components/RootLayout"
import CustomerPage from "./pages/CustomerPage.tsx"
import Item from "./pages/Item"
import PlaceOrder from "./pages/PlaceOrder"
import Dashboard from "./pages/Dashboard"

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "/customer", element: <CustomerPage /> },
        { path: "/item", element: <Item /> },
        { path: "/place-order", element: <PlaceOrder /> }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
