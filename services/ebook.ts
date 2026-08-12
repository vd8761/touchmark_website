export interface EbookSubmissionData {
  ebook_content_id: string;
  ebook_name: string;
  ebook_lname: string;
  ebook_email: string;
  ebook_comname: string;
  'g-token'?: string;
}

interface EbookSubmissionResult {
  success: boolean;
  message?: string;
}

/**
 * Submits the e-book contact form.
 *
 * Posts to this site's own /api/ebook route. It used to post to
 * `/head/engine/ajax/__ajax_ebook_form.php` — a path that only exists on the legacy PHP
 * host, so on this site every submission came back 404 and the form could never
 * succeed. The route handles delivery server-side, which also keeps the mail
 * credentials out of the browser.
 */
export async function submitEbookForm(
  data: EbookSubmissionData,
): Promise<EbookSubmissionResult> {
  const formBody = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) formBody.append(key, value);
  });

  let response: Response;
  try {
    response = await fetch('/api/ebook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: formBody.toString(),
    });
  } catch {
    return {
      success: false,
      message: 'We could not reach the server. Please check your connection and try again.',
    };
  }

  const body = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    message?: string;
  };

  if (!response.ok) {
    // Surface the server's own wording where it has any — it names the failing field —
    // and never leak a bare status code to a visitor.
    return {
      success: false,
      message: body.message || 'We could not send your request right now. Please try again.',
    };
  }

  return { success: true };
}
