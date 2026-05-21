import type { ImageAsset } from "@/domain/taplink";

type DoctorPhotoProps = {
  photo: ImageAsset | null;
  displayName: string;
};

export function DoctorPhoto({ photo, displayName }: DoctorPhotoProps) {
  if (photo) {
    return <img className="doctor-photo-image" src={photo.src} alt={photo.alt} />;
  }

  return (
    <div className="doctor-photo-placeholder" role="img" aria-label={`Временный placeholder фото: ${displayName}`}>
      <span>Фото будет добавлено позже</span>
    </div>
  );
}
