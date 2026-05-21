import type { TaplinkPageData } from "@/domain/taplink";
import { CoursesBlock } from "./CoursesBlock";
import { DoctorPhoto } from "./DoctorPhoto";
import { ExternalButton } from "./ExternalButton";

type TaplinkPageProps = {
  data: TaplinkPageData;
};

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
  const hasDoctorDetails =
    data.doctor.education.length > 0 ||
    data.doctor.experience.length > 0 ||
    data.doctor.professionalDirections.length > 0 ||
    data.doctor.healthTopics.length > 0 ||
    data.doctor.helpFormats.length > 0;

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
        <details className="taplink-action-group">
          <summary className="taplink-button">О докторе</summary>
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
        </details>

        <details className="taplink-action-group">
          <summary className="taplink-button">Курсы</summary>
          <CoursesBlock courses={data.courses} panelId="courses-panel" purchase={data.purchase} />
        </details>

        {data.externalLinks.map((link) => (
          <ExternalButton key={link.platform} link={link} />
        ))}
      </div>
    </div>
  );
}
