// funções de utilidade geral para o projeto.
import jsPDF from 'jspdf';

export function getAuth(){
  let token = localStorage.getItem('access_token');
  if (token) 
    return {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
  else
    return null;
}

export function emailValidate(email){
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function pdfGenerator({title, date, description, itineraries, participants }){
  const doc = new jsPDF();

  // Configurações de fonte
  const fontTitleSize = 20;
  const fontSubtitleSize = 10;
  const fontDescriptionSize = 10;
  const fontContentSize = 10;

  // title
  const titleX = doc.internal.pageSize.getWidth() / 2;
  const titleY = 30;
  doc.setFontSize(fontTitleSize);
  doc.text(title, titleX, titleY, { align: "center" });

  // date
  const dateX = doc.internal.pageSize.getWidth() / 2;
  const dateY = titleY + 10;
  doc.setFontSize(fontSubtitleSize);
  doc.setTextColor(128);
  doc.text(date, dateX, dateY, { align: "center" });

  // description
  const descriptionX = 20;
  const descriptionY = dateY + 15;
  const maxWidth = doc.internal.pageSize.getWidth() - 40;
  const descriptionLines = doc.splitTextToSize(description, maxWidth);
  doc.setFontSize(fontDescriptionSize);
  doc.setTextColor(0);
  doc.text(descriptionLines, descriptionX, descriptionY);


  // itinerary
  const itineraryTitle = "Itinerary:";
  const itineraryX = 20;
  const itineraryY = descriptionY + 20;
  doc.setFontSize(fontSubtitleSize);
  doc.setTextColor(0);
  doc.text(itineraryTitle, itineraryX, itineraryY);

  const itineraryContentX = itineraryX + 10;
  let itineraryContentY = itineraryY + 10;
  doc.setFontSize(fontContentSize);
  itineraries.forEach((itinerary, index) => {
    const content = `${index + 1}. ${itinerary}`;
    doc.text(content, itineraryContentX, itineraryContentY);
    itineraryContentY += 10;
  });

  // participants
  const participantsTitle = "Participants:";
  const participantsX = 20;
  const participantsY = itineraryContentY + 10;
  doc.setFontSize(fontSubtitleSize);
  doc.setTextColor(0);
  doc.text(participantsTitle, participantsX, participantsY);

  const participantContentX = participantsX + 10;
  let participantContentY = participantsY + 10;
  doc.setFontSize(fontContentSize);
  participants.forEach((participant, index) => {
    doc.text(participant, participantContentX, participantContentY);
    participantContentY += 10;
  });

  doc.save('vacation-plan.pdf');
}