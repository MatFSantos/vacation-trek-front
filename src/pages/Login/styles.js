import { Button as ButtonMui, styled } from "@mui/material";

export const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  border: 2px solid gray;
  box-shadow: 0 2px 10px gray;
  width: 30vw;
  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${({theme}) => theme.breakpoints.down('xl')}{
    width: 50vw;
  }

  ${({theme}) => theme.breakpoints.down('md')}{
    width: 80%;
  }
`;

export const Button = styled(ButtonMui)`
  background-color: ${(props) => {
    if (props.disabled)
      return 'gray !important'
    if (props.selected)
      return "#1094ff";
    return "#9cd3ff";
    }};
  color: white !important;
  font-weight: bold;

  :hover{
    background-color: #1094ff;
    color: #FFFFFF;
  }

`;

export const ContainerForm = styled('div')`
  margin-top: 10px;
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1px;

  .MuiFormLabel-root {
    color: gray;
  }

  .MuiInputBase-root{
    border: 0.5px solid white;
  }

  .MuiInputBase-root:hover{
    border-color: gray;
  }
  .MuiInputBase-input:focus{
    .MuiInputBase-root:hover{
      border-color: white;
    }
  }
`;