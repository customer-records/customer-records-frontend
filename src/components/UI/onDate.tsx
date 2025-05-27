import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import "../client.css";
import Calendare from "./calendare";
import arrow from "../../assets/arrow.svg";
import arrowRight from "../../assets/arrow-right.svg";
import SpecialistSelector from "./specialistTimePicker";
import ClientDataForm from "./clientDataForm";
import FinalStep from "./finalDate";

const apiUrl = import.meta.env.VITE_API_URL;

export default function OnDate() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateForPicker, setDateForPicker] = useState<string>(
    selectedDate.toISOString().split("T")[0]
  );
  const [selectedSpecialist, setSelectedSpecialist] = useState<any | null>(
    null
  );
  const [selectedTime, setSelectedTime] = useState<any | null>(null);
  const [clientData, setClientData] = useState<{ name: string; phone: string }>(
    {
      name: "",
      phone: "+7 ",
    }
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [companyId, SetCompanyId] = useState<number | null>(null);
  const [clientId, SetClientId] = useState<number | null>(null);
  const [icsContent, setIcsContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 4;

  useEffect(() => {
    // получить companyId
    fetch(`${apiUrl}/calendar/company/`)
      .then((res) => res.json())
      .then((data) => SetCompanyId(data.id))
      .catch(console.error);
  }, []);

  async function createUser(name: string, phone_number: string) {
    const res = await fetch(`${apiUrl}/auth/client/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone_number }),
    });
    if (!res.ok) throw new Error(`status: ${res.status}`);
    const data = await res.json();
    SetClientId(data.client.id);
    return data.client.id;
  }

  async function bookingTime(
    slotId: number,
    client_id: number,
    company_id: number,
    employer_id: number
  ) {
    const res = await fetch(`${apiUrl}/calendar/bookings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time_slot_id: slotId,
        client_id,
        company_id,
        employer_id,
      }),
    });
    if (!res.ok) throw new Error(`status: ${res.status}`);
    const text = await res.text();
    setIcsContent(text);
  }

  const handleNext = async () => {
    // в шаге 2 — проверка выбора специалиста/времени
    if (step === 2 && (!selectedSpecialist || !selectedTime)) {
      setShowAlert(true);
      return;
    }
    // в шаге 3 — создание клиента и бронирование
    if (step === 3) {
      const cid = await createUser(clientData.name, clientData.phone);
      if (cid && companyId && selectedSpecialist) {
        bookingTime(selectedTime.id, cid, companyId, selectedSpecialist.id);
      }
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setDateForPicker(date.toISOString().split("T")[0]);
    }
  };

  const handleSpecialistTimeSelect = (spec: any | null, time: any | null) => {
    setSelectedSpecialist(spec);
    setSelectedTime(time);
    setShowAlert(false);
  };

  const handleFormSubmit = useCallback(
    (data: { name: string; phone: string; isValid: boolean }) => {
      setClientData({ name: data.name, phone: data.phone });
      setIsFormValid(data.isValid);
    },
    []
  );

  const isNextDisabled = () => {
    if (step === 2) return !selectedSpecialist || !selectedTime;
    if (step === 3) return !isFormValid;
    return false;
  };

  const getButtonText = () => {
    return step === 3 ? "ЗАПИСАТЬСЯ" : "ДАЛЕЕ";
  };

  const getAlertMessage = () => {
    if (step === 2) {
      if (!selectedSpecialist) return "Пожалуйста, выберите специалиста";
      if (!selectedTime) return "Пожалуйста, выберите время";
    }
    return "";
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="header-text">
              <div>
                <span className="zapisites">Выберите </span>
                <span className="na-priem"> дату</span>
              </div>
              <div className="divider"></div>
            </div>
            <Calendare
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
          </>
        );
      case 2:
        return (
          <>
            <div className="header-text">
              <div>
                <span className="zapisites">Выберите </span>
                <span className="na-priem"> специалиста</span>
              </div>
              <div className="divider"></div>
            </div>
            <SpecialistSelector
              onSelect={handleSpecialistTimeSelect}
              selectedDate={dateForPicker}
            />
          </>
        );
      case 3:
        return (
          <>
            <div className="header-text">
              <div>
                <span className="zapisites">Укажите </span>
                <span className="na-priem"> данные</span>
              </div>
              <div className="divider"></div>
            </div>
            <ClientDataForm onSubmit={handleFormSubmit} />
          </>
        );
      case 4:
        return (
          <>
            <div className="header-text">
              <div>
                <span className="zapisites">Спасибо, вы записались</span>
              </div>
              <div className="divider"></div>
            </div>
            <FinalStep
              date={selectedDate}
              time={selectedTime}
              ics={icsContent}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        margin: "40px auto",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: 800,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {renderStepContent()}

      {step < totalSteps && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            gap: 2,
            flexDirection: "column",
          }}
        >
          <Button
            onClick={handleNext}
            disabled={isNextDisabled()}
            sx={buttonStyle}
          >
            {getButtonText()}
            <img loading="eager" fetchPriority="high" src={arrow} alt="далее" />
          </Button>
          {step > 1 && (
            <Button
              onClick={handleBack}
              sx={{
                ...buttonStyle,
                backgroundColor: "white",
                border: "1px solid #07B0FF",
                color: "#07B0FF",
              }}
            >
              <img
                loading="eager"
                fetchPriority="high"
                src={arrowRight}
                alt="назад"
              />
              НАЗАД
            </Button>
          )}
        </Box>
      )}

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          {getAlertMessage()}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const buttonStyle = {
  width: 350,
  height: 40,
  borderRadius: "20px",
  gap: "13px",
  borderWidth: "2px",
  paddingRight: "14px",
  paddingLeft: "14px",
  backgroundColor: "#07B0FF",
  color: "white",
  textTransform: "uppercase",
  fontFamily: "Roboto",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "32px",
  "&:disabled": {
    backgroundColor: "#cccccc",
    color: "#666666",
  },
};
