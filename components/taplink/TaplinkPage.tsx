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
        <div className="taplink-hero-copy">
          <h1 id="page-title">{data.doctor.displayName}</h1>
        </div>
        <DoctorPhoto displayName={data.doctor.displayName} photo={data.doctor.photo} />
        {data.doctor.shortIntro ? <p className="lead taplink-hero-intro">{data.doctor.shortIntro}</p> : null}
      </section>

      <div className="taplink-actions" aria-label="Кнопки текущей версии">
        <details className="taplink-action-group" suppressHydrationWarning>
          <summary className="taplink-button taplink-button-internal">
            <span className="button-main">
              <span className="button-icon button-icon-doctor" aria-hidden="true" />
              <span>О докторе</span>
            </span>
          </summary>
          <section className="taplink-section taplink-inline-panel" id="doctor-panel" aria-labelledby="doctor-title">
            <h2 className="visually-hidden" id="doctor-title">О докторе</h2>
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

        <details className="taplink-action-group" suppressHydrationWarning>
          <summary className="taplink-button taplink-button-internal">
            <span className="button-main">
              <span className="button-icon button-icon-courses" aria-hidden="true" />
              <span>Курсы</span>
            </span>
          </summary>
          <CoursesBlock courses={data.courses} panelId="courses-panel" purchase={data.purchase} />
        </details>

        {data.externalLinks.map((link) => (
          <ExternalButton key={link.platform} link={link} />
        ))}
      </div>

      <p className="medical-notice medical-notice-bottom">{data.medicalNotice}</p>
    </div>
  );
}
