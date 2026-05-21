import type { ExternalLink, PurchaseSettings } from "@/domain/taplink";

export function isExternalLinkEnabled(link: ExternalLink): boolean {
  return link.isEnabled && Boolean(link.url);
}

export function getInactiveExternalText(link: ExternalLink): string {
  return link.inactiveText ?? "Ссылка будет добавлена позже";
}

export function isPurchaseEnabled(purchase: PurchaseSettings): boolean {
  return Boolean(purchase.managerTelegramUrl);
}

export function getInactivePurchaseText(purchase: PurchaseSettings): string {
  return purchase.inactiveText ?? "Покупка временно недоступна";
}
