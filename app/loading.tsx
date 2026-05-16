export default function Loading() {
  return (
    <section className="page-section" aria-busy="true" aria-live="polite">
      <p className="eyebrow">Загрузка</p>
      <h1>Готовим данные страницы</h1>
      <p className="lead">Пожалуйста, подождите. Если данные не загрузятся, страница покажет понятное сообщение.</p>
      <div className="loading-panel" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
