"use client";

import { useState } from "react";
import type { TaplinkPageData } from "@/domain/taplink";
import { CoursesBlock } from "./CoursesBlock";
import { DoctorPhoto } from "./DoctorPhoto";
import { ExternalButton } from "./ExternalButton";

type TaplinkPageProps = {
  data: TaplinkPageData;
};

type ActivePanel = "doctor" | "courses" | null;

function TextList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="plain-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function TaplinkPage({ data }: TaplinkPageProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const hasDoctorDetails =
    data.doctor.education.length > 0 ||
    data.doctor.experience.length > 0 ||
    data.doctor.professionalDirections.length > 0 ||
    data.doctor.healthTopics.length > 0 ||
    data.doctor.helpFormats.length > 0;

  function togglePanel(panel: Exclude<ActivePanel, null>) {
    setActivePanel((currentPanel) => (currentPanel === panel ? null : panel));
  }

  return (
    <div className="taplink-page">
      <section className="taplink-hero" aria-labelledby="page-title">
        <DoctorPhoto displayName={data.doctor.displayName} photo={data.doctor.photo} />
        <div className="taplink-hero-copy">
          <h1 id="page-title">{data.doctor.displayName}</h1>
          {data.doctor.shortIntro ? <p className="lead">{data.doctor.shortIntro}</p> : null}
          <p className="medical-notice">{data.medicalNotice}</p>
        </div>
      </section>

      <div className="taplink-actions" aria-label="Кнопки первой версии">
        <div className="taplink-action-group">
          <button
            aria-controls="doctor-panel"
            aria-expanded={activePanel === "doctor"}
            className="taplink-button"
            onClick={() => togglePanel("doctor")}
            type="button"
          >
            О докторе
          </button>
          {activePanel === "doctor" ? (
            <section className="taplink-section taplink-inline-panel" id="doctor-panel" aria-labelledby="doctor-title">
              <div className="section-heading">
                <p className="eyebrow">О докторе</p>
                <h2 id="doctor-title">Информация о докторе</h2>
              </div>
              {hasDoctorDetails ? (
                <div className="doctor-details">
                  <TextList items={data.doctor.education} />
                  <TextList items={data.doctor.experience} />
                  <TextList items={data.doctor.professionalDirections} />
                  <TextList items={data.doctor.healthTopics} />
                  <TextList items={data.doctor.helpFormats} />
                </div>
              ) : (
                <p className="muted">Подтвержденная информация о докторе будет добавлена позже.</p>
              )}
            </section>
          ) : null}
        </div>

        <div className="taplink-action-group">
          <button
            aria-controls="courses-panel"
            aria-expanded={activePanel === "courses"}
            className="taplink-button"
            onClick={() => togglePanel("courses")}
            type="button"
          >
            Курсы
          </button>
          {activePanel === "courses" ? (
            <CoursesBlock courses={data.courses} panelId="courses-panel" purchase={data.purchase} />
          ) : null}
        </div>

        {data.externalLinks.map((link) => (
          <ExternalButton key={link.platform} link={link} />
        ))}
      </div>

      <div className="taplink-panels" aria-live="polite">
        {activePanel === "doctor" ? (
          <span className="sr-only">Блок о докторе открыт.</span>
        ) : null}

        {activePanel === "courses" ? (
          <span className="sr-only">Блок курсов открыт.</span>
        ) : null}
      </div>
    </div>
  );
}
