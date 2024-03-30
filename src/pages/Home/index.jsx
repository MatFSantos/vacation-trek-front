import { Avatar, Tabs, Container, Modal, CircularProgress, TextField, Button as MuiButton } from "@mui/material";
import { DatePicker, DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { AddCircleOutline, Delete, Logout, PictureAsPdf } from '@mui/icons-material';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

import {
  ContentHome,
  ContentInfo,
  Infos,
  PlansCard,
  ListContainer,
  PaperModal,
  Button,
  ContentPlanCard,
  ContentOption,
  Tab,
  ContentInfoModal,
  ContentAvatar,
} from "./styles";
import { snackbarError } from "../../data/store/config";
import { getAuth, pdfGenerator } from "../../data/utils/common.util";
import useApi from "../../data/hooks/useApi";


const Home = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // attr to page
  const [plans, setPlans] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [user, setUser] = useState(null);

  const [idWillBeDeleted, setIdWillBeDeleted] = useState(null);
  const [iSearched, setISearched] = useState(false);
  const [pSearched, setPSearched] = useState(false);
  
  // plan attr
  const [title, setTitle] = useState();
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [description, setDescription] = useState();
  
  // participant attr
  const [name, setName] = useState();
  
  // itinerary attr
  const [loc, setLoc] = useState();
  const [date, setDate] = useState(null);
  
  const [loading, setLoading] = useState(true); // initial loading
  const [loadingInnerModal, setLoadingInnerModal] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);
  
  const [modalForm, setModalForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(0); // 0 -> plan, 1 -> itinerary, 2 -> participant
  const [planModal, setPlanModal] = useState(null);
  const [tabModal, setTabModal] = useState(1);
  const [tab, setTab] = useState(1);
  
  
  /* to verify if any user is loged */
  useEffect(() => {
    if(location.state) {
      const { user } = location.state;
      setUser(user);
    } else {
      const verifyLogin = async () => {
        let config = getAuth();
        if (config){
          const [data, error, statusCode] = await useApi({
            method: 'post',
            url: '/user/verify-login',
            config: config
          });
          if (data && statusCode == 200) {
            setUser(data.result);
          } else {
            enqueueSnackbar(`code ${statusCode}: ` + error, snackbarError);
            navigate('/login');
          }
        } else {
          enqueueSnackbar("No one user loged", snackbarError);
          navigate('/login');
        }
      }
      verifyLogin();
    }
  }, []);

  /* to get all plans of the loged user */
  useEffect(() => {
    const getPlans = async () => {
      let config = getAuth();
      if (config) {
        setLoading(true);
        const [data, error, statusCode] = await useApi({
          method: 'get',
          url: `/plan/user/${user.user_id}`,
          config: config
        });
        setLoading(false);
        if(data && statusCode == 200){
          setPlans(data.result);
        }
        else {
          enqueueSnackbar(`code ${statusCode}: ` + error, snackbarError);
        }
      } else {
        enqueueSnackbar("No one user loged", snackbarError);
        navigate('/login');
      }
    };
    if (user)
      getPlans();
  }, [user]);

  /* to get all participants of the plan selected */
  const getParticipant = async (id) => {
    let config = getAuth();
    if (config){
      const [data, error, statusCode] = await useApi({
        method: 'get',
        url: `/participant/plan/${id}`,
        config: config
      });
      if(data && statusCode == 200){
        setPSearched(true);
        return data.result;
      } else
        enqueueSnackbar(`code ${statusCode}: ` + error, snackbarError);
    } else {
      enqueueSnackbar("No one user loged", snackbarError);
      navigate('/login');
    }
    return [];
  }

  /* to get all itineraries of the plan selected */
  const getItinerary = async (id) => {
    let config = getAuth();
    if (config) {
      const [data, error, statusCode] = await useApi({
        method: 'get',
        url: `/itinerary/plan/${id}`,
        config: config
      });
      if(data && statusCode == 200){
        setISearched(true);
        return data.result;
      } else
        enqueueSnackbar(`code ${statusCode}: ` + error, snackbarError);
    } else {
      enqueueSnackbar("No one user loged", snackbarError);
      navigate('/login');
    }
    return [];
  }

  /* to open modal with plan selected */
  const showPlan = async (plan) => {
    setPlanModal(plan);
    setModal(true);
    setIdWillBeDeleted(null);
    setPSearched(false);
    setISearched(false);
    setParticipants([]);
    setItineraries([]);
  }


  /* to search about participants ands itineraries of the selected plan */
  useEffect(() => {
    if (tabModal == 2 && planModal && !pSearched){
      const req = async () => {
        setLoadingInnerModal(true);
        const data = await getParticipant(planModal.plan_id);
        setLoadingInnerModal(false);
        setParticipants(data);
      };
      req();
    }
    else if (tabModal == 1 && planModal && !iSearched) {
      const req = async () => {
        setLoadingInnerModal(true);
        const data = await getItinerary(planModal.plan_id);
        setLoadingInnerModal(false);
        setItineraries(data);
      };
      req();
    }
  }, [planModal, tabModal]);

  /* to open modal with a form to create a new plan, participant or itinerary */
  const newForm = (content) => {
    setModalContent(content);
    setModalForm(true);
  }

  /* request to create a new plan, participant or itinerary */
  const sendReq = async () => {
    setLoadingCreate(true);
    let route, payload;
    if (modalContent == 0){
      route = "/plan";
      payload = {
        title: title,
        date_start: dateStart.set('hour', 0).set('minute', 0).set('second', 0).format('YYYY-MM-DDTHH:mm:ss[Z]'),
        date_end: dateEnd.set('hour', 23).set('minute', 59).set('second', 59).format('YYYY-MM-DDTHH:mm:ss[Z]'),
        description: description,
        user_id: user.user_id
      };
    } else if (modalContent == 1) {
      route = "/itinerary";
      payload = {
        location: loc,
        date: date.format('YYYY-MM-DDTHH:mm:ss[Z]'),
        plan_id: planModal.plan_id
      };
    } else if (modalContent == 2) {
      route = "/participant";
      payload = {
        name: name,
        plan_id: planModal.plan_id
      };
    }
    let config = getAuth();
    if (config) {
      const [data, error, statusCode] = await useApi({
        method: 'post',
        url: route,
        data: payload,
        config: config
      });
      
      if (data && statusCode == 201){
        if (modalContent == 0){
          setPlans((prev) => [...prev, data.result]);
        } else if (modalContent == 1) {
          setItineraries((prev) => [...prev, data.result]);
        } else if (modalContent == 2) {
          setParticipants((prev) => [...prev, data.result]);
        }
        onCloseModalForm();
      } else {
        enqueueSnackbar(`code ${statusCode}: ` + error, snackbarError);
      }
    } else {
      enqueueSnackbar("No one user loged", snackbarError);
      navigate('/login');
    }
    setLoadingCreate(false);
  }

  /* request to delete a plan, participant or itinerary */
  const reqdel = async (id, instance) => {
    setLoadingDelete(true);
    let route;
    if (instance == 0){
      route = "/plan";
    } else if (instance == 1) {
      route = "/itinerary";
    } else if (instance == 2) {
      route = "/participant";
    }
    let config = getAuth();
    if (config) {
      const [data, error, statusCode] = await useApi({
        method: 'delete',
        url: route + `/${id}`,
        config: config
      });

      if (data && statusCode == 200){
        if (instance == 0){
          setPlans((prev) => prev.filter((value) => value.plan_id != id));
        } else if (instance == 1) {
          setItineraries((prev) => prev.filter((value) => value.itinerary_id != id));
        } else if (instance == 2) {
          setParticipants((prev) => prev.filter((value) => value.participant_id != id));
        }
      } else {
        enqueueSnackbar(`code ${statusCode}: ` + error, snackbarError);
      }
    } else {
      enqueueSnackbar("No one user loged", snackbarError);
      navigate('/login');
    }
    setLoadingDelete(false);
  }

  /* to close a modal */
  const onCloseModal = () => {
    setModal(false);
    setTabModal(1);
    setPlanModal(null);
  }

  /* to close a modal form */
  const onCloseModalForm = () => {
    setModalForm(false);
    setName("");
    setTitle("");
    setDescription("");
    setLoc("");
    setDateStart(null);
    setDateEnd(null);
    setDate(null);
  }

  /* to logout a user */
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  /* to generate a pdf with the vacation plan */
  const toPDF = async () => {
    setLoadingPDF(true);
    let p = participants, i = itineraries;
    if (!pSearched){
      p = await getParticipant(planModal?.plan_id);
    }
    if (!pSearched) {
      i = await getItinerary(planModal.plan_id);
    }
    let payload = {
      title: planModal?.title,
      date: "From " + dayjs(planModal.date_start.slice(0, -1) + "-03:00").format("YYYY/MM/DD") + " to " + dayjs(planModal.date_end.slice(0, -1) + "-03:00").format("YYYY/MM/DD"),
      description: planModal?.description,
      itineraries: i.map((itinerary) => `${itinerary.location}, ${itinerary.date}`),
      participants: p.map((participant) => participant.name)
    }
    pdfGenerator(payload);
    setLoadingPDF(false);
  }

  /* to verify fields  */
  const verifyFields = () => {
    if (modalContent == 0){
      if (!title || title.length > 100){
        setFieldsError(true);
        return;
      } else {
        if (!description || description.length > 300) {
          setFieldsError(true);
          return;
        } else {
          if (!dateStart || !verifyDate(dateStart, dayjs())){
            setFieldsError(true);
            return;
          } else {
            if (!dateEnd || !verifyDate(dateEnd, dateStart ? dateStart : dayjs())){
              setFieldsError(true);
              return;
            } else {
              setFieldsError(false)
            }
          }
        }
      }
    } else if (modalContent == 1) {
      if (!loc || loc.length > 100){
        setFieldsError(true);
        return;
      } else {
        if (!date || !verifyDate(date, dayjs(planModal.date_start.slice(0, -1) + "-03:00"), dayjs(planModal.date_end.slice(0, -1) + "-03:00"))){
          setFieldsError(true);
          return;
        } else {
          setFieldsError(false)
        }
      }
    } else if (modalContent == 2) {
      if(!name || name.length > 100){
          setFieldsError(true);
          return;
        } else {
          setFieldsError(false)
      }
    }
  }
  useEffect(() => {
    verifyFields()
  }, [title, description, dateStart, dateEnd, date, loc, name]);
  const verifyDate = (date, minDate = dayjs('2024-01-01'), maxDate = null) => {
    console.log({date, minDate, maxDate})
    if (!(date instanceof dayjs))
      date = dayjs(date);
    if (date.$d != 'Invalid Date'){
      if (date < minDate){
        return false;
      }
      else if ( maxDate && date > maxDate){
        return false;
      }
      else {
        return true;
      }
    } else {
      return false
    }
  }

  return (
  <Container maxWidth='xl' sx={{padding: "0 !important"}} >
    <ContentHome>
      <ContentInfo>
        <Avatar className="avatar" alt="profile-pic">
          {user?.name ? user['name'][0]: 'U'}
        </Avatar>
        <Infos>
          <h1>{user?.name ?? 'User'}</h1>
          <h3>{user?.email ?? 'E-mail'}</h3>
        </Infos>
        <ContentOption>
          <Button onClick={() => logout()}>
            <Logout />
          </Button>
        </ContentOption>
      </ContentInfo>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab value={1} label="Plans" />
      </Tabs>
      {tab == 1 ?
        <ListContainer>
          {loading ? <CircularProgress /> :
            <>
              {plans.map((plan, idx) => (
                <PlansCard key={idx}>
                  <ContentPlanCard onClick={() => showPlan(plan)}>
                    <Avatar className="avatar" src="/travel.webp"/>
                    <Infos>
                      <h1>{plan.title}</h1>
                      <h4>{"From " + dayjs(plan.date_start.split("T")[0]).format('MMMM DD, YYYY') + " to " + dayjs(plan.date_end.split("T")[0]).format('MMMM DD, YYYY')}
                      </h4>
                      <h4>{plan.description?.length > 50 ? plan.description.slice(0,50) + "..." : plan.description }</h4>
                    </Infos>
                  </ContentPlanCard>
                  <Button
                    variant="contained"
                    className="delete"
                    onClick={() => {
                      setIdWillBeDeleted(plan.plan_id);
                      reqdel(plan.plan_id, 0)
                    }}
                    disabled={loadingDelete}
                  >
                    {loadingDelete && idWillBeDeleted == plan.plan_id? <CircularProgress size={20} /> : ""}<Delete/>
                  </Button>
                </PlansCard>
              ))}
              <PlansCard jc="center" cursor="pointer" color='#90caf9' onClick={() => newForm(0)}>
                <AddCircleOutline className="add-icon" fontSize="large" color="primary" />
              </PlansCard>
            </>
          }
        </ListContainer>
        : null
      }
      <Modal
        open={modal}
        onClose={onCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <PaperModal elevation={0}>
          <ContentInfoModal>
            <ContentAvatar src="/travel.webp">
              <Avatar className="avatar" src='/travel.webp' alt="plan-pic" />
              <MuiButton
                className="button"
                onClick={() => toPDF()}
                disabled={loadingPDF}
                variant="text"
              >
                {loadingPDF ? <CircularProgress size={20} /> : ""}<PictureAsPdf />
              </MuiButton>
            </ContentAvatar>
            <Infos justifyContent="center">
              <h1>{planModal?.title ?? 'Title'}</h1>
              <h3>{"From " + dayjs(planModal?.date_start.split("T")[0]).format('MMMM DD, YYYY') + " to " + dayjs(planModal?.date_end.split("T")[0]).format('MMMM DD, YYYY')}</h3>
              <h4>{planModal?.description ?? 'Description'}</h4>
            </Infos>
          </ContentInfoModal>
          <Tabs value={tabModal} onChange={(_,v) => setTabModal(v)} centered>
            <Tab value={1} label="Itinerary" />
            <Tab value={2} label="Participants"/>
          </Tabs>
          <ListContainer>
            {tabModal == 1 ? (
              loadingInnerModal ? <CircularProgress /> :
                <>
                  {itineraries.map((itinerary, idx) => (
                    <PlansCard key={idx}>
                      <ContentPlanCard>
                        <Infos>
                          <h1>{itinerary.location}</h1>
                          <h4>{dayjs(itinerary.date.slice(0, -1) + "-03:00").format("MMMM DD, YYYY at HH:mm").replace("am", "a").replace("pm", "a")}</h4>
                        </Infos>
                      </ContentPlanCard>
                      <Button
                        variant="contained"
                        className="delete"
                        onClick={() => {
                          setIdWillBeDeleted(itinerary.itinerary_id);
                          reqdel(itinerary.itinerary_id, 1);
                        }}
                        disabled={loadingDelete}
                      >
                        {loadingDelete && idWillBeDeleted == itinerary.itinerary_id ? <CircularProgress size={20} /> : ""}<Delete/>
                      </Button>
                    </PlansCard>
                  ))}
                  <PlansCard jc="center" cursor="pointer" color='#90caf9' onClick={() => newForm(1)}>
                    <AddCircleOutline className="add-icon" fontSize="large" color="primary" />
                  </PlansCard>
                </>
              )
            : null}
          {tabModal == 2 ? (
            loadingInnerModal ? <CircularProgress /> :
              <>
                {participants.map((participant, idx) => (
                  <PlansCard key={idx}>
                    <ContentPlanCard>
                      <Infos>
                        <h1>{participant.name}</h1>
                      </Infos>
                    </ContentPlanCard>
                    <Button 
                      variant="contained"
                      className="delete"
                      onClick={() => {
                        setIdWillBeDeleted(participant.participant_id);
                        reqdel(participant.participant_id, 2);
                      }}
                      disabled={loadingDelete}
                    >
                      {loadingDelete && idWillBeDeleted == participant.participant_id? <CircularProgress size={20} /> : ""}<Delete/>
                    </Button>
                  </PlansCard>
                ))}
                <PlansCard jc="center" cursor="pointer" color='#90caf9' onClick={() => newForm(2)}>
                  <AddCircleOutline className="add-icon" fontSize="large" color="primary" />
                </PlansCard>
              </>
            )
          : null}
          </ListContainer>
        </PaperModal>
      </Modal>
      <Modal
        open={modalForm}
        onClose={() =>  onCloseModalForm()}
        aria-labelledby="modal-form-title"
        aria-describedby="modal-form-description"
      >
        <PaperModal elevation={0} padding='20px' inner-margin='10px'>
          {modalContent == 0 ?
            <TextField
              InputProps={{style: {color: 'black'}}}
              InputLabelProps={{style: {color: 'gray'}}}
              fullWidth
              label="Title"
              variant="outlined"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          : null}
          {modalContent == 0 ?
            <TextField
              InputProps={{style: {color: 'black'}}}
              InputLabelProps={{style: {color: 'gray'}}}
              fullWidth
              label="Description"
              variant="outlined"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          : null}
          <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center'}}>
            {modalContent == 0 ?
              <DatePicker
                className="datetime"
                label="Date start"
                value={dateStart}
                onChange={(v) => setDateStart(v)}
                minDate={dayjs()}
                format="DD/MM/YYYY"
              />
            : null}
            {modalContent == 0 ?
              <DatePicker
                className="datetime"
                label="Date end"
                value={dateEnd}
                onChange={(v) => setDateEnd(v)}
                minDate={dateStart ? dateStart : dayjs()}
                format="DD/MM/YYYY"
              />
            : null}
          </div>
          {modalContent == 1 ? 
            <TextField
              InputProps={{style: {color: 'black'}}}
              InputLabelProps={{style: {color: 'gray'}}}
              fullWidth
              label="Location"
              variant="outlined"
              type="text"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />
          : null}
          {modalContent == 1 ?
            <DateTimePicker
              className="datetime"
              label="Date"
              ampm={false}
              value={date}
              onChange={(v) => setDate(v)}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              minDateTime={planModal?.date_start ? dayjs(planModal.date_start.slice(0, -1) + "-03:00") : dayjs()}
              maxDateTime={planModal?.date_end ? dayjs(planModal.date_end.slice(0, -1) + "-03:00") : dayjs()}
              format="DD/MM/YYYY HH:mm"
            />
          : null}
          {modalContent == 2 ? 
            <TextField
              InputProps={{style: {color: 'black'}}}
              InputLabelProps={{style: {color: 'gray'}}}
              fullWidth
              label="Name"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          : null}
          <Container sx={{justifyContent: 'center', display: 'flex'}} >
            <Button
              variant="contained"
              sx={{color: 'white', fontWeight: 'bold'}}
              onClick={() => sendReq()}
              disabled={loadingCreate || fieldsError}
            >
              {loadingCreate ? <CircularProgress size={20}/> : "" }Create
            </Button>
          </Container>
        </PaperModal>
      </Modal>
    </ContentHome>
  </Container>
  );
}

export default Home;