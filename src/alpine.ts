import type { Alpine } from 'alpinejs'

/**
 * Alpine entrypoint (loaded by @astrojs/alpinejs before start).
 *
 * Store methods must write through `this` — the reactive proxy Alpine
 * hands them — never through a captured raw object. Writing the raw
 * object bypasses reactivity, which is why the terms dialog once
 * refused to open even though the store state changed.
 */
export default function alpineEntrypoint(Alpine: Alpine) {
  Alpine.store('terms', {
    open: false,
    show(this: { open: boolean }) {
      this.open = true
    },
    close(this: { open: boolean }) {
      this.open = false
    }
  })

  // The dialog markup lives in a <template> inside TermsDialog.astro
  // so it renders exactly once per page even though the component is
  // included from the layout. Clone it into the body before Alpine
  // starts so the directives are seen on the first init pass.
  const tpl = document.getElementById('terms-dialog-root')
  if (tpl instanceof HTMLTemplateElement && !document.getElementById('terms-dialog-mounted')) {
    const node = tpl.content.firstElementChild?.cloneNode(true)
    if (node instanceof HTMLElement) {
      node.id = 'terms-dialog-mounted'
      document.body.appendChild(node)
    }
  }
}
