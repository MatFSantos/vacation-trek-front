import { styled } from "@mui/material";

export const Container = styled('div')`
  padding: 20px 0;
  font-family: Poppins, sans-serif;
  text-align: center;
  align-items: center;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  box-shadow: 0 5px 5px gray;
  border-radius: 2px;
`;

export const Title = styled('h1')`
  font-size: 35px;
  margin:0;

  ${({theme}) => theme.breakpoints.down('md')}{
    font-size: 25px;
  }
`;