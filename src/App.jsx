import { Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./ui/components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl" >
        <Outlet />
      </Container>
    </>
  )
}

export default App;
