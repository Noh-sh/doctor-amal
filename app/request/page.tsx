import Link from "next/link";

export default function RequestPage() {
  return (
    <section className="page-section">
      <p className="eyebrow">Заявка</p>
      <h1>Форма заявки</h1>
      <p className="lead">
        Форма покупки курса и консультации по подбору курса будет реализована отдельным этапом с локальным сохранением.
      </p>
      <div className="notice">
        На сайте не выполняется онлайн-оплата и не запрашиваются платежные данные.
      </div>
      <Link href="/courses">Вернуться к курсам</Link>
    </section>
  );
}
