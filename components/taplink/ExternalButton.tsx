import type { ExternalLink } from "@/domain/taplink";
import { getInactiveExternalText, isExternalLinkEnabled } from "@/lib/links/externalLinks";

type ExternalButtonProps = {
  link: ExternalLink;
};

export function ExternalButton({ link }: ExternalButtonProps) {
  if (isExternalLinkEnabled(link) && link.url) {
    return (
      <a className="taplink-button" href={link.url} rel="noreferrer" target="_blank">
        {link.label}
      </a>
    );
  }

  return (
    <button className="taplink-button taplink-button-disabled" disabled type="button">
      <span>{link.label}</span>
      <small>{getInactiveExternalText(link)}</small>
    </button>
  );
}
