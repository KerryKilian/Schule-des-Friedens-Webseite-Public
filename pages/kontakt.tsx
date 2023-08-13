import { ContactForm, ValidationErrors } from '@/src/Resources';
import BackgroundImage from '@/src/frontend/components/BackgroundImage';
import Image from 'next/image'
import { useState } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    telephone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendEmail(formData);
      // Reset the form after successful submission
      setFormData({
        name: '',
        email: '',
        telephone: '',
        message: '',
      });
      
      
    } catch (error: any) {
      setSuccessMessage("Bei deiner Anfrage ist etwas schief gelaufen. " + error);
    }
    setLoading(false);
  };

  const sendEmail = async (data: ContactForm) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();  
      if (response.ok) {
        setSuccessMessage("Deine Anfrage war erfolgreich.")
      } else {
        setSuccessMessage("Ein Fehler ist aufgetreten");
        setErrors(result);
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error('Error sending email: ' + error.message);
    }
  };

  return (
    <>
      <BackgroundImage/>
      <h1 className='h1 maintitle'>JETZT MITMACHEN</h1>
      <div className='contact'>
      <p className='text'>Falls du Interesse oder Fragen hast, schreibe uns gerne über dieses Kontaktformular. Wir freuen uns über neue junge Leute zwischen 15 und 25 Jahren, die Lust haben, etwas zu bewirken. Und auch, wenn du nur einmal pro Monat kannst und nicht ganz so viel Zeit hast, bist du willkommen. Und falls du nicht weißt, ob ehrenamtliche Arbeit mit Kindern und Jugendlichen etwas für dich ist, kannst du uns ansprechen und wir probieren es einfach mal aus.</p>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form__layout'>
          <div className='question'>
            {/* <label htmlFor="name" className='question__label'>Name</label> */}
            <input id='name' type="text" required minLength={5} maxLength={100} className='question__input' value={formData.name} onChange={(e) => {setFormData({name: e.target.value, telephone: formData.telephone, email: formData.email, message: formData.message})}} placeholder='Name' />
          </div>
          <div className='question'>
            {/* <label htmlFor="tel" className='question__label'>Telefon</label> */}
            <input id='tel' type="tel" minLength={5} maxLength={20} className='question__input' value={formData.telephone} onChange={(e) => {setFormData({name: formData.name, telephone: e.target.value, email: formData.email, message: formData.message})}} placeholder='Telefon'/>
          </div>
          <div className='question'>
            {/* <label htmlFor="email" className='question__label'>Email</label> */}
            <input id='email' type="email" minLength={5} maxLength={200} className='question__input' value={formData.email} onChange={(e) => {setFormData({name: formData.name, telephone: formData.telephone, email: e.target.value, message: formData.message})}} placeholder='Email'/>
          </div>
        </div>
        <div className='question'>
          {/* <label htmlFor="message" className='question__label'>Nachricht</label> */}
          <textarea id='message' rows={5} minLength={5} maxLength={15000} className='question__input question__message' value={formData.message} onChange={(e) => {setFormData({name: formData.name, telephone: formData.telephone, email: formData.email, message: e.target.value})}} placeholder='Nachricht' />
        </div>
        <input type="submit" className='question__button accept hoveranimationbig'/>
        <small>{successMessage}</small>
      <BounceLoader
          color={"#202c64"}
          loading={loading}
          // cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
      />
      {errors?.errors.map((error) => (
          <>
            <br />
            <small>{error.msg}</small>
          </>
        ))}
      </form>
      

      </div>
    </>
  )
}
