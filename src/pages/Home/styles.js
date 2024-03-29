import { Paper, styled, Button as MuiButton, Tab as MuiTab } from "@mui/material";

export const ContentHome = styled('div')`
  border: 2px solid gray;
  box-shadow: 1px 0 10px gray;
  border-radius: 10px;
  margin: 15px;
  padding: 15px;
  overflow: hidden;
`;

export const ContentInfo = styled('div')`
  display: flex;
  align-items: center;
  > .avatar{
    width: 200px;
    height: 200px;
    font-size: 120px;
    background-color: #90caf9;
    border: 1px solid #90caf9;
    color: white;
    box-shadow: 1px 0 10px #90caf9;
  }

  ${({theme}) => theme.breakpoints.down('lg')}{
    > .avatar{
      width: 150px;
      height: 150px;
      font-size: 70px;
    }
  }

  ${({theme}) => theme.breakpoints.down('md')}{
    > .avatar{
      width: 100px;
      height: 100px;
      font-size: 50px;
    }
  }
  ${({theme}) => theme.breakpoints.down('sm')}{
    > .avatar{
      width: 50px;
      height: 50px;
      font-size: 30px;
    }
  }
`;

export const Infos = styled("div")`
  padding-left: ${(props) => props.justifyContent == 'center' ? "0px" : '20px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => props.justifyContent};
  text-align: ${(props) => props.justifyContent};

  > h3 {
    color: gray;
    font-weight: normal;
    margin: 2px;
  }
  > h4 {
    color: gray;
    font-weight: normal;
    margin: 2px;
  }

  > h1 {
    margin: 2px;
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    > h3 {
      font-size: 15px;
    }
    > h4 {
      font-size: 12px;
    }

    > h1 {
      font-size: 20px;
    }
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    > h3 {
      font-size: 8px;
    }
    > h4 {
      font-size: 8px;
    }

    > h1 {
      font-size: 14px;
    }
  }
`;

export const ListContainer = styled('div')`
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

export const PlansCard = styled('div')`
  border: 2px solid ${(props) => props.color ? props.color : 'gray'};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.jc};
  border-radius: 10px;
  padding: 5px;
  margin-left: 20px;
  margin-right: 20px;
  min-width: 90% ;
  display: flex;
  cursor: ${(props) => props.cursor};

  transition: all ease-out 0.2s;
  > .add-icon {
    transition: all ease-out 0.2s;
  }

  :hover {
    transform: scale(0.996);
    > .add-icon {
      transform: scale(0.996);
    }
  }

  ${({theme}) => theme.breakpoints.down('md')}{
    > .add-icon {
      font-size: 18px;
    }
  }

`;


export const PaperModal = styled(Paper)`
  background-color: white;
  color: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 24;
  position: absolute;
  padding: ${(props) => props.padding};
  display: ${(props) => (props.innerMargin ? "flex" : "")};
  flex-direction: ${(props) => props.innerMargin ? "column" : ""};
  align-items: center;
  min-width: 1000px;
  max-height: 90vh;
  overflow: auto;
  transition: all ease 0.4s;

  > div {
    margin: ${(props) => props.innerMargin};
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    min-width: 700px;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    min-width: 0;
    width: 85%;
  }

  .MuiFormLabel-root {
    color: gray;
  }

  .MuiInputBase-root {
    border: 0.5px solid white;
  }

  .MuiInputBase-root:hover {
    border-color: gray;
  }
  .MuiInputBase-input:focus {
    .MuiInputBase-root:hover {
      border-color: white;
    }
  }

  > .datetime {
    .MuiInputBase-input,
    .MuiSvgIcon-root {
      color: black;
    }
  }
`;

export const Button = styled(MuiButton)`
  background-color: ${(props) => {
    if (props.disabled)
      return 'gray !important';
    else if (props.className == 'delete')
      return "#f44336 !important"
    return '#42a5f5 !important'
  
  }};
  color: ${(props) => {
    if (props.disabled)
      return 'white !important';
    else if (props.className == 'delete')
      return "white !important"
    return 'white !important'
  
  }};

  ${({theme}) => theme.breakpoints.down('md')}{
    min-width: 0;
    padding: 4px;
    > svg {
      font-size: 15px;
    }
  }
`;

export const ContentPlanCard = styled('div')`
  > .avatar{
    width: 100px;
    height: 100px;
    font-size: 120px;
  }
  ${({theme}) => theme.breakpoints.down('lg')}{
    > .avatar{
      width: 150px;
      height: 150px;
      font-size: 70px;
    }
  }

  ${({theme}) => theme.breakpoints.down('md')}{
    > .avatar{
      width: 100px;
      height: 100px;
      font-size: 50px;
    }
  }
  ${({theme}) => theme.breakpoints.down('sm')}{
    > .avatar{
      width: 50px;
      height: 50px;
      font-size: 50px;
    }
  }

  display: flex;
  align-items: center;
  cursor:pointer ;
  width: 100%;
`;

export const ContentOption = styled('div')`
  display: flex;
  margin-left: auto;
  justify-content: center;
  align-items: center;
`;

export const Tab = styled(MuiTab)`
  font-weight: bold;
  font-size: 16px;
  color: #b6daf8;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-weight: bold;
    font-size: 14px;
    color: #b6daf8;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-weight: bold;
    font-size: 11px;
    color: #b6daf8;
    padding: 5px;
  }
`;

export const ContentInfoModal = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 !important;
`;

export const ContentAvatar = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;

  > .button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    margin-right: 5px;
    color: black;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    z-index: -1;
  }

  > .avatar {
    width: 200px;
    height: 200px;
    margin: 10px;
    font-size: 120px;
    background-color: #90caf9;
    border: 1px solid #90caf9;
    color: white;
    box-shadow: 1px 0 10px #90caf9;
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    > .avatar {
      width: 150px;
      height: 150px;
      font-size: 70px;
    }
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    > .avatar {
      width: 100px;
      height: 100px;
      font-size: 50px;
    }
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    > .avatar {
      width: 50px;
      height: 50px;
      font-size: 30px;
    }
  }
`;
