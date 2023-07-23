import React, { useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { FirstSection } from '../components/FirstSection/FirstSection';
import { SecondSection } from '../components/SecondSection/SecondSection';
import { SectionReviews } from '../components/SectionReviews/SectionReviews';
import { Footer } from '../components/Footer/Footer';
import './General.css';

export const General = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <Header />
      <FirstSection />
      <SecondSection />
      <SectionReviews />
      <Footer />
      <div className='error-window'>
        <div className='window-header'>
          <div className='window-sign'></div>
        </div>
        <div className='window-text'>
          <p className='window-text-first'>Таким образом консультация с широким активом в значительной степени обуславливает создание модели развития.</p>
          <p className='window-text-second'>Повседневная практика показывает, что сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных</p>
        </div>
        <div className='window-button-container'>
          <button className='window-button' type='button'>Понятно</button>
        </div>
      </div>
    </>
  );
};
