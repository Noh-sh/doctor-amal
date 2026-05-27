import type { ExternalLink } from "@/domain/taplink";
import { getInactiveExternalText, isExternalLinkEnabled } from "@/lib/links/externalLinks";

type ExternalButtonProps = {
  link: ExternalLink;
};

export function ExternalButton({ link }: ExternalButtonProps) {
  const className = `taplink-button taplink-button-external taplink-button-${link.platform}`;
  const content = (
    <span className="button-main">
      <span className={`button-icon button-icon-${link.platform}`} aria-hidden="true" />
      <span>{link.label}</span>
    </span>
  );

  if (isExternalLinkEnabled(link) && link.url) {
    return (
      <a className={className} href={link.url} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <button className={`${className} taplink-button-disabled`} disabled type="button">
      {content}
      <small>{getInactiveExternalText(link)}</small>
    </button>
  );
}
