import { Paper, styled, Button as MuiButton } from "@mui/material";

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
  ${({theme}) => theme.breakpoints.down('md')}{
    > .avatar{
      width: 50px;
      height: 50px;
      font-size: 30px;
    }
  }
`;

export const Infos = styled('div')`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h3{
    color: gray;
    font-weight: normal;
    margin: 2px;
  }
  > h4{
    color: gray;
    font-weight: normal;
    margin: 2px;
  }

  > h1{
    margin: 2px;
  }

  ${({theme}) => theme.breakpoints.down('md')}{
    > h3{
      font-size: 15px;
    }
    > h4{
      font-size: 12px;
    }

    > h1{
      font-size: 20px;
    }
  }

  ${({theme}) => theme.breakpoints.down('md')}{
    > h3{
      font-size: 12px;
    }
    > h4{
      font-size: 10px;
    }

    > h1{
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
  min-width: 100% ;
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

`;


export const PaperModal = styled(Paper)`
  background-color: white;
  color: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 24;
  position: absolute;
  padding: 20px;
  min-width: 1000px;

  > div {
    margin: 10px;
  }

  ${({theme}) => theme.breakpoints.down('lg')}{
    min-width: 700px;
  }

  ${({theme}) => theme.breakpoints.down('md')}{
    min-width: 0;
  }

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

  > .datetime {
    .MuiInputBase-input, .MuiSvgIcon-root{
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
  ${({theme}) => theme.breakpoints.down('md')}{
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