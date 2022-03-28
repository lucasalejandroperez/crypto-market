import { Button } from "@mui/material";
import { useMatch, useNavigate, useResolvedPath, Link, LinkProps } from "react-router-dom";

export const CustomButtonLink = ({ children, to, ...props }: LinkProps ) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    const navigate = useNavigate();
  
    const handleButtonClick = ( to:string ) => {
        navigate( to );
    }
  
    return (
      <Button onClick={ () => handleButtonClick( to!.toString() ) }>
        <Link
          style={{ color: 'white', textDecoration: match ? "underline" : "none" }}
          to={ to }
          { ...props }
        >
            { children }
        </Link>
      </Button>
    );
  }