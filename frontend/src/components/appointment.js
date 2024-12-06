import React, { useState, useEffect } from 'react';
import { getAppointments, addAppointment, chatWithLlama2 } from '../api/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getAppointments();
      setAppointments(response);
    };
    fetchAppointments();
  }, []);

  const addAppointmentHandler = async () => {
    const newAppointment = { title, description, date };
    const response = await addAppointment(newAppointment);
    setAppointments([...appointments, response]);
  };

  const chatWithLlama2Handler = async () => {
    const response = await chatWithLlama2(message, message, 0, 100, 0, 1);
    setResponse(response);
  };

  return (
    <div>
      <h1>Agenda de Compromissos</h1>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={addAppointmentHandler}>Adicionar Compromisso</button>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.title} - {appointment.description} - {new Date(appointment.date).toLocaleString()}
          </li>
        ))}
      </ul>
      <h2>Chat com Llama2</h2>
      <input
        type="text"
        placeholder="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={chatWithLlama2Handler}>Enviar</button>
      <p>Resposta: {response}</p>
    </div>
  );
};

export default Appointments;